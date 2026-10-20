# DK Productions Website

Static one-page site (HTML, CSS, vanilla JS). No build step, no dependencies. All paths are relative, so it works on a GitHub Pages project subpath.

## Files
- `index.html`: page structure and static copy
- `styles.css`: design tokens (`:root`) and styles
- `script.js`: **all event and venue data** (`UPCOMING_EVENTS`, `PAST_EVENTS`, `VENUES`)
- `assets/`: logo, venue photos, posters

## Preview locally
Open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Add images
The supplied "PDF" contained text only, so no logo, photos, or posters were available. Cards show a neutral "DK" placeholder until you add images:
1. Copy a file into `assets/` (e.g. `event-outlaw-returns-2022.jpg`).
2. In `script.js`, set that item's `image` to `"assets/event-outlaw-returns-2022.jpg"` (keep the `alt` text accurate).
3. For a logo, replace the wordmark in `index.html` with `<img src="assets/dk-productions-logo.png" alt="DK Productions">`. For a hero photo, replace the `.hero-art` block. For social previews, uncomment `og:image` in `<head>` (needs an absolute URL).
Optimize images (roughly under 300 KB each) before adding.

## Add an upcoming event
Add an object to `UPCOMING_EVENTS` in `script.js` using the same fields as a past event (`date` as `YYYY-MM-DD`). The empty-state message disappears automatically. When the event is over, move it to `PAST_EVENTS`.

## Deploy on GitHub Pages
1. Push these files to the root of a GitHub repository.
2. Repo **Settings → Pages**.
3. Under **Build and deployment**, set Source to **Deploy from a branch**, choose your main branch and `/ (root)`, then Save.
4. After a minute the site is live at the URL shown on that page.

## Vendor form
All "Become a Vendor" buttons link to https://forms.gle/YkTHpjZVdpcvs1mv6 (opens in a new tab). No data is collected on the site itself.
