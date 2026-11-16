# Shital Tours & Travels — Next.js

Static HTML site migrated 1:1 to Next.js 15 (App Router, TypeScript).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Where things live

| Old (static)                    | New                                              |
| ------------------------------- | ------------------------------------------------ |
| `css/style.css`                 | `src/app/globals.css` (same classes; only image paths → `/images/...`) |
| `images/`                       | `public/images/` (same paths)                    |
| `main.js` header/footer         | `src/components/layout/` (Header, Footer, MobileBar) |
| `BIZ` object                    | `src/lib/config.ts`                              |
| `bizHref()` / `data-biz`        | `src/lib/links.ts`, `src/components/ui/BizLink.tsx` |
| `toast()`                       | `src/components/ui/Toast.tsx` (`useToast`)       |
| `validate()`                    | `src/hooks/useFormValidation.ts`                 |
| Fare model, `inr`, dates        | `src/lib/fare.ts`, `src/lib/format.ts`           |
| localStorage                    | `src/lib/storage.ts` (same keys)                 |
| Inline SVGs                     | `src/components/icons/index.tsx`                 |
| Fleet `<script>`                | `src/components/fleet/` (edit vehicles in `data.ts`) |

## Driver app API

- `GET /api/trips` returns all trips.
- `GET /api/trips?driverPhone=9876543210` returns one driver's trips (`+91` and spaces are ignored).
- Data comes from `src/data/trips.json`. To use a database, change only `src/lib/trips.ts`.
- Every response sends CORS `*` and `Cache-Control: no-store`.

```ts
// React Native
const res = await fetch(`https://YOUR-SITE.vercel.app/api/trips?driverPhone=${phone}`);
const trips = await res.json();
```

## Old vs new checklist

- [ ] Home: hero, about image, 4 services, 3 steps, hotel band, contact cards (tap to call, WhatsApp, mail, map), "Send an enquiry" button opens /contact
- [ ] Header: active link highlighted, mobile burger drawer, shade and × close
- [ ] Footer: logo, quick links, phone, WhatsApp, email and office links, current year
- [ ] Mobile bottom bar (Call / WhatsApp / Book Now) shows everywhere except /review and /confirmed
- [ ] Packages: 4 packages, each "Request This Trip" goes to `/book?service=...`, hotel button goes to `/book?for=hotel`
- [ ] Book: presets from `?service=` and `?for=hotel`, Custom days field shows/hides, notes counter 0/500, past date rejected, errors show and scroll into view, submit goes to /review
- [ ] Review: summary rows, fare (₹ en-IN), payment cards switch, secure note only for "Pay now", "Processing…" text, BK-xxxx id, redirects to /book when nothing is saved
- [ ] Confirmed: title per service, Track toast, itinerary .txt download, Contact support tel link, empty state when no booking
- [ ] Fleet: thumbnails switch photos, lightbox with arrows / Esc / ← →, missing-photo fallback
- [ ] Drive: file name shown, licence must be pdf/jpg/png under 5 MB, saved to `shital_driver_apps`, form resets, toast
- [ ] Contact: "Call Us Now" opens tel:, validation, reset and toast
- [ ] Old URLs redirect (`/book.html` → `/book`, `/index.html` → `/`)
- [ ] Each page's `<title>` matches the old one

## Deploy on Vercel

1. Push this folder to a GitHub repo.
2. vercel.com → **Add New → Project** → import the repo (Next.js is detected automatically).
3. Environment variable: `NEXT_PUBLIC_SITE_URL=https://your-domain.com` (used for sitemap, robots and Open Graph).
4. Click **Deploy**. Add your custom domain under **Settings → Domains**.
5. Point the driver app at `https://your-domain.com/api/trips`.
