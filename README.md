# Bloom & Co. — Floral Design Studio Website

A static, multi-page marketing website for a boutique floral design studio. No build step required — plain HTML, CSS, and JavaScript.

## Structure

```
floral-design-studio/
├── index.html          Home page
├── about.html          Studio story, values, team
├── services.html       Services, pricing, process, FAQ
├── gallery.html        Portfolio grid with category filtering
├── contact.html        Contact form and studio info
├── css/style.css        All styling (CSS variables for easy re-theming)
├── js/main.js           Mobile nav, active-link highlighting, gallery filter, form handling
└── images/              Drop real photography here
```

## Running locally

No build tools needed. Open `index.html` directly in a browser, or serve the folder with any static server, e.g.:

```bash
npx serve .
```

## Customizing

- **Brand name / colors / fonts**: edit the CSS variables at the top of `css/style.css` (`--color-*`, `--font-*`).
- **Copy**: edit the HTML files directly — content is plain markup, no templating.
- **Photos**: replace the `.img-placeholder` blocks with real `<img>` tags pointing to files in `images/`.
- **Contact form**: the form in `contact.html` is front-end only (it just shows a success message). To receive real submissions, point the `<form>` at a service like [Formspree](https://formspree.io) or enable [Netlify Forms](https://docs.netlify.com/forms/setup/) by adding a `netlify` attribute, or wire up your own backend endpoint.

## Deploying

Any static host works — Netlify, Vercel, GitHub Pages, or Cloudflare Pages. Drag-and-drop the folder or connect the git repo; no build command is needed.
