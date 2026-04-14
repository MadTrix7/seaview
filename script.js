/* =========================================================
   SEAVIEW TRAVAUX – Script
   - Header scroll effect
   - Menu burger mobile
   - Reveal animations on scroll
   - Année du copyright
   ========================================================= */

(function () {
  'use strict';

  // Marque le document comme JS-ready (active les animations reveal en CSS)
  document.documentElement.classList.add('js-ready');

  /* ---- Header : ombre au scroll ---- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Menu burger ---- */
  const burger = document.getElementById('burger');
  const navList = document.getElementById('navList');

  const closeMenu = () => {
    navList.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
  };
  const openMenu = () => {
    navList.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Fermer le menu');
  };

  burger.addEventListener('click', () => {
    if (navList.classList.contains('open')) closeMenu();
    else openMenu();
  });

  // Ferme le menu après un clic sur un lien (mobile)
  navList.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 720) closeMenu();
    });
  });

  // Ferme si on repasse en desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 720) closeMenu();
  });

  /* ---- Reveal au scroll ---- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  /* ---- Année du copyright ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
