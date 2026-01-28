# Offset Works Website

**Live URL:** https://offsetworks.xyz

Boutique design and development agency website with ASCII animation backgrounds, work portfolio carousel, and bilingual support (EN/ES).

## Architecture

- **Static site** served via Railway
- **No build step** - vanilla JS, CSS, HTML
- Uses `npx serve` for static file serving

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | Main page structure |
| `main.js` | Card system, animations, i18n, work carousel |
| `styles.css` | All styling including color themes |
| `animations.js` | 30+ ASCII animation effects library |

## Work Portfolio

Work items displayed in carousel format with screenshot images:

| Project | Type | Image |
|---------|------|-------|
| Flyin | Web App | `images/flyin-screenshot.png` |
| StablePay | Decentralized Payments | `images/stablepay-screenshot.png` |
| UMO Archive | Live Music Archive | iframe embed |
| Geese Live Archive | Live Music Archive | iframe embed |
| EZTix (WIP) | P2P Ticketing Platform | `images/eztix-screenshot.png` |
| Stash | Decentralized Storage | `images/stash-screenshot.png` |

## Work Card Structure

```
┌─────────────────────────────────────┐
│ Title ▼           [Visit Site]      │  ← work-content-row
│ TYPE                                │
├─────────────────────────────────────┤
│ Expandable description...           │  ← work-details (hidden by default)
├─────────────────────────────────────┤
│                                     │
│         [Screenshot Image]          │  ← work-ascii container
│                                     │
└─────────────────────────────────────┘
```

## Color Themes

16 color themes available: `cyber`, `neon`, `fire`, `ice`, `gold`, `vapor`, `matrix`, `sunset`, `ocean`, `toxic`, `blood`, `royal`, `mint`, `coral`, `arctic`, `lava`

## Internationalization

Supports English and Spanish via `translations` object in `main.js`. Toggle button switches between languages.

## Recent Changes (Jan 2026)

- Replaced iframe embeds with screenshot images for Flyin, StablePay, EZTix, Stash
- Renamed section from "WORKS" to "Recent Work"
- Moved info pane (title, type, Visit Site) to top of work cards
- Moved expandable description inside info pane
- Removed arrow from "Visit Site →" link
- Made carousel arrows whiter for better visibility
- Renamed "FlyInGuate" to "Flyin"

## Deployment

Push to `main` branch triggers automatic Railway deployment.

```bash
git add .
git commit -m "Your message"
git push origin main
```

## Image Sources

Work screenshots stored on Irys (decentralized storage):
- EZTix: `https://gateway.irys.xyz/GaEnoYHnfajhnziUDRmozy8boaN2PmGia8QraMAhgKfD`
- Stash: `https://devnet.irys.xyz/681qmpfNVwiqCpH31jDmzL1HbDVA858hx3TXaKSz475H`
- StablePay: `https://devnet.irys.xyz/ECjHxh7EgabCRC6jEt69pZpQoHzpYs52fGkqP4WdeMfA`
- Flyin: `https://devnet.irys.xyz/4qLbQvDy98NP8ZD5GHpgRsqLq2ZM4Ysqa6ao8QaQmQ9Y`

Local copies in `images/` folder for faster loading.
