# 937 The Underground

Dayton's independent music landing page — built with Next.js, TypeScript, and Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Lucide React** icons
- **Google Fonts**: Syne (display), Plus Jakarta Sans (body)

## Project Structure

- `src/components/UndergroundLanding.tsx` — Main single-page landing component
- `src/components/TransmitTrackForm.tsx` — Artist submission (presigned R2 + Formspree)
- `src/app/api/upload/route.ts` — Issues presigned PUT URLs (JSON only, Netlify-safe)
- `src/app/page.tsx` — Home route
- `src/app/layout.tsx` — Fonts and metadata

## Uploads (Direct to Cloudflare R2)

Large files never pass through the Netlify function. Flow:

1. Browser `POST /api/upload` with `{ artistName, filename, fileType, fileSize }`
2. **≤ 20MB:** single presigned `PUT` to R2  
   **> 20MB:** multipart — concurrent 20MB part `PUT`s, then `POST /api/upload/complete`
3. Browser `POST` Formspree with the public R2 stream link

Uploaded files are stored under **`{artist-slug}/{artist-slug}_{timestamp}.ext`** in R2 (e.g. `king-jb/king-jb_1780116681178.mp3`). The artist slug is derived from the **Artist / band name** field on the submit form. Enable **View prefixes as folders** in the R2 dashboard to browse by artist.

**R2 CORS:** Apply `r2-cors.example.json` in the Cloudflare R2 bucket settings (include your production domain and `http://localhost:3000`).

**Netlify env vars:** Set `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_ENDPOINT`, `R2_BUCKET_NAME`, `R2_PUBLIC_BASE_URL`, and `NEXT_PUBLIC_FORMSPREE_URL` in the Netlify dashboard.
