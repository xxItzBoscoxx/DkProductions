/* =========================================================
   DK Productions – content lives here. Edit the arrays below.
   Images: put files in assets/ and set e.g. image: "assets/my-poster.jpg".
   w/h = image pixel size (prevents layout shift; optional). Leave image as null to show a neutral placeholder.
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
    image: "assets/outlawreturns.jpg", w: 1494, h: 1600, alt: "Poster for The Outlaw Returns, January 29, 2022" },
  { title: "Trinks N’ Drinks", ...JIMMYS, date: "2022-02-19", time: "3 PM – 8 PM",
    featuring: ["Outlaw Designs","Lovecraft Designs","The Eye","Sage Candles","The Plant Lab NYC","FireHouse BBQ","Johnny Burgers"],
    image: "assets/trinks.jpg", w: 1440, h: 1105, alt: "Poster for Trinks N’ Drinks, February 19, 2022" },
  { title: "Trinks N’ Drinks: Mother’s Day Edition", ...JIMMYS, date: "2022-04-23", time: "3 PM – 8 PM",
    featuring: ["Outlaw Designs","The Eye","Creative Kitty","The Plant Lab NYC","FireHouse BBQ","Johnny Burgers"],
    description: "Raffles, prizes, handmade custom jewelry, trinkets, keychains, plants, and more.",
    image: "assets/mothersday.jpg", w: 1440, h: 847, alt: "Poster for Trinks N’ Drinks: Mother’s Day Edition, April 23, 2022" },
  { title: "Trinks N’ Drinks", ...JIMMYS, date: "2022-07-17", time: "12:30 PM – midnight",
    featuring: ["Outlaw Designs","The Plant Lab NYC","The Eye","FireHouse BBQ","Crystal’s Custom Purses","Loner Craftworks","Julia’s Jewelry"],
    description: "Raffles and prizes.",
    image: "assets/trinks3.jpg", w: 1440, h: 1088, alt: "Poster for Trinks N’ Drinks, July 17, 2022" },
  { title: "BBQ", ...JIMMYS, date: "2023-08-27", time: "1 PM – 8 PM",
    image: "assets/bbq.jpg", w: 888, h: 1288, alt: "Poster for the BBQ, August 27, 2023" },
  { title: "Live Music: The Rockawades", ...JIMMYS, date: "2025-04-13", time: "3 PM – 7 PM",
    image: "assets/rockawades.jpg", w: 1122, h: 1600, alt: "Poster for Live Music: The Rockawades, April 13, 2025" },
  { title: "Trinks N’ Drinks Returns!", ...JIMMYS, date: "2026-04-25", time: "12:30 PM – midnight",
    featuring: ["Outlaw Designs","Creative Kitty","The Eye","The Plant Lab NYC","FireHouse BBQ"],
    description: "Raffles and prizes, $5 margaritas, custom jewelry, keychains, trinkets, plants, and more.",
    image: "assets/TDreturns.jpg", w: 928, h: 1152, alt: "Poster for Trinks N’ Drinks Returns!, April 25, 2026" }
];

// VENUES
const VENUES = [
  { name: "Jimmy’s Place Bar & Grill", address: "205 Sheridan Blvd, Inwood, NY 11096",
    image: "assets/jimmysplace.jpg", w: 1600, h: 936, alt: "Jimmy’s Place Bar & Grill in Inwood, NY",
    description: "A beloved, family-owned Irish pub in Inwood, Jimmy’s Place has been a neighborhood staple since September 28, 1962, when it was founded by Jimmy Boyle. Known for its welcoming atmosphere, the bar brings people together over live music, sports events, and arcade games. Jimmy’s Place also celebrates local tradition by hosting festive St. Patrick’s Day gatherings, making it a cherished spot for the community to connect and celebrate." },
  { name: "Leonardo DaVinci Lodge 2385", address: "202 Wanser Ave, Inwood, NY 11096",
    image: "assets/lodge.jpg", w: 1458, h: 876, alt: "Leonardo DaVinci Lodge 2385 in Inwood, NY",
    description: "A local gathering place rooted in Italian American heritage, Leonardo DaVinci Lodge 2385 serves as the meeting place for Inwood’s local charter of the Order Sons and Daughters of Italy in America, the nation's oldest and largest Italian American fraternal organization. With a welcoming outdoor space, the lodge provides a setting for community cookouts, parties, and get-togethers, bringing people together through shared traditions, cultural pride, and neighborhood connection." }
];

/* ---------------- rendering (no need to edit below) ---------------- */
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; };
const fmtDate = iso => new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { weekday:"long", year:"numeric", month:"long", day:"numeric", timeZone:"UTC" });
const mapUrl = addr => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(addr);

// Poster viewer (native <dialog>: Esc closes, focus is managed by the browser)
const box = document.getElementById("lightbox"), boxImg = box.querySelector("img"), boxCap = box.querySelector("p");
function openBox(src, alt, cap) { boxImg.src = src; boxImg.alt = alt; boxCap.textContent = cap; box.showModal(); }
box.addEventListener("click", e => { if (e.target === box || e.target.closest(".close")) box.close(); });

function media(it, zoom) {
  const m = el("div", "media");
  const ph = () => { m.className = "media ph"; m.replaceChildren(el("span", "", "DK")); m.setAttribute("aria-hidden", "true"); };
  if (!it.image) { ph(); return m; }
  const img = new Image();
  img.src = it.image; img.alt = it.alt || ""; img.loading = "lazy"; img.decoding = "async";
  if (it.w && it.h) { img.width = it.w; img.height = it.h; }
  img.onerror = ph;
  if (zoom) {
    const b = el("button", "zoom"); b.type = "button";
    b.setAttribute("aria-label", "View larger: " + it.title);
    b.addEventListener("click", () => openBox(it.image, it.alt, it.title + (it.date ? ", " + fmtDate(it.date) : "")));
    b.append(img); m.append(b);
  } else m.append(img);
  return m;
}

function addressLink(addr) {
  const a = el("a", "", addr);
  a.href = mapUrl(addr); a.target = "_blank"; a.rel = "noopener noreferrer";
  a.setAttribute("aria-label", addr + " (opens in Google Maps, new tab)");
  return a;
}

const fmtShort = iso => new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { weekday:"short", month:"short", day:"numeric", year:"numeric", timeZone:"UTC" });
const PIN = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>';
const CHEV = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"/></svg>';
let uid = 0;

// Compact card: image, title, date/time, venue. Everything else opens under "Details".
function eventCard(ev) {
  const card = el("article", "card event");
  card.append(media(ev, true));
  const b = el("div", "body");
  b.append(el("h3", "", ev.title));
  if (ev.date || ev.time) {
    const p = el("p", "meta when");
    if (ev.date) { const t = el("time", "", fmtShort(ev.date)); t.dateTime = ev.date; p.append(t); }
    if (ev.date && ev.time) p.append(" · ");
    if (ev.time) p.append(ev.time);
    b.append(p);
  }
  if (ev.venue) { const p = el("p", "meta place"); p.insertAdjacentHTML("beforeend", PIN); p.append(ev.venue); b.append(p); }

  const rows = [];
  if (ev.address) { const p = el("p", "meta"); p.append(addressLink(ev.address)); rows.push(p); }
  if (ev.featuring && ev.featuring.length) { const p = el("p", "meta"); p.append(el("strong", "", "Featuring: "), ev.featuring.join(", ")); rows.push(p); }
  if (ev.description) rows.push(el("p", "", ev.description));
  if (rows.length) {
    const id = "more-" + (++uid), btn = el("button", "more-btn"), label = el("span", "", "Details");
    btn.type = "button"; btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-controls", id);
    btn.setAttribute("aria-label", "Show details for " + ev.title);
    btn.append(label); btn.insertAdjacentHTML("beforeend", CHEV);
    const more = el("div", "more"), inner = el("div", "more-in"); more.id = id; inner.append(...rows); more.append(inner);
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", (open ? "Hide" : "Show") + " details for " + ev.title);
      label.textContent = open ? "Hide details" : "Details";
      more.classList.toggle("open", open);
    });
    b.append(btn, more);
  }
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
  const box2 = el("div", "empty");
  const cal = el("div", "cal", "📅"); cal.setAttribute("aria-hidden", "true");
  box2.append(cal, el("h3", "", "No Upcoming Events Just Yet"),
    el("p", "", "We don't have any upcoming events scheduled at the moment. Check back soon for updates and future opportunities to connect with our community!"));
  up.append(box2);
}

// Past (newest first)
const past = document.getElementById("past");
[...PAST_EVENTS].sort((a, b) => b.date.localeCompare(a.date)).forEach(e => past.append(eventCard(e)));

// Venues
const vs = document.getElementById("venues");
VENUES.forEach(v => {
  const c = el("article", "card");
  c.append(media(v, false));
  const b = el("div", "body");
  b.append(el("h3", "", v.name), el("p", "", v.description));
  const p = el("p", "meta"); p.append(addressLink(v.address)); b.append(p);
  c.append(b); vs.append(c);
});

// Mobile nav
const toggle = document.querySelector(".nav-toggle"), nav = document.getElementById("nav");
const setNav = open => { nav.classList.toggle("open", open); toggle.setAttribute("aria-expanded", String(open)); };
toggle.addEventListener("click", () => setNav(!nav.classList.contains("open")));
nav.addEventListener("click", e => { if (e.target.closest("a")) setNav(false); });
document.addEventListener("click", e => { if (!e.target.closest(".site-header")) setNav(false); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && nav.classList.contains("open")) { setNav(false); toggle.focus(); } });
matchMedia("(max-width: 960px)").addEventListener("change", () => setNav(false));

// Floating nav is dark glass over the hero and switches to white glass after it
const header = document.querySelector(".site-header"), heroEl = document.getElementById("top");
const onScroll = () => header.classList.toggle("on-light", scrollY > heroEl.offsetHeight - 90);
onScroll(); addEventListener("scroll", onScroll, { passive: true }); addEventListener("resize", onScroll);

// Click ripple on buttons
document.addEventListener("pointerdown", e => {
  const b = e.target.closest(".btn"); if (!b) return;
  const r = b.getBoundingClientRect(), d = Math.max(r.width, r.height), s = el("span", "ripple");
  s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
  b.append(s); setTimeout(() => s.remove(), 700);
});

// Fade panels in as they scroll into view (skipped for reduced motion)
const items = [...document.querySelectorAll(".card, .empty, .invite, .story-photo")];
if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  items.forEach((n, k) => { n.classList.add("reveal"); n.style.setProperty("--d", (k % 3) * 90 + "ms"); });
  const io = new IntersectionObserver((es, o) => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); o.unobserve(en.target); } }), { threshold: .12 });
  items.forEach(n => io.observe(n));
}

// Highlight the section being read in the nav
const links = [...document.querySelectorAll('#nav a[href^="#"]')];
if ("IntersectionObserver" in window) {
  const spy = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return;
    links.forEach(a => a.removeAttribute("aria-current"));
    const cur = links.find(a => a.getAttribute("href") === "#" + en.target.id);
    if (cur) cur.setAttribute("aria-current", "true");
  }), { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach(x => spy.observe(x));
}

document.getElementById("year").textContent = new Date().getFullYear();
