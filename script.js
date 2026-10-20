/* =========================================================
   DK Productions – content lives here. Edit the arrays below.
   Images: put files in assets/ and set e.g. image: "assets/my-poster.jpg".
   Leave image as null to show a neutral placeholder.
   ========================================================= */

const JIMMYS = { venue: "Jimmy’s Place Bar & Grill", address: "205 Sheridan Blvd, Inwood, NY 11096" };

// UPCOMING EVENTS: empty = "no upcoming events" message. To add one, push an object
// in the same shape as PAST_EVENTS below (date as YYYY-MM-DD). Do NOT leave past dates here.
const UPCOMING_EVENTS = [];

// PAST EVENTS (order doesn't matter; displayed newest first)
const PAST_EVENTS = [
  { title: "The Outlaw Returns", ...JIMMYS, date: "2022-01-29", time: "3 PM – 8 PM",
    featuring: ["Outlaw Designs","Creative Kitty","Lisa Eye","Sage Candles"],
    description: "Noel at the stick. Trinkets, jewelry, keychains, and other handmade creations.",
    image: "./assets/outlawreturns.jpg", alt: "Poster for The Outlaw Returns, January 29, 2022" },
  { title: "Trinks N’ Drinks", ...JIMMYS, date: "2022-02-19", time: "3 PM – 8 PM",
    featuring: ["Outlaw Designs","Lovecraft Designs","The Eye","Sage Candles","The Plant Lab NYC","FireHouse BBQ","Johnny Burgers"],
    image: "assets/trinks.jpg", alt: "Poster for Trinks N’ Drinks, February 19, 2022" },
  { title: "Trinks N’ Drinks: Mother’s Day Edition", ...JIMMYS, date: "2022-04-23", time: "3 PM – 8 PM",
    featuring: ["Outlaw Designs","The Eye","Creative Kitty","The Plant Lab NYC","FireHouse BBQ","Johnny Burgers"],
    description: "Raffles, prizes, handmade custom jewelry, trinkets, keychains, plants, and more.",
    image: "assets/mothersday.jpg", alt: "Poster for Trinks N’ Drinks: Mother’s Day Edition, April 23, 2022" },
  { title: "Trinks N’ Drinks", ...JIMMYS, date: "2022-07-17", time: "12:30 PM – midnight",
    featuring: ["Outlaw Designs","The Plant Lab NYC","The Eye","FireHouse BBQ","Crystal’s Custom Purses","Loner Craftworks","Julia’s Jewelry"],
    description: "Raffles and prizes.",
    image: "assets/trinks3.jpg", alt: "Poster for Trinks N’ Drinks, July 17, 2022" },
  { title: "BBQ", ...JIMMYS, date: "2023-08-27", time: "1 PM – 8 PM",
    image: "assets/bbq.jpg", alt: "Poster for the BBQ, August 27, 2023" },
  { title: "Live Music: The Rockawades", ...JIMMYS, date: "2025-04-13", time: "3 PM – 7 PM",
    image: "assets/rockawades.png", alt: "Poster for Live Music: The Rockawades, April 13, 2025" },
  { title: "Trinks N’ Drinks Returns!", ...JIMMYS, date: "2026-04-25", time: "12:30 PM – midnight",
    featuring: ["Outlaw Designs","Creative Kitty","The Eye","The Plant Lab NYC","FireHouse BBQ"],
    description: "Raffles and prizes, $5 margaritas, custom jewelry, keychains, trinkets, plants, and more.",
    image: "assets/TDreturns.png", alt: "Poster for Trinks N’ Drinks Returns!, April 25, 2026" }
];

// VENUES
const VENUES = [
  { name: "Jimmy’s Place Bar & Grill", address: "205 Sheridan Blvd, Inwood, NY 11096",
    image: "assets/jimmysplace.png", alt: "Jimmy’s Place Bar & Grill in Inwood, NY",
    description: "A beloved, family-owned Irish pub in Inwood, Jimmy’s Place has been a neighborhood staple since September 28, 1962, when it was founded by Jimmy Boyle. Known for its welcoming atmosphere, the bar brings people together over live music, sports events, and arcade games. Jimmy’s Place also celebrates local tradition by hosting festive St. Patrick’s Day gatherings, making it a cherished spot for the community to connect and celebrate." },
  { name: "Leonardo DaVinci Lodge 2385", address: "202 Wanser Ave, Inwood, NY 11096",
    image: "assets/lodge.png", alt: "Leonardo DaVinci Lodge 2385 in Inwood, NY",
    description: "A local gathering place rooted in Italian American heritage, Leonardo DaVinci Lodge 2385 serves as the meeting place for Inwood’s local charter of the Order Sons and Daughters of Italy in America, the nation's oldest and largest Italian American fraternal organization. With a welcoming outdoor space, the lodge provides a setting for community cookouts, parties, and get-togethers, bringing people together through shared traditions, cultural pride, and neighborhood connection." }
];

/* ---------------- rendering (no need to edit below) ---------------- */
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; };
const fmtDate = iso => new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { weekday:"long", year:"numeric", month:"long", day:"numeric", timeZone:"UTC" });
const mapUrl = addr => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(addr);

function media(src, alt) {
  const m = el("div", "media");
  const placeholder = () => { m.replaceChildren(el("span", "", "DK")); m.setAttribute("aria-hidden", "true"); };
  if (!src) { placeholder(); return m; }
  const img = new Image();
  img.src = src; img.alt = alt || ""; img.loading = "lazy"; img.decoding = "async";
  img.onerror = placeholder;
  m.append(img);
  return m;
}

function addressLink(addr) {
  const a = el("a", "", addr);
  a.href = mapUrl(addr); a.target = "_blank"; a.rel = "noopener noreferrer";
  a.setAttribute("aria-label", addr + " (opens in Google Maps, new tab)");
  return a;
}

function eventCard(ev) {
  const card = el("article", "card poster");
  card.append(media(ev.image, ev.alt));
  const b = el("div", "body");
  b.append(el("h3", "", ev.title));
  if (ev.date) { const p = el("p", "meta"); p.append(el("strong", "", fmtDate(ev.date))); b.append(p); }
  if (ev.time) b.append(el("p", "meta", ev.time));
  if (ev.venue) b.append(el("p", "meta", ev.venue));
  if (ev.address) { const p = el("p", "meta"); p.append(addressLink(ev.address)); b.append(p); }
  if (ev.featuring && ev.featuring.length) { const p = el("p", "meta"); p.append(el("strong", "", "Featuring: "), ev.featuring.join(", ")); b.append(p); }
  if (ev.description) b.append(el("p", "", ev.description));
  card.append(b);
  return card;
}

// Upcoming
const up = document.getElementById("upcoming");
if (UPCOMING_EVENTS.length) {
  const g = el("div", "grid");
  [...UPCOMING_EVENTS].sort((a, b) => a.date.localeCompare(b.date)).forEach(e => g.append(eventCard(e)));
  up.append(g);
} else {
  const box = el("div", "empty");
  box.append(el("div", "cal", "📅"), el("h3", "", "No Upcoming Events Just Yet"),
    el("p", "", "We don't have any upcoming events scheduled at the moment. Check back soon for updates and future opportunities to connect with our community!"));
  box.firstChild.setAttribute("aria-hidden", "true");
  up.append(box);
}

// Past (newest first)
const past = document.getElementById("past");
[...PAST_EVENTS].sort((a, b) => b.date.localeCompare(a.date)).forEach(e => past.append(eventCard(e)));

// Venues
const vs = document.getElementById("venues");
VENUES.forEach(v => {
  const c = el("article", "card");
  c.append(media(v.image, v.alt));
  const b = el("div", "body");
  b.append(el("h3", "", v.name), el("p", "", v.description));
  const p = el("p", "meta"); p.append(addressLink(v.address)); b.append(p);
  c.append(b); vs.append(c);
});

// Mobile nav
const toggle = document.querySelector(".nav-toggle"), nav = document.getElementById("nav");
const setNav = open => { nav.classList.toggle("open", open); toggle.setAttribute("aria-expanded", open); };
toggle.addEventListener("click", () => setNav(!nav.classList.contains("open")));
nav.addEventListener("click", e => { if (e.target.closest("a")) setNav(false); });
document.addEventListener("keydown", e => { if (e.key === "Escape") { setNav(false); toggle.focus(); } });

document.getElementById("year").textContent = new Date().getFullYear();
