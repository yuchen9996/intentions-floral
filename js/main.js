// Intentions — Floral Design Studio
// Shared front-end behaviour: mobile nav, active link, gallery filter, contact form.

// Square store links for the "Order" buttons. Set SQUARE_STORE_URL to your store address
// (e.g. 'https://shop.intentionsfloral.com'), and optionally give an item its own link
// in ORDER_LINKS. Any button left without a link falls back to the Contact page.
const SQUARE_STORE_URL = '';
const ORDER_LINKS = {
  'petite-bouquet': '',
  'signature-bouquet': '',
  'grand-bouquet': '',
  'petite-vase': '',
  'signature-vase': 'https://square.link/u/GZQKEHPI',
  'grand-vase': '',
  'designers-choice-75': '',
  'designers-choice-150': '',
  'designers-choice-250': ''
};

// Google Form for wedding inquiries, embedded on the Weddings page. Paste the form's public
// link (ending in /viewform) between the quotes.
const WEDDING_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe_d4JpGQuniAO8mTbsODlUPUH_HN207IwcfGbC4SslO44qDw/viewform';

// Google Form for event inquiries, embedded on the Events page. Paste the form's public
// link (ending in /viewform) between the quotes; until then a link to the Contact page shows.
const EVENT_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScr5nX4I34Q_8t4xG7BP9bRqlj49IFYPpdeRJ00lAuUsvYTaQ/viewform';

// Contact page form delivery. Create a free form at formspree.io pointed at
// hello@intentionsfloral.com and paste its endpoint (https://formspree.io/f/xxxxxxxx) here.
const CONTACT_FORM_ENDPOINT = 'https://formspree.io/f/xeaeojrp';

document.addEventListener('DOMContentLoaded', () => {
  /* Embedded Google Forms (events and weddings) */
  const embedForm = (el, url, title) => {
    if (!el || !url) return;
    const frame = document.createElement('iframe');
    frame.src = url + (url.includes('?') ? '&' : '?') + 'embedded=true';
    frame.title = title;
    frame.loading = 'lazy';
    frame.setAttribute('frameborder', '0');
    el.replaceChildren(frame);
  };
  embedForm(document.querySelector('[data-event-form]'), EVENT_FORM_URL, 'Event inquiry form');
  embedForm(document.querySelector('[data-wedding-form-embed]'), WEDDING_FORM_URL, 'Wedding inquiry form');

  /* Order buttons -> Square store */
  document.querySelectorAll('[data-order]').forEach((btn) => {
    const url = ORDER_LINKS[btn.dataset.order] || SQUARE_STORE_URL;
    if (url) {
      btn.href = url;
      btn.target = '_blank';
      btn.rel = 'noopener';
    }
  });

  /* Floating "Text us" button */
  const textUs = document.createElement('a');
  textUs.className = 'text-us';
  textUs.href = 'sms:+19172000466';
  textUs.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.6-.8L3 21l1.9-5.1A8.4 8.4 0 1 1 21 11.5z"/><path d="M8.5 10.5h7M8.5 13.5h4"/></svg><span>Text us</span>';
  textUs.setAttribute('aria-label', 'Text us at (917) 200-0466');
  document.body.appendChild(textUs);

  /* Photo carousel arrows */
  document.querySelectorAll('.event-feature').forEach((section) => {
    const track = section.querySelector('.carousel-track');
    section.querySelectorAll('[data-carousel]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const dir = btn.dataset.carousel === 'next' ? 1 : -1;
        track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: 'smooth' });
      });
    });
  });

  /* Mobile nav toggle */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const expanded = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-expanded', String(expanded));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* Highlight current page in nav */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  /* Footer year */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* Gallery filter (gallery.html only) */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-grid [data-category]');

  if (filterButtons.length && galleryItems.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        galleryItems.forEach((item) => {
          const show = filter === 'all' || item.dataset.category === filter;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* Contact form (front-end only — wire to Formspree/Netlify Forms for real delivery) */
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.querySelector('.form-success');

  if (contactForm) {
    const occasion = new URLSearchParams(window.location.search).get('occasion');
    const eventType = document.getElementById('event-type');
    if (occasion && eventType) {
      eventType.value = 'Order: ' + occasion;
    }

    const formError = document.querySelector('.form-error');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    const showError = (message) => {
      if (formSuccess) formSuccess.classList.remove('visible');
      if (formError) {
        formError.textContent = message;
        formError.classList.add('visible');
      }
    };

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      if (formError) formError.classList.remove('visible');

      if (!CONTACT_FORM_ENDPOINT) {
        showError('Our online form is not connected yet. Please email hello@intentionsfloral.com or text (917) 200-0466.');
        return;
      }

      submitBtn.disabled = true;
      try {
        const response = await fetch(CONTACT_FORM_ENDPOINT, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(contactForm)
        });
        if (!response.ok) throw new Error('Request failed');
        if (formSuccess) formSuccess.classList.add('visible');
        contactForm.reset();
      } catch (err) {
        showError('Sorry, something went wrong. Please email hello@intentionsfloral.com or text (917) 200-0466.');
      } finally {
        submitBtn.disabled = false;
      }
    });
  }
});
