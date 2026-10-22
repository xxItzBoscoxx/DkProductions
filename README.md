# DK Productions Website (v3, purple colorway)

Static one-page site (HTML, CSS, vanilla JS). No build step, no dependencies, no external requests. All paths are relative, so it works on a GitHub Pages project subpath.

## Look and feel
White-first layout with frosted header, glossy buttons, soft layered shadows, and cards that lift and shimmer on hover. Buttons ripple on click and panels fade in on scroll; both switch off for visitors who prefer reduced motion. Colors, radii, and shadows are CSS variables at the top of `styles.css`.

## Files
- `index.html`: page structure and static copy
- `styles.css`: design tokens (`:root`) and styles
- `script.js`: **all event and venue data** (`UPCOMING_EVENTS`, `PAST_EVENTS`, `VENUES`) plus rendering
- `assets/`: logo, favicon, hero, Inwood photo, venue photos, event posters (optimized for web)

## Preview locally
Open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Change or add images
1. Copy the file into `assets/` (lowercase names, no spaces; paths are case-sensitive on GitHub Pages).
2. In `script.js`, set the item's `image` to `"assets/your-file.jpg"`, with `w` and `h` as its pixel size (prevents layout shift) and an accurate `alt`.
3. Hero photo: replace `assets/hero.jpg` (it shows on the right side of the hero and fades into green on the left; a bright, people-focused photo works best). Inwood photo: replace `assets/inwood.jpg`. Logo: replace `assets/logo.jpg` and `assets/favicon.png`.
4. Social preview: uncomment `og:image` in `index.html` (needs an absolute URL once the site is live).
Aim for under about 300 KB per image. Click a poster on the site to view it larger.

## Event cards
Cards show the poster thumbnail, title, date, time, and venue. The address, featured vendors, and description open under a **Details** button. Click a poster to see it full size.

## Add an upcoming event
Add an object to `UPCOMING_EVENTS` in `script.js` using the same fields as a past event (`date` as `YYYY-MM-DD`). The "No Upcoming Events" message disappears automatically. When the event is over, move it to `PAST_EVENTS`.

## Deploy on GitHub Pages
1. Push these files to the root of a GitHub repository.
2. Repo **Settings → Pages**.
3. Under **Build and deployment**, set Source to **Deploy from a branch**, choose your main branch and `/ (root)`, then Save.
4. After a minute the site is live at the URL shown on that page.

## Vendor form
All "Become a Vendor" buttons link to https://forms.gle/YkTHpjZVdpcvs1mv6 (opens in a new tab). No data is collected on the site itself.
