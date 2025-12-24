[![ar](https://img.shields.io/badge/lang-ar-brightgreen.svg)](README.md)
[![en](https://img.shields.io/badge/lang-en-red.svg)](README.en.md)

# quran-detector-web

A small static website (no build step) that lets users paste text and call the **quran-detector-api** `POST /v1/annotate`
endpoint directly from the browser, then displays the annotated text.

- API (production): https://quran-detector-api.ieasybooks.com/
- Library: https://github.com/ieasybooks/quran-detector

## Features

- Arabic + English UI (RTL/LTR switching).
- Calls the API directly via `fetch()` (no proxy).
- Advanced settings UI for detector settings and API base URL.
- Responsive layout and a calming loading overlay while waiting for the response.
- CDN fonts (Google Fonts).

## Files

- `index.html`
- `style.css`
- `script.js`

## How it works

The frontend sends:

```json
{
  "text": "...",
  "settings": {
    "find_errors": true,
    "find_missing": false,
    "allowed_error_pct": 0.25,
    "min_match": 3
  }
}
```

to:

- `https://quran-detector-api.ieasybooks.com/v1/annotate`

and expects:

```json
{ "annotated_text": "..." }
```

## Run locally

Any static server works.

### Option A: Python

```bash
python -m http.server 5173 --directory quran-detector-web
```

Open: `http://127.0.0.1:5173`

### Option B: `npx serve`

```bash
npx serve -l 5173 quran-detector-web
```

## API URL & CORS

By default, the UI uses `https://quran-detector-api.ieasybooks.com/` (saved in `localStorage`).
You can override it in **Advanced settings**.

If you point to a different API host, it must allow your origin via CORS (`QD_API_CORS_ORIGINS` on the API service).

