# Intentions — Floral Design Studio Website

A static, multi-page marketing website for Intentions, an independent boutique floral design studio. No build step required — plain HTML, CSS, and JavaScript.

## Structure

```
floral-design-studio/
├── index.html              Home page — hero, service categories, selected work, philosophy
├── weddings-events.html    Personal flowers, ceremony, reception, and event categories, process, FAQ
├── bouquets.html            Seasonal bouquet tiers, delivery info, upcoming offerings
├── portfolio.html           Editorial "Selected Work" gallery with category filtering
├── about.html                Studio story and design philosophy
├── inquire.html              Detailed inquiry form (weddings/events/bouquets) and studio info
├── css/style.css             All styling (CSS variables for easy re-theming)
├── js/main.js                 Mobile nav, active-link highlighting, gallery filter, form handling
└── images/                    Drop real photography here
```

## Site structure & positioning

The site is intentionally built for a new, small studio rather than one with years of history:

- Navigation: **Home | Weddings & Events | Bouquets | Portfolio | About | Inquire**
- No fabricated client counts, testimonials, or "years in business" claims
- Weddings & Events lists what's offered (personal flowers, ceremony, reception, other events) even before every category has portfolio photos
- Bouquets starts with 3 simple, seasonal "designer's choice" tiers rather than a large product catalog
- Portfolio is framed as "Selected Work" / studio floral studies — a small set of real, well-photographed pieces (each shown from multiple angles) reads as more credible than many empty categories
- About leans on the founder's story, curiosity, and design philosophy rather than experience claims
- Inquire collects the details a florist actually needs for a wedding/event quote (date, venue, guest count, budget range, palette, services needed, inspiration link, referral source)

## Running locally

No build tools needed. Open `index.html` directly in a browser, or serve the folder with any static server, e.g.:

```bash
npx serve .
```

## Customizing

- **Brand name / colors / fonts**: edit the CSS variables at the top of `css/style.css` (`--color-*`, `--font-*`).
- **Copy**: edit the HTML files directly — content is plain markup, no templating.
- **Photos**: replace the `.img-placeholder` blocks with real `<img>` tags pointing to files in `images/`. For the portfolio page, aim for a small number of genuinely strong pieces shot from multiple angles (full arrangement, detail, styled) rather than many thin categories.
- **Inquiry form**: the form in `inquire.html` is front-end only (it just shows a success message). To receive real submissions, point the `<form>` at a service like [Formspree](https://formspree.io) or enable [Netlify Forms](https://docs.netlify.com/forms/setup/) by adding a `netlify` attribute, or wire up your own backend endpoint.

## Deploying

Any static host works — Netlify, Vercel, GitHub Pages, or Cloudflare Pages. Drag-and-drop the folder or connect the git repo; no build command is needed.
