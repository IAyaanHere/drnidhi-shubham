# Dr. Nidhi & Shubham — Digital Wedding Invitation

A fully responsive, interactive digital wedding invitation for **Dr. Nidhi & Shubham**, recovered and enhanced with local map rendering and clean branding.

---

## 🌟 Features

- **Interactive Envelope / Cover**: Opening transition animation with music toggle.
- **Event Information**: Ceremony, reception, timeline, family details, and photo gallery.
- **Venue & Google Maps**: Clean Google Maps venue integration for **AMMORA RESORT, Karla, Lonavala** with satellite view toggle and direct navigation directions.
- **Pure & Clean**: All third-party watermarks and vendor branding removed.
- **PWA Ready**: Web manifest and icon configurations included.

---

## 🚀 One-Click Deploy to Vercel

This repository is pre-configured for instant **Zero-Configuration deployment on Vercel**:

1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/IAyaanHere/drnidhi-shubham.git
   git branch -M main
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com).
3. Click **Add New...** -> **Project**.
4. Import `IAyaanHere/drnidhi-shubham`.
5. Keep all default settings (Framework Preset: *Other*, Root Directory: `./`).
6. Click **Deploy**.

> The included `vercel.json` automatically handles clean routing for `/`, `/i/drnidhi-shubham`, `/opened`, `/map-embed.html`, and `/api/geo`.

---

## 💻 Running Locally

### Option 1: Standard Node.js (Zero Dependencies)
```bash
node server.js
```
The server will start listening on:
- **Port 6000**: `http://localhost:6000/i/drnidhi-shubham`
- **Port 6001**: `http://localhost:6001/i/drnidhi-shubham`
- **Port 3000**: `http://localhost:3000/i/drnidhi-shubham`

*(Port 6001 and 3000 are provided as browser-safe mirrors since Chromium blocks port 6000 by default as an X11 port).*

---

## 📁 Project Structure

```
drnidhi-shubham/
├── _next/               # Next.js client bundles, chunks, and CSS
├── fonts/               # Custom web fonts (Pattaya, Bellota, Playfair, etc.)
├── images/              # Decorative artwork and vector assets
├── uploads/             # High-resolution photo gallery and couple portraits
├── i/                   # Invitation slug routes (drnidhi-shubham)
├── api/                 # Mock API endpoints (geo.json)
├── index.html           # Primary interactive wedding invitation
├── opened.html          # Direct opened invitation view
├── map-embed.html       # Google Maps venue integration
├── leaflet.js / .css    # Offline mapping support
├── manifest.json        # Web application manifest
├── vercel.json          # Vercel deployment rewrites & routing configuration
├── package.json         # NPM package configuration
└── server.js            # Standalone multi-port HTTP server
```
