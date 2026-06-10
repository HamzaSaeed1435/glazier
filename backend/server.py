from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
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


@api_router.post("/quotes", response_model=Quote, status_code=201)
async def create_quote(payload: QuoteCreate):
    quote = Quote(**payload.model_dump())
    doc = quote.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.quotes.insert_one(doc)
    logger.info("New quote received: %s (%s) - %s", quote.name, quote.email, quote.job_type)
    return quote


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

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
