(function () {
  'use strict';

  /* ---- NAV SCROLL ---- */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- ACTIVE LINK ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('#')[0];
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---- HAMBURGER ---- */
  const hamburger = document.querySelector('.nav-hamburger');
  const drawer = document.querySelector('.nav-drawer');
  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
      const spans = hamburger.querySelectorAll('span');
      if (open) {
        spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      drawer.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }));
  }

  /* ---- SCROLL REVEAL ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const ready = () => document.body.classList.add('js-reveal-ready');
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', ready) : ready();
    setTimeout(() => revealEls.forEach(el => el.classList.add('visible')), 1800);
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(el => obs.observe(el));
    } else {
      revealEls.forEach(el => el.classList.add('visible'));
    }
  }

  /* ---- EMAIL OBFUSCATION (Cloudflare-safe) ---- */
  document.querySelectorAll('[data-email]').forEach(el => {
    const parts = el.getAttribute('data-email').split('|');
    if (parts.length === 2) {
      const addr = parts[0] + '@' + parts[1];
      if (el.tagName === 'A') { el.href = 'mailto:' + addr; if (!el.textContent.trim()) el.textContent = addr; }
      else el.textContent = addr;
    }
  });

})();
