// Intentions — Floral Design Studio
// Shared front-end behaviour: mobile nav, active link, gallery filter, contact form.

document.addEventListener('DOMContentLoaded', () => {
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
      eventType.value = 'Bouquet: ' + occasion;
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
