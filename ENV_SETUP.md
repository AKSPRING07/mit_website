# Environment Variables Configuration

This project now runs as a frontend-only static Vite app.

## Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

   On PowerShell:
   ```powershell
   Copy-Item .env.example .env
   ```

2. Fill in only the values you actually use.

## Supported Variables

| Variable | Description |
|----------|-------------|
| `VITE_RECAPTCHA_SITE_KEY` | Optional Google reCAPTCHA site key used by the contact form |

## Important Notes

- `npm start` runs only the Vite frontend on `http://localhost:3000`
- All CMS-style content in this repo is served from local static data and assets
- Images are loaded from `public/`
- Restart the dev server after changing `.env`

## Accessing Variables In Code

```javascript
const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
```
