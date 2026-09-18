# Intentions — Floral Design Studio Website

A static, multi-page marketing website for Intentions, an independent boutique floral design studio. No build step required — plain HTML, CSS, and JavaScript.

## Structure

```
floral-design-studio/
├── index.html                Home page — editorial hero, service categories, selected work, philosophy
├── shop.html                 Shop hub — links to the four Shop sub-pages
├── bouquets.html              Hand-tied bouquet tiers
├── vase-arrangements.html     Ready-to-display vase arrangement tiers
├── designers-choice.html      Budget-tier "let the designer choose" arrangements
├── subscriptions.html         Recurring florals — lobby flowers and home decor
├── weddings.html              Full-service wedding floral categories, process, FAQ
├── events.html                Event types (engagement parties, showers, corporate, etc.), process, FAQ
├── portfolio.html             Editorial "Selected Work" masonry gallery
├── about.html                 Studio story and design philosophy
├── contact.html                Detailed inquiry form and studio info
├── css/style.css               All styling (CSS variables for easy re-theming)
├── js/main.js                   Mobile nav, active-link highlighting, gallery filter, form handling
└── images/                      Real photography lives here; images/originals/ holds raw uploads (gitignored)
```

## Navigation

**Home | Shop ▾ (Bouquets, Vase Arrangements, Designer's Choice, Subscriptions) | Weddings | Events | Portfolio | About | Contact**

The Shop item is a hover dropdown on desktop; on mobile it expands inline (no extra tap needed) via CSS only — see `.has-dropdown` / `.dropdown-menu` in `css/style.css`.

## Design system

Minimal-gallery layout with a warm neutral palette: ivory/sand backgrounds, terracotta accent, olive and ink neutrals. Headings use Cormorant Garamond (light weights), body uses Jost. All colors live in the `:root` variables at the top of `css/style.css`.

The Shop page includes a "Shop by Occasion" collection grid (`.collection-grid` / `.collection-tile`): photo tiles with a centered label. Each tile links to `contact.html?occasion=<name>`, and `js/main.js` prefills the Event Type field with it. To add an occasion, copy a tile in `shop.html` and change the image, label, and `occasion` query value.

## Site structure & positioning

The site is intentionally built for a new, small, design-led studio rather than one leaning on years of history or a "seasonal local flower shop" feel:

- No fabricated client counts, testimonials, or "years in business" claims
- Weddings and Events are separate pages so each can speak directly to its own audience; Weddings leads with a full-bleed portfolio photo (`.photo-hero`)
- Shop splits offerings into four distinct products (Bouquets, Vase Arrangements, Designer's Choice, Subscriptions) rather than one crowded page
- Portfolio is framed as "Selected Work" — a small set of real, well-photographed pieces (each shown from multiple angles, and deliberately interleaved by background/setting) reads as more credible than many empty categories
- About leans on the founder's story, curiosity, and design philosophy rather than experience claims
- Contact collects the details a florist actually needs for a wedding/event quote (date, venue, event type, message)

## Running locally

No build tools needed. Open `index.html` directly in a browser, or serve the folder with any static server, e.g.:

```bash
npx serve .
```

## Customizing

- **Brand name / colors / fonts**: edit the CSS variables at the top of `css/style.css` (`--color-*`, `--font-*`).
- **Copy**: edit the HTML files directly — content is plain markup, no templating.
- **Photos**: replace the `.img-placeholder` blocks with real `<img>` tags pointing to files in `images/`. For the portfolio page, aim for a small number of genuinely strong pieces shot from multiple angles (full arrangement, detail, styled) rather than many thin categories, and keep the gallery order blended by background/setting rather than grouped by piece.
- **Contact form**: the form in `contact.html` is front-end only (it just shows a success message). To receive real submissions, point the `<form>` at a service like [Formspree](https://formspree.io) or enable [Netlify Forms](https://docs.netlify.com/forms/setup/) by adding a `netlify` attribute, or wire up your own backend endpoint.

## Deploying

Any static host works — Netlify, Vercel, GitHub Pages, or Cloudflare Pages. Drag-and-drop the folder or connect the git repo; no build command is needed.
