// Resolve before painting; a saved choice takes precedence over the OS.
(() => {
  let saved;
  try { saved = localStorage.getItem('theme'); } catch { /* Storage may be unavailable. */ }
  document.documentElement.dataset.theme = saved === 'dark' || saved === 'light'
    ? saved : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
})();
