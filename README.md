# PROPTIM - Commercial Real Estate Consultants Website

A modern, single-page website for **PROPTIM Property Consultants** — a commercial real estate advisory based in Raipur, Chhattisgarh, serving clients across Central India.

**Live URL:** https://proptim-website.vercel.app
**GitHub:** https://github.com/Chirag-chauhan-3949/Proptim

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Website Sections](#website-sections)
- [Features](#features)
  - [SEO & Metadata](#seo--metadata)
  - [Property Submission System](#property-submission-system)
  - [PDF Generation](#pdf-generation)
  - [Email Notifications](#email-notifications)
  - [File Uploads](#file-uploads)
- [Environment Variables](#environment-variables)
- [Brand Colors](#brand-colors)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [Pending Setup Tasks](#pending-setup-tasks)
- [Future Enhancements](#future-enhancements)

---

## Overview

PROPTIM blends institutional-grade rigour with founder-led attention to help occupiers, investors, and landlords make smarter, faster & better property decisions across Central India (Chhattisgarh and Madhya Pradesh).

Key stats:
- **250+** successful transactions
- **5+** years of experience
- **50+** brands served

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js (App Router) | 16.1.4 | React framework with server-side rendering |
| React | 19.2.3 | UI library |
| TypeScript | ^5 | Type safety |
| Tailwind CSS | ^4 | Utility-first styling |
| Supabase | ^2.91.0 | Database & file storage |
| Resend | ^6.8.0 | Transactional email service |
| @react-pdf/renderer | ^4.3.2 | Server-side PDF generation |
| Vercel | — | Hosting & deployment |

**Fonts:** DM Serif Display (headings) + DM Sans (body)

---

## Project Structure

```
proptim-website/
├── public/
│   ├── manifest.json              # PWA manifest
│   ├── favicon.ico                # Browser tab icon
│   └── *.svg                      # Decorative SVGs
├── src/
│   ├── app/
│   │   ├── globals.css            # Global styles, CSS variables, animations
│   │   ├── layout.tsx             # Root layout with SEO metadata & JSON-LD
│   │   ├── page.tsx               # Main single-page landing (all sections)
│   │   ├── robots.ts             # SEO robots.txt generator
│   │   ├── sitemap.ts            # SEO sitemap.xml generator
│   │   ├── favicon.ico
│   │   ├── propose-property/
│   │   │   └── page.tsx           # Property submission form page
│   │   └── api/
│   │       └── submit-property/
│   │           └── route.ts       # API route for property form submissions
│   └── lib/
│       ├── supabase.ts            # Server-side Supabase client & types
│       ├── supabase-client.ts     # Client-side Supabase client for file uploads
│       ├── pdf-generator.tsx      # PDF generation using @react-pdf/renderer
│       └── email.ts               # Email sending via Resend
├── next.config.ts                 # Next.js config (50mb body limit for uploads)
├── vercel.json                    # Vercel function timeout config (60s)
├── tsconfig.json                  # TypeScript config with @/* path alias
├── postcss.config.mjs             # PostCSS with Tailwind plugin
├── eslint.config.mjs              # ESLint with Next.js core-web-vitals + TS
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens at http://localhost:3000

### Build & Preview Production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## Website Sections

The main page (`src/app/page.tsx`) is a single-page layout with these sections:

| # | Section | ID | Description |
|---|---|---|---|
| 1 | Hero | — | Logo, tagline "Optimizing Properties", CTAs (Get in Touch / Propose Property) |
| 2 | About Us | `#about` | Company intro, stats (250+ transactions, 5+ years, 50+ brands) |
| 3 | Sectors We Serve | `#sectors` | Offices, Retail, QSR, Logistics cards |
| 4 | Coverage | `#coverage` | SVG map of Central India locations (Raipur HQ, Durg-Bhilai, Korba, Bilaspur, Bhopal, Indore, Jabalpur) |
| 5 | The PROPTIM Edge | `#edge` | 5 differentiators (Senior Led, Need Analysis, Data & Judgment, Transparent Scope, Confidential & Ethical) |
| 6 | Outcomes & Values | — | Tangible outcomes + 4 core values (Integrity, Performance, Confidentiality, Partnerships) |
| 7 | Clients | `#clients` | Brand logos/names — 9 office clients + 19 retail/food clients |
| 8 | Contact | `#contact` | Phone, email, address, consultation form |
| 9 | Footer | — | Copyright, quick links |

Additional page:
- **Propose Property** (`/propose-property`) — Multi-section property submission form

---

## Features

### SEO & Metadata

Implemented in `src/app/layout.tsx`:

- Optimized meta title & description with keyword targeting
- Open Graph tags (Facebook, LinkedIn sharing)
- Twitter Card tags (summary_large_image)
- JSON-LD structured data with 6 schemas:
  - `RealEstateAgent` — Organization info
  - `WebSite` — With SearchAction
  - `WebPage` — Page metadata
  - `BreadcrumbList` — Navigation
  - `LocalBusiness` — Local SEO with aggregate rating
  - `Service` — Service catalog (Office, Retail, QSR, Logistics)
- `robots.txt` generated via `src/app/robots.ts`
- `sitemap.xml` generated via `src/app/sitemap.ts`
- Canonical URLs
- Geo meta tags for local SEO (`geo.region`, `geo.position`, `ICBM`)
- Semantic HTML with ARIA labels
- PWA manifest (`public/manifest.json`)

### Property Submission System

**Flow:**

1. User fills the multi-section form at `/propose-property`
2. Files (pictures + video) are uploaded **directly from the client** to Supabase Storage using the client-side Supabase instance
3. The form data (with storage URLs instead of files) is sent via `POST /api/submit-property`
4. The API route:
   - Saves the submission to the `property_submissions` Supabase table
   - Generates a PDF of the property details
   - Sends an email notification with the PDF attached to `adhish@proptim.in`

**Form sections:**
- **Location Details** — State, City, Market Name, Landmark, Google Location, Brands Nearby, Brands on Same Lane
- **Property Details** — Frontage, Parking, Carpet Area, Total Floors, Proposed Floor Level, Slab/Beam Height, Expected Rent, Lease Status, Handover Time
- **Property Media** — Pictures (multiple, front/left/right views), Video (360 video)
- **Utilities & Compliance** — Power Supply, Water Supply, Washroom, Sanction Plan, Building Commencement, Branding Height, Fire NOC
- **Submission Details** — Submitted By, Mobile No., Owner's Name, Owner's Contact

### PDF Generation

Uses `@react-pdf/renderer` in `src/lib/pdf-generator.tsx`:

- Generates an A4 PDF with all property submission fields
- Includes PROPTIM branding (logo, colors)
- Links to uploaded media (pictures/video)
- Timestamp with IST timezone
- Footer with contact information

### Email Notifications

Uses `Resend` in `src/lib/email.ts`:

- Sends an HTML email with property summary
- Attaches the generated PDF
- Subject format: `New Property Submission - {City}, {State} | {Submitter Name}`
- Recipient configurable via `NOTIFICATION_EMAIL` env var (defaults to `adhish@proptim.in`)

### File Uploads

Two-tier upload system:

1. **Client-side direct upload** (`src/lib/supabase-client.ts`) — Files upload directly from browser to Supabase Storage bucket `property-files`, then URLs are sent to the API
2. **Server-side fallback** (`src/app/api/submit-property/route.ts`) — If direct URLs aren't provided, the API can upload files server-side (backward compatibility)

**Storage structure:**
```
property-files/
├── pictures/
│   └── {timestamp}-{sanitized_filename}
└── videos/
    └── {timestamp}-{sanitized_filename}
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Resend (email service)
RESEND_API_KEY=re_xxxxx

# Notification email (optional, defaults to adhish@proptim.in)
NOTIFICATION_EMAIL=adhish@proptim.in
```

### Supabase Setup

Required Supabase resources:

1. **Table:** `property_submissions` with columns matching the `PropertySubmission` interface in `src/lib/supabase.ts`
2. **Storage bucket:** `property-files` (public access for reading uploaded files)

---

## Brand Colors

| Color | Hex | Usage |
|---|---|---|
| Primary Blue | `#0077B5` | Main brand color, buttons, headings, CTAs |
| Dark Blue | `#005a8c` | Hover states, darker accents |
| Light Blue | `#8ED1FC` | Decorative accents, light highlights |
| Pale Blue | `#E8F4FC` | Backgrounds, subtle highlights |
| Navy | `#1a3a52` | Dark sections, footer background |

---

## API Reference

### POST `/api/submit-property`

Submits a property proposal form.

**Content-Type:** `multipart/form-data`

**Fields:**

| Field | Type | Required | Description |
|---|---|---|---|
| State | string | Yes | Indian state |
| City | string | Yes | City name |
| Market Name | string | Yes | Area/market name |
| Landmark | string | No | Nearest landmark |
| Google Location | string | Yes | Google Maps link |
| Brands Nearby | string | No | Nearby brands |
| Brands on Same Lane | string | No | Same lane brands |
| Frontage | string | Yes | Frontage measurement |
| Parking | string | No | Parking details |
| Carpet Area | string | Yes | Carpet area per floor |
| Total Floors | number | Yes | Total floors in building |
| Proposed Floor Level | string | Yes | Proposed floor |
| Slab Height and Beam Height | string | Yes | Height details |
| Expected Rent | string | Yes | Expected rent amount |
| Lease Status | string | No | Current lease status |
| Handover Time | string | No | Handover timeline |
| Power Supply | string | No | Power supply details |
| Water Supply | string | No | Water supply details |
| Washroom | string | No | Washroom details |
| Sanction Plan | string | Yes | Sanction plan status |
| Building Commencement | string | No | Commencement letter details |
| Branding Height | string | No | Branding signage height |
| Fire NOC | string | No | Yes / No / Not Applicable |
| Submitted By | string | Yes | Submitter name |
| Mobile No | string | Yes | Submitter phone |
| Owner Name | string | No | Property owner name |
| Owner Contact | string | No | Owner phone number |
| Pictures | File[] | No | Property images (server fallback) |
| Video | File | No | 360 video (server fallback) |
| PictureUrls | string (JSON) | No | Pre-uploaded image URLs (client upload) |
| VideoUrl | string | No | Pre-uploaded video URL (client upload) |

**Success Response (200):**
```json
{
  "success": true,
  "message": "Property submitted successfully!",
  "data": { "id": "uuid" }
}
```

**Error Response (500):**
```json
{
  "success": false,
  "message": "Failed to save submission to database.",
  "error": "details"
}
```

**Runtime:** Node.js, 60s timeout (configured in `vercel.json` and route exports)

---

## Deployment

### Auto-deploy via Git Push

```bash
git add .
git commit -m "Your commit message"
git push
```

Vercel auto-deploys on push to the main branch (~30 seconds).

### Manual Deploy

```bash
npx vercel --prod
```

### Vercel Dashboard

https://vercel.com/chirag-chauhan-3949s-projects/proptim-website

---

## Pending Setup Tasks

### 1. Favicon & PWA Icons

Add these files to `/public/`:
- `favicon.ico` — 32x32 browser tab icon
- `icon.svg` — SVG logo
- `apple-touch-icon.png` — 180x180 for iOS
- `icon-192.png` — 192x192 for Android
- `icon-512.png` — 512x512 for Android splash

### 2. OG Image

Create `/public/og-image.png` (1200x630px) with PROPTIM logo, tagline, and branding for social sharing previews.

### 3. Google Search Console

1. Go to https://search.google.com/search-console
2. Add property: `https://proptim-website.vercel.app`
3. Get verification code
4. Update `src/app/layout.tsx`:
   ```typescript
   verification: {
     google: "your-actual-verification-code",
   }
   ```

### 4. Custom Domain (Optional)

To use `www.proptim.in`:
1. Vercel Dashboard > Project Settings > Domains > Add `proptim.in` and `www.proptim.in`
2. Update DNS records:
   - A record: `76.76.21.21`
   - CNAME: `cname.vercel-dns.com`

### 5. Analytics (Optional)

```bash
npm install @vercel/analytics
```

---

## Future Enhancements

- [ ] Add property listings section
- [ ] Add blog/news section
- [ ] Add team/founder section with photo
- [ ] Add testimonials from clients
- [ ] Add case studies
- [ ] Multi-language support (Hindi)
- [ ] WhatsApp chat integration
- [ ] Google Maps embed for office location

---

## Contact

- **Phone:** 9165477999, 9755303306
- **Email:** adhish@proptim.in
- **Address:** 1495, Aurvindo Enclave, Pachpedi Naka, Raipur - 492001 (C.G.)
- **Website:** www.proptim.in
