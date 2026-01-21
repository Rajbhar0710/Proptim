# PROPTIM Website - Project Notes

## Overview
Single-page website for **PROPTIM Property Consultants** - a commercial real estate advisory based in Raipur, Chhattisgarh.

**Live URL:** https://proptim-website.vercel.app
**GitHub:** https://github.com/Chirag-chauhan-3949/Proptim
**Vercel Dashboard:** https://vercel.com/chirag-chauhan-3949s-projects/proptim-website

---

## Tech Stack
- **Framework:** Next.js 16.1.4 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Fonts:** DM Serif Display (headings) + DM Sans (body)
- **Hosting:** Vercel (auto-deploy on git push)

---

## Project Structure
```
proptim-website/
├── public/
│   └── manifest.json          # PWA manifest
├── src/app/
│   ├── globals.css            # Global styles & animations
│   ├── layout.tsx             # Root layout with SEO metadata
│   ├── page.tsx               # Main single-page content
│   ├── robots.ts              # SEO robots.txt generator
│   └── sitemap.ts             # SEO sitemap.xml generator
└── package.json
```

---

## Website Sections
1. **Hero** - Logo, tagline "Optimizing Properties", CTAs
2. **About Us** - Company intro, stats (250+ transactions, 5+ years, 50+ brands)
3. **Sectors We Serve** - Offices, Retail, QSR, Logistics
4. **Coverage** - Map of Central India locations
5. **The PROPTIM Edge** - 5 differentiators (Senior Led, Need Analysis, etc.)
6. **Outcomes & Values** - What clients get + company values
7. **Clients** - Brand names (Office clients + Retail/Food clients)
8. **Contact** - Phone, email, address, consultation form
9. **Footer** - Copyright and quick links

---

## SEO Features Implemented
- Optimized meta title & description
- Open Graph tags (Facebook, LinkedIn)
- Twitter Card tags
- JSON-LD structured data (LocalBusiness, RealEstateAgent, Service schemas)
- robots.txt & sitemap.xml
- Canonical URLs
- Geo meta tags for local SEO
- Semantic HTML with ARIA labels

---

## What You Need To Add

### 1. Favicon & Icons (Required for PWA)
Create and add these files to `/public/`:
- `favicon.ico` - 32x32 browser tab icon
- `icon.svg` - SVG version of logo
- `apple-touch-icon.png` - 180x180 for iOS
- `icon-192.png` - 192x192 for Android
- `icon-512.png` - 512x512 for Android splash

### 2. OG Image (Required for Social Sharing)
Create `/public/og-image.png`:
- Size: 1200 x 630 pixels
- Include: PROPTIM logo, tagline, visual branding
- This appears when sharing on Facebook, LinkedIn, Twitter

### 3. Google Search Console Verification
1. Go to https://search.google.com/search-console
2. Add property: `https://proptim-website.vercel.app`
3. Get verification code
4. Update in `src/app/layout.tsx`:
   ```typescript
   verification: {
     google: "your-actual-verification-code",
   },
   ```

### 4. Custom Domain (Optional)
To use `www.proptim.in`:
1. Go to Vercel Dashboard > Project Settings > Domains
2. Add `proptim.in` and `www.proptim.in`
3. Update DNS records at your domain registrar:
   - A record: `76.76.21.21`
   - CNAME: `cname.vercel-dns.com`

### 5. Contact Form Backend (Optional)
Currently the form is frontend-only. To make it functional:
- Option 1: Use Formspree (https://formspree.io)
- Option 2: Use Vercel serverless function
- Option 3: Connect to email service (SendGrid, Resend)

### 6. Analytics (Optional)
Add Google Analytics or Vercel Analytics:
```bash
npm install @vercel/analytics
```

---

## Commands

### Development
```bash
cd E:\Proptim\proptim-website
npm run dev
# Opens at http://localhost:3000
```

### Build & Test Production
```bash
npm run build
npm start
```

### Deploy
```bash
git add .
git commit -m "Your commit message"
git push
# Auto-deploys to Vercel
```

### Manual Vercel Deploy
```bash
npx vercel --prod
```

---

## Brand Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#0077B5` | Main brand color, buttons, headings |
| Dark Blue | `#005a8c` | Hover states, darker accents |
| Light Blue | `#8ED1FC` | Accents, decorative elements |
| Pale Blue | `#E8F4FC` | Backgrounds, subtle highlights |
| Navy | `#1a3a52` | Dark sections |

---

## Contact Information (from PDF)
- **Phone:** 9165477999, 9755303306
- **Email:** adhish@proptim.in
- **Address:** 1495, Aurvindo Enclave, Pachpedi Naka, Raipur - 492001 (C.G.)
- **Website:** www.proptim.in

---

## Future Enhancements Ideas
- [ ] Add property listings section
- [ ] Add blog/news section
- [ ] Add team/founder section with photo
- [ ] Add testimonials from clients
- [ ] Add case studies
- [ ] Multi-language support (Hindi)
- [ ] WhatsApp chat integration
- [ ] Google Maps embed for office location

---

## Support
For any issues with Vercel deployment, check:
- Vercel Dashboard: https://vercel.com/dashboard
- Build logs: Click on deployment > "Building" tab

For code changes:
- Edit files in `src/app/`
- Push to GitHub
- Vercel auto-deploys in ~30 seconds

---

*Last updated: January 2026*
