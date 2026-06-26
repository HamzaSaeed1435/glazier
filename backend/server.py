from fastapi import FastAPI, APIRouter, HTTPException, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
import resend
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend setup
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL')
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# Logging configured before route definitions
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create the main app without a prefix
app = FastAPI(title="NikoVision API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# -------- Models --------
class QuoteCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field(..., min_length=4, max_length=40)
    suburb: Optional[str] = Field(default=None, max_length=120)
    job_type: str = Field(..., min_length=1, max_length=80)
    message: str = Field(..., min_length=1, max_length=4000)


class Quote(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    suburb: Optional[str] = None
    job_type: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=4000)


class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ReviewCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    suburb: Optional[str] = Field(default=None, max_length=120)
    rating: int = Field(..., ge=1, le=5)
    text: str = Field(..., min_length=4, max_length=2000)


class Review(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    suburb: Optional[str] = None
    rating: int
    text: str
    published: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# -------- Routes --------
@api_router.get("/")
async def root():
    return {"message": "NikoVision API", "status": "ok"}


@api_router.post("/reviews", response_model=Review, status_code=201)
async def create_review(payload: ReviewCreate):
    review = Review(**payload.model_dump())
    doc = review.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.reviews.insert_one(doc)
    logger.info("New review: %s (%d stars)", review.name, review.rating)
    return review


@api_router.get("/reviews", response_model=List[Review])
async def list_reviews():
    items = await db.reviews.find({"published": True}, {"_id": 0}).sort("created_at", -1).to_list(200)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items


@api_router.delete("/admin/reviews")
async def admin_delete_all_reviews(x_admin_token: Optional[str] = Header(default=None)):
    """One-time cleanup endpoint. Requires X-Admin-Token header matching ADMIN_TOKEN env var."""
    expected = os.environ.get('ADMIN_TOKEN')
    if not expected or x_admin_token != expected:
        raise HTTPException(status_code=403, detail="Forbidden")
    result = await db.reviews.delete_many({})
    logger.info("Admin wiped %d reviews", result.deleted_count)
    return {"deleted": result.deleted_count}


@api_router.post("/quotes", response_model=Quote, status_code=201)
async def create_quote(payload: QuoteCreate):
    quote = Quote(**payload.model_dump())
    doc = quote.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.quotes.insert_one(doc)
    logger.info("New quote received: %s (%s) - %s", quote.name, quote.email, quote.job_type)

    # Fire-and-forget email notification — never block the API response on email
    asyncio.create_task(_send_quote_email(quote))
    return quote


def _build_quote_email_html(q: "Quote") -> str:
    suburb_row = (
        f'<tr><td style="padding:8px 0;color:#475569;width:140px;">Suburb</td>'
        f'<td style="padding:8px 0;color:#0F172A;font-weight:600;">{q.suburb}</td></tr>'
        if q.suburb else ""
    )
    return f"""\
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#FAFAF9;font-family:Arial,Helvetica,sans-serif;color:#0F172A;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAF9;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border:1px solid #E2E8F0;">
        <tr><td style="background:#1E3A5F;padding:28px 32px;">
          <div style="font-family:Georgia,serif;font-size:24px;color:#FFFFFF;letter-spacing:-0.5px;">NikoVision</div>
          <div style="font-size:11px;color:#D8C3A5;letter-spacing:3px;margin-top:6px;">NEW QUOTE REQUEST</div>
        </td></tr>
        <tr><td style="padding:32px;">
          <p style="margin:0 0 16px 0;font-size:15px;color:#475569;">A new enquiry has come in via the NikoVision website.</p>
          <table cellpadding="0" cellspacing="0" width="100%" style="font-size:14px;border-top:1px solid #E2E8F0;margin-top:12px;">
            <tr><td style="padding:8px 0;color:#475569;width:140px;">Name</td><td style="padding:8px 0;color:#0F172A;font-weight:600;">{q.name}</td></tr>
            <tr><td style="padding:8px 0;color:#475569;">Email</td><td style="padding:8px 0;color:#0F172A;font-weight:600;"><a href="mailto:{q.email}" style="color:#1E3A5F;">{q.email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#475569;">Phone</td><td style="padding:8px 0;color:#0F172A;font-weight:600;"><a href="tel:{q.phone}" style="color:#1E3A5F;">{q.phone}</a></td></tr>
            {suburb_row}
            <tr><td style="padding:8px 0;color:#475569;">Job type</td><td style="padding:8px 0;color:#0F172A;font-weight:600;">{q.job_type}</td></tr>
          </table>
          <div style="margin-top:24px;padding:20px;background:#F5F5F0;border-left:3px solid #1E3A5F;">
            <div style="font-size:11px;color:#475569;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">Message</div>
            <div style="font-size:15px;color:#0F172A;line-height:1.6;white-space:pre-wrap;">{q.message}</div>
          </div>
          <p style="margin-top:28px;font-size:12px;color:#94A3B8;">Submitted {q.created_at.isoformat()}<br/>Quote ID: {q.id}</p>
        </td></tr>
        <tr><td style="background:#0F172A;padding:16px 32px;font-size:11px;color:rgba(255,255,255,0.5);letter-spacing:1px;text-transform:uppercase;">
          NikoVision Glazing  ·  Adelaide
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>"""


async def _send_quote_email(q: "Quote") -> None:
    if not RESEND_API_KEY or not NOTIFICATION_EMAIL:
        logger.warning("Resend not configured — skipping email for quote %s", q.id)
        return
    try:
        params = {
            "from": SENDER_EMAIL,
            "to": [NOTIFICATION_EMAIL],
            "subject": f"New quote request — {q.name} ({q.job_type})",
            "html": _build_quote_email_html(q),
            "reply_to": q.email,
        }
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info("Quote email sent to %s — id=%s", NOTIFICATION_EMAIL, result.get("id") if isinstance(result, dict) else result)
    except Exception as e:
        logger.error("Failed to send quote email for %s: %s", q.id, e)


@api_router.get("/quotes", response_model=List[Quote])
async def list_quotes():
    items = await db.quotes.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items


@api_router.post("/contact", response_model=Contact, status_code=201)
async def create_contact(payload: ContactCreate):
    contact = Contact(**payload.model_dump())
    doc = contact.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contacts.insert_one(doc)
    logger.info("New contact message: %s (%s)", contact.name, contact.email)
    return contact


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
