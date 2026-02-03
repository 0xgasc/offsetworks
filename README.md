# Offset Works Website

**Live URL:** https://offsetworks.xyz

Boutique design and development studio website with ASCII animation backgrounds, rocola-style work tracklist, and bilingual support (EN/ES).

## Architecture

- **Static site** served via Railway
- **No build step** - vanilla JS, CSS, HTML
- Uses `npx serve` for static file serving

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | Main page structure |
| `main.js` | Card system, animations, i18n, work tracklist |
| `styles.css` | All styling including color themes |
| `animations.js` | 30+ ASCII animation effects library |

## Work Portfolio

Jukebox/rocola-style tracklist — all projects visible, click to expand:

| Project | Type | Status | Link |
|---------|------|--------|------|
| Flyin | Web App | Live | flyinguate.com |
| StablePay | Decentralized Payments | Live | stablepay-nine.vercel.app |
| UMO Archive | Live Music Archive | Live | umo-live.xyz |
| Geese Live Archive | Live Music Archive | Live | geeselive-production-4233.up.railway.app |
| EZTix | P2P Ticketing Platform | Live | eztix-lyart.vercel.app |
| Stash | Decentralized Storage | Live | aeter-eight.vercel.app |
| Lynx | Creator Profile Platform | WIP | - |
| Stok | Inventory Management | WIP | - |

## Work Tracklist Structure

```
┌──────────────────────────────────────┐
│ ▶ flyin                        LIVE  │  ← track header (click to expand)
│   WEB APP                            │
├──────────────────────────────────────┤
│   [Screenshot Image]                 │  ← expanded content
│   Description text...                │
│   Visit Site                         │
├──────────────────────────────────────┤
│   stablepay                    LIVE  │  ← collapsed track
│   DECENTRALIZED PAYMENTS             │
├──────────────────────────────────────┤
│   lynx                         WIP   │  ← WIP badge (dimmed)
│   CREATOR PROFILE PLATFORM           │
└──────────────────────────────────────┘
```

Features:
- **Shuffled order** on each page load
- **Accordion expand** — only one track open at a time
- **LIVE/WIP badges** — green accent for live, dimmed for WIP
- **Lowercase titles** — clean aesthetic
- **▶ indicator** on active track

## Hero Section

```
systems that work.

boutique design and development studio for startups, creatives and founders.
competitive rates, built from scratch.
```

## Color Themes

16 color themes available: `cyber`, `neon`, `fire`, `ice`, `gold`, `vapor`, `matrix`, `sunset`, `ocean`, `toxic`, `blood`, `royal`, `mint`, `coral`, `arctic`, `lava`

## Internationalization

Supports English and Spanish via `translations` object in `main.js`. Toggle button switches between languages.

## Recent Changes (Jan-Feb 2026)

- **Rocola redesign** — replaced carousel with jukebox-style tracklist
- **All projects visible** — no more one-at-a-time navigation
- **Shuffled order** — randomizes on each page load
- **LIVE/WIP badges** — auto-assigned based on link availability
- **Removed track numbers** — cleaner look
- **Lowercase titles** — via CSS text-transform
- **Added projects**: Lynx (creator profiles), Stok (inventory management)
- **Updated hero copy** — shorter headline, lowercase subtext
- **Stash now live** at aeter-eight.vercel.app

## Deployment

Push to `main` branch triggers automatic Railway deployment.

```bash
git add .
git commit -m "Your message"
git push origin main
```

## Image Sources

Work screenshots stored locally in `images/` folder. Original uploads on Irys:
- EZTix: `gateway.irys.xyz/GaEnoYHnfajhnziUDRmozy8boaN2PmGia8QraMAhgKfD`
- Stash: `devnet.irys.xyz/AF7J3gh4hCEqANytZYcjVZnbiMbJmi4SoDLiEuKBrrN5`
- StablePay: `devnet.irys.xyz/ECjHxh7EgabCRC6jEt69pZpQoHzpYs52fGkqP4WdeMfA`
- Flyin: `devnet.irys.xyz/4qLbQvDy98NP8ZD5GHpgRsqLq2ZM4Ysqa6ao8QaQmQ9Y`
- UMO Archive: `devnet.irys.xyz/9E3uTk18THauLf1R1FtMuiFx6u17v3MHCQpTJPkL3ZAV`
- Geese: `devnet.irys.xyz/DUZc8wEQDXx7qMGxaEXQUecW82FJ7mTfYMhSMjBHkWyw`
- Lynx: `devnet.irys.xyz/64Sb1iU9DioJjKPby9hJLM7VUZU66VuPpJNskq4XP25T`
- Stok: `devnet.irys.xyz/HBXfzcHgL4LNQj9nQMUec6SYfSuqyxH5eUsmggcug8hw`
