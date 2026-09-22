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

document.addEventListener('DOMContentLoaded', () => {
  /* Order buttons -> Square store */
  document.querySelectorAll('[data-order]').forEach((btn) => {
    const url = ORDER_LINKS[btn.dataset.order] || SQUARE_STORE_URL;
    if (url) {
      btn.href = url;
      btn.target = '_blank';
      btn.rel = 'noopener';
    }
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

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      if (formSuccess) {
        formSuccess.classList.add('visible');
      }
      contactForm.reset();
    });
  }
});
