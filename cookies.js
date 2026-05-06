/* ── Helpers ── */
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 86400000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}
function getCookie(name) {
  const m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return m ? m.pop() : null;
}
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
function hideBanner() {
  const b = document.getElementById('cookie-banner');
  b.style.transform = 'translateY(100%)';
  b.style.transition = 'transform 0.4s ease';
  setTimeout(() => b.style.display = 'none', 400);
  document.getElementById('revoke-btn').classList.add('visible');
}

/* ── Actions ── */
function acceptAll() {
  setCookie('cookie_consent', 'all', 395); // Consentement global
  setCookie('cookie_analytics', 'true', 395);
  setCookie('cookie_marketing', 'true', 395);
  setCookie('cookie_functional', 'true', 395);
  setCookie('cookie_essential', 'true', 395);
  setCookie('cookie_security', 'true', 395);
  setCookie('cookie_preferences', 'true', 395);
  hideBanner();
  closeSettings();
  showToast('✓ Tous les cookies ont été acceptés');
  loadNonEssentialScripts({ analytics: true, marketing: true, functional: true });
}

function refuseAll() {
  setCookie('cookie_consent', 'essential', 395);
  setCookie('cookie_analytics', 'false', 395);
  setCookie('cookie_marketing', 'false', 395);
  setCookie('cookie_functional', 'false', 395);
  setCookie('cookie_security', 'false', 395);
  setCookie('cookie_preferences', 'false', 395);
  hideBanner();
  closeSettings();
  showToast('✕ Seuls les cookies essentiels sont actifs');
}

function saveSettings() {
  const analytics  = document.getElementById('pref-analytics').checked;
  const marketing  = document.getElementById('pref-marketing').checked;
  const functional = document.getElementById('pref-functional').checked;
  setCookie('cookie_consent', 'custom', 395);
  setCookie('cookie_analytics',  analytics  ? 'true' : 'false', 395);
  setCookie('cookie_marketing',  marketing  ? 'true' : 'false', 395);
  setCookie('cookie_functional', functional ? 'true' : 'false', 395);
  hideBanner();
  closeSettings();
  showToast('✓ Vos préférences ont été enregistrées');
  loadNonEssentialScripts({ analytics, marketing, functional });
}

function revokeConsent() {
  ['cookie_consent','cookie_analytics','cookie_marketing','cookie_functional'].forEach(c => {
    document.cookie = `${c}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
  });
  document.getElementById('revoke-btn').classList.remove('visible');
  const b = document.getElementById('cookie-banner');
  b.style.display = '';
  b.style.transform = 'translateY(0)';
  b.style.transition = '';
  showToast('↩ Vos préférences ont été réinitialisées');
}

/* ── Modals ── */
function openSettings() {
  document.getElementById('cookie-modal').classList.add('open');
  document.getElementById('pref-analytics').checked  = getCookie('cookie_analytics')  === 'true';
  document.getElementById('pref-marketing').checked  = getCookie('cookie_marketing')  === 'true';
  document.getElementById('pref-functional').checked = getCookie('cookie_functional') === 'true';
}
function closeSettings() { document.getElementById('cookie-modal').classList.remove('open'); }
function openPolitique() { document.getElementById('politique-modal').classList.add('open'); }
function closePolitique() { document.getElementById('politique-modal').classList.remove('open'); }

// Close modals on backdrop click
document.getElementById('cookie-modal').addEventListener('click', e => {
  if (e.target === document.getElementById('cookie-modal')) closeSettings();
});
document.getElementById('politique-modal').addEventListener('click', e => {
  if (e.target === document.getElementById('politique-modal')) closePolitique();
});

/* ── Script loader (blocage avant consentement) ── */
function loadNonEssentialScripts({ analytics, marketing, functional }) {
  if (analytics) {
    console.log('[Cookies] Analytics activés');
  }
  if (marketing) console.log('[Cookies] Marketing activés');
  if (functional) console.log('[Cookies] Fonctionnels activés');
}

/* ── Init : vérifier consentement existant ── */
window.addEventListener('DOMContentLoaded', () => {
  const consent = getCookie('cookie_consent');
  if (consent) {
    document.getElementById('cookie-banner').style.display = 'none';
    document.getElementById('revoke-btn').classList.add('visible');
    loadNonEssentialScripts({
      analytics:  getCookie('cookie_analytics')  === 'true',
      marketing:  getCookie('cookie_marketing')  === 'true',
      functional: getCookie('cookie_functional') === 'true',
    });
  }
});