(() => {
  const root = document.documentElement;
  const english = root.lang.toLowerCase().startsWith('en');
  const toggle = document.getElementById('themeToggle');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let explicitTheme = false;
  try { explicitTheme = ['light', 'dark'].includes(localStorage.getItem('theme')); } catch { /* Use OS preference. */ }
  function applyTheme(theme) {
    root.dataset.theme = theme;
    toggle.setAttribute('aria-pressed', String(theme === 'dark'));
    toggle.setAttribute('aria-label', english
      ? (theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode')
      : (theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'));
  }
  applyTheme(root.dataset.theme || 'light');
  toggle.addEventListener('click', () => {
    const theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    explicitTheme = true;
    applyTheme(theme);
    try { localStorage.setItem('theme', theme); } catch { /* Choice still works for this visit. */ }
  });
  systemTheme.addEventListener('change', event => {
    if (!explicitTheme) applyTheme(event.matches ? 'dark' : 'light');
  });
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  function closeMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
  }
  hamburger.addEventListener('click', () => {
    const open = !menu.classList.contains('open');
    menu.classList.toggle('open', open);
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    closeMenu();
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
    }
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('open')) { closeMenu(); hamburger.focus(); }
  });
  document.addEventListener('click', event => {
    if (!hamburger.contains(event.target) && !menu.contains(event.target)) closeMenu();
  });
  document.addEventListener('focusin', event => {
    if (!hamburger.contains(event.target) && !menu.contains(event.target)) closeMenu();
  });
  window.matchMedia('(min-width: 781px)').addEventListener('change', event => {
    if (event.matches) {
      if (menu.contains(document.activeElement)) toggle.focus();
      closeMenu();
    }
  });
  const sections = [...document.querySelectorAll('section[id]')];
  const links = [...document.querySelectorAll('.nav-links a')];
  let pending = false;
  function updateActiveLink() {
    const current = sections.filter(section => section.getBoundingClientRect().top <= 150).pop();
    links.forEach(link => {
      const active = current && link.hash === '#' + current.id;
      link.classList.toggle('active', Boolean(active));
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    pending = false;
  }
  window.addEventListener('scroll', () => {
    if (!pending) { pending = true; requestAnimationFrame(updateActiveLink); }
  }, { passive: true });
  updateActiveLink();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (!reducedMotion.matches) entry.target.classList.add('is-entering');
        observer.unobserve(entry.target);
      });
    }, { threshold: .08 });
    document.querySelectorAll('.timeline-item').forEach(item => observer.observe(item));
  }
})();
