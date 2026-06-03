# NikoVision — Product Requirements Document

## Original Problem Statement
Build a marketing website for **NikoVision**, a uPVC glazing business in Adelaide, South Australia, owned by Theofani "Theo" Tzelepis (25, qualified glazier, Tonsley TAFE). Specialises in supply, fitment, repairs, and full renovations of uPVC windows and doors using Deceuninck Legend frames. Target audience: Adelaide homeowners needing repairs, upgrades, or renovations. Rapid Bay hero banner. Modern, premium / architectural design.

## User Personas
- **Adelaide homeowner — single repair**: Stuck sash, broken seal, dropped hinge. Wants fast, honest, local help.
- **Adelaide homeowner — full renovation**: Replacing all windows/doors of an existing home. Cares about energy efficiency, finish quality, and trust.
- **New-build / extension owner**: Architecturally-aware client looking for premium uPVC systems and bespoke advice.

## Core Requirements (Static)
- 6 pages: Home, About, Services, uPVC & Legend, Gallery, Contact
- Hero with Rapid Bay imagery
- Educational content on uPVC benefits + Deceuninck Legend specs
- Quote request form (name, email, phone, suburb, job type, message)
- Contact details displayed (phone, email, service area, hours)
- Australian English copy, no mention of sourcing material externally
- Light coastal architectural theme (navy, sand, off-white); Playfair Display + Manrope

## What's Been Implemented — v1 (2025-12-03)
### Backend (FastAPI + MongoDB)
- `GET /api/` health check
- `POST /api/quotes` — create quote request (validated with Pydantic v2 + EmailStr)
- `GET /api/quotes` — list submitted quotes
- `POST /api/contact` — general contact message endpoint
- Quotes/contacts stored in MongoDB with UUID ids, ISO timestamps

### Frontend (React + Tailwind + shadcn)
- Light coastal architectural theme with Playfair Display headings + Manrope body
- Sticky glassmorphism navbar with active route indicator
- Mobile hamburger menu
- **Home**: Animated Rapid Bay hero, Theo intro/philosophy, 4-service grid, Deceuninck feature band, gallery teaser, contact CTA banner
- **About**: Theo's story, 4 brand values grid, CTA
- **Services**: Alternating image/text rows with detailed bullet lists for each service
- **uPVC & Legend**: Intro, 6 benefits grid, Deceuninck Legend deep-dive with stat cards (5-chamber, 76mm, 52mm, 10yr), FAQ accordion
- **Gallery**: Asymmetric bento grid of completed-job imagery
- **Contact**: Quote form (shadcn Select for job type, Input/Textarea), success state, contact details sidebar, sonner toasts
- Comprehensive `data-testid` coverage on all interactive + key elements
- All copy in Australian English; contact details set as easily-swappable placeholders

### Testing
- Iteration 1: 100% backend pass (7 pytest tests), 100% frontend pass

## Prioritised Backlog
### P0 — needed before launch
- Swap placeholder phone (0400 000 000), email (hello@nikovision.com.au) with Theo's real contact details
- Add Theo's real photos and video assets to Gallery (currently stock imagery)
- Replace stock Rapid Bay hero with Theo's supplied photo

### P1 — high-value next phase
- Email forwarding integration (Resend/SendGrid) so quote submissions go to Theo's inbox automatically
- Basic anti-spam: honeypot field or simple captcha on /api/quotes and /api/contact
- Social media links in footer (Instagram, Facebook) once Theo provides handles
- Google Business / reviews testimonials section
- SEO: meta tags, OG images, sitemap, structured data (LocalBusiness schema)

### P2 — nice-to-have
- Photo upload field on Quote form for clients to send job photos
- Project case study sub-pages from Gallery items
- Blog/news section for uPVC education content
- Admin dashboard to view submitted quotes
- Rate limiting on public form endpoints
- Move CORS allow_origins from '*' to specific allowed origins (currently incompatible with credentials=true per spec)
- Mount sonner `<Toaster />` once at App root instead of per-page

## Next Tasks (immediate)
1. Collect Theo's real photos (Rapid Bay banner + previous jobs) and replace stock images
2. Collect real phone, email, social handles → update `siteData.js` (single source of truth)
3. Set up email forwarding (Resend recommended) so quote submissions reach Theo's inbox
