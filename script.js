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

  /* ---- Analytics: custom GA4 events ---- */
  const track = (name, params) => {
    if (typeof gtag === 'function') gtag('event', name, params || {});
  };

  document.querySelectorAll('.contact-primary .btn').forEach(link => {
    link.addEventListener('click', () => track('contact_click', { method: 'email' }));
  });

  document.querySelectorAll('.project-card a').forEach(link => {
    link.addEventListener('click', () => {
      const card = link.closest('.project-card');
      const title = card ? card.querySelector('.project-title') : null;
      track('project_click', {
        project_name: title ? title.textContent.trim() : 'unknown',
        link_url: link.href,
      });
    });
  });

  if ('IntersectionObserver' in window) {
    const footerEl = document.querySelector('.footer');
    if (footerEl) {
      let footerSeen = false;
      const footerObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !footerSeen) {
            footerSeen = true;
            track('scroll_to_bottom');
            footerObserver.disconnect();
          }
        });
      }, { threshold: .1 });
      footerObserver.observe(footerEl);
    }
  }

  /* ---- Professional profile: all | tech | management ---- */
  const PROFILES = ['all', 'tech', 'management'];
  const profileParam = english ? 'profile' : 'profil';
  const profileNames = english
    ? { all: 'All', tech: 'Tech', management: 'Management' }
    : { all: 'Tout', tech: 'Tech', management: 'Management' };
  const switches = [...document.querySelectorAll('.profile-switch')];
  const timeline = document.querySelector('.timeline');
  const items = [...document.querySelectorAll('.timeline-item[data-profiles]')];
  const status = document.getElementById('profileStatus');
  const langLinks = [...document.querySelectorAll('.lang-switch, .mobile-menu a[href$=".html"]')];

  const matches = (el, profile) => profile === 'all' || el.dataset.profiles.split(/\s+/).includes(profile);
  // A position is a role block (GUCE holds several) or an entry with a single role.
  const positions = items.flatMap(item => {
    const roles = [...item.querySelectorAll('.timeline-role-block[data-profiles]')];
    return roles.length ? roles : [item];
  });

  function statusText(profile) {
    const total = positions.length;
    const shown = positions.filter(position => matches(position, profile)).length;
    if (profile === 'all') return english ? `${total} positions` : `${total} postes`;
    return english
      ? `${profileNames[profile]} profile: ${shown} of ${total} positions`
      : `Profil ${profileNames[profile]} : ${shown} postes sur ${total}`;
  }

  function syncUrl(profile) {
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('profil');
      url.searchParams.delete('profile');
      if (profile !== 'all') url.searchParams.set(profileParam, profile);
      history.replaceState(null, '', url);
      // Carry the choice to the other language version.
      langLinks.forEach(link => {
        const target = new URL(link.getAttribute('href').split('?')[0], window.location.href);
        if (profile !== 'all') target.searchParams.set(english ? 'profil' : 'profile', profile);
        link.setAttribute('href', target.pathname.split('/').pop() + target.search);
      });
    } catch { /* URL APIs unavailable: filtering still works. */ }
  }

  function applyProfile(profile, fromUser) {
    if (!PROFILES.includes(profile)) profile = 'all';
    root.dataset.profile = profile;
    switches.forEach(group => group.querySelectorAll('button').forEach(button => {
      const checked = button.dataset.profileValue === profile;
      button.setAttribute('aria-checked', String(checked));
      button.tabIndex = checked ? 0 : -1;
    }));
    if (status) status.textContent = statusText(profile);
    syncUrl(profile);
    if (!fromUser) return;
    try { localStorage.setItem('profile', profile); } catch { /* Choice still works for this visit. */ }
    if (timeline && !reducedMotion.matches) {
      timeline.classList.remove('is-refreshing');
      void timeline.offsetWidth; // restart the arrival animation
      timeline.classList.add('is-refreshing');
    }
    track('profile_switch', { profile });
  }

  switches.forEach(group => {
    const buttons = [...group.querySelectorAll('button')];
    buttons.forEach(button => button.addEventListener('click', () => {
      if (button.getAttribute('aria-checked') !== 'true') applyProfile(button.dataset.profileValue, true);
    }));
    group.addEventListener('keydown', event => {
      const index = buttons.indexOf(document.activeElement);
      if (index < 0) return;
      const moves = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      let next;
      if (event.key in moves) next = (index + moves[event.key] + buttons.length) % buttons.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = buttons.length - 1;
      else return;
      event.preventDefault();
      buttons[next].focus();
      applyProfile(buttons[next].dataset.profileValue, true);
    });
  });

  // Inline shortcuts such as "See the Tech profile" under Projects.
  document.querySelectorAll('[data-profile-set]').forEach(button => button.addEventListener('click', () => {
    applyProfile(button.dataset.profileSet, true);
  }));

  if (switches.length) applyProfile(root.dataset.profile, false);
})();
