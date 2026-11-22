// Resolve before painting; a saved choice takes precedence over the OS.
(() => {
  let saved;
  try { saved = localStorage.getItem('theme'); } catch { /* Storage may be unavailable. */ }
  document.documentElement.dataset.theme = saved === 'dark' || saved === 'light'
    ? saved : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
})();

// Professional profile (all | tech | management), resolved before painting so
// filtered experiences never flash. A shared link (?profil= / ?profile=) wins
// over the visitor's saved choice. Without JS the attribute is never set and
// every experience stays visible.
(() => {
  const aliases = { all: 'all', tout: 'all', tech: 'tech', management: 'management', gestion: 'management' };
  let profile;
  try {
    const params = new URLSearchParams(window.location.search);
    profile = aliases[(params.get('profil') || params.get('profile') || '').toLowerCase()];
  } catch { /* Ignore malformed URLs. */ }
  if (!profile) {
    try { profile = aliases[localStorage.getItem('profile')]; } catch { /* Storage may be unavailable. */ }
  }
  document.documentElement.dataset.profile = profile || 'all';
})();
