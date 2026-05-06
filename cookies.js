(function(){
  // Inject HTML
  document.body.insertAdjacentHTML('beforeend', `
<div id="cookie-banner" role="dialog" aria-label="Gestion des cookies">
  <div class="ck-inner">
    <div>
      <div class="ck-header">
        <div class="ck-icon">🍪</div>
        <strong class="ck-title">Ce site utilise des cookies</strong>
      </div>
      <p class="ck-text">Nous utilisons des cookies pour assurer le bon fonctionnement du site et améliorer votre expérience. Les cookies non essentiels ne sont déposés qu'avec votre consentement, conformément aux exigences de l'ARTCI.</p>
      <div class="ck-links">
        <a onclick="ckOpenPolitique()">Politique de cookies</a>
        <a onclick="ckOpenPolitique()">Politique de confidentialité</a>
      </div>
    </div>
    <div class="ck-btns">
      <button class="ck-btn ck-btn-accept" onclick="ckAcceptAll()">✓ Accepter les cookies</button>
      <button class="ck-btn ck-btn-refuse" onclick="ckRefuseAll()">✕ Refuser</button>
      <button class="ck-btn ck-btn-settings" onclick="ckOpenSettings()">⚙ Paramétrer</button>
    </div>
  </div>
</div>

<div id="cookie-modal" role="dialog" aria-label="Paramètres des cookies">
  <div class="ck-modal-box">
    <div class="ck-modal-header">
      <span class="ck-modal-title">Paramètres des cookies</span>
      <button class="ck-modal-close" onclick="ckCloseSettings()">✕</button>
    </div>
    <p class="ck-modal-desc">Personnalisez vos préférences. Les cookies essentiels sont obligatoires. Votre choix est mémorisé 13 mois.</p>
    <div class="ck-category">
      <div class="ck-category-row">
        <span class="ck-category-name">Cookies essentiels</span>
        <div style="display:flex;align-items:center;gap:8px">
          <span class="ck-badge">Obligatoires</span>
          <label class="ck-toggle"><input type="checkbox" checked disabled><span class="ck-toggle-slider"></span></label>
        </div>
      </div>
      <p class="ck-category-desc">Nécessaires au fonctionnement du site. Toujours actifs.</p>
    </div>
    <div class="ck-category">
      <div class="ck-category-row">
        <span class="ck-category-name">Cookies analytiques</span>
        <label class="ck-toggle"><input type="checkbox" id="ck-analytics"><span class="ck-toggle-slider"></span></label>
      </div>
      <p class="ck-category-desc">Mesure d'audience anonymisée pour améliorer nos services.</p>
    </div>
    <div class="ck-category">
      <div class="ck-category-row">
        <span class="ck-category-name">Cookies marketing</span>
        <label class="ck-toggle"><input type="checkbox" id="ck-marketing"><span class="ck-toggle-slider"></span></label>
      </div>
      <p class="ck-category-desc">Contenus personnalisés et mesure de l'efficacité de nos communications.</p>
    </div>
    <div class="ck-category">
      <div class="ck-category-row">
        <span class="ck-category-name">Cookies fonctionnels</span>
        <label class="ck-toggle"><input type="checkbox" id="ck-functional"><span class="ck-toggle-slider"></span></label>
      </div>
      <p class="ck-category-desc">Mémorisation de vos préférences (langue, région, thème).</p>
    </div>
    <div class="ck-modal-footer">
      <button class="ck-btn ck-btn-refuse" onclick="ckRefuseAll()">Tout refuser</button>
      <button class="ck-btn ck-btn-accept" onclick="ckSaveSettings()">Enregistrer mes choix</button>
    </div>
  </div>
</div>

<div id="politique-modal" role="dialog" aria-label="Politique de cookies">
  <div class="ck-pol-box">
    <h2>Politique de cookies</h2>
    <span class="ck-pol-date">Dernière mise à jour : mai 2026</span>
    <h3>1. Qu'est-ce qu'un cookie ?</h3>
    <p>Un cookie est un petit fichier texte déposé sur votre terminal lors de votre navigation. Il permet de mémoriser vos actions et préférences.</p>
    <h3>2. Pourquoi utilisons-nous des cookies ?</h3>
    <ul>
      <li>Assurer le bon fonctionnement technique du site</li>
      <li>Mesurer l'audience et analyser la navigation</li>
      <li>Mémoriser vos préférences</li>
      <li>Proposer des contenus adaptés</li>
    </ul>
    <h3>3. Types de cookies utilisés</h3>
    <ul>
      <li><strong>Essentiels</strong> – toujours actifs, indispensables</li>
      <li><strong>Analytiques</strong> – mesure d'audience anonymisée</li>
      <li><strong>Marketing</strong> – personnalisation publicitaire</li>
      <li><strong>Fonctionnels</strong> – mémorisation de vos préférences</li>
    </ul>
    <h3>4. Durée de conservation</h3>
    <p>Votre consentement est conservé maximum 13 mois.</p>
    <h3>5. Vos droits (ARTCI)</h3>
    <ul>
      <li>Retirer votre consentement via le bouton « Gérer mes cookies »</li>
      <li>Accéder, rectifier ou supprimer vos données : <strong>privacy@votresite.ci</strong></li>
    </ul>
    <button class="ck-pol-close" onclick="ckClosePolitique()">Fermer</button>
  </div>
</div>

<div id="ck-toast"></div>
<button id="ck-revoke" onclick="ckRevoke()">🍪 Gérer mes cookies</button>
  `);

  // Functions
  window.ckSetCookie = function(n,v,d){const e=new Date();e.setTime(e.getTime()+d*86400000);document.cookie=n+'='+v+';expires='+e.toUTCString()+';path=/;SameSite=Lax'};
  window.ckGetCookie = function(n){const m=document.cookie.match('(^|;)\\s*'+n+'\\s*=\\s*([^;]+)');return m?m.pop():null};
  window.ckToast = function(msg){const t=document.getElementById('ck-toast');t.textContent=msg;t.classList.add('ck-show');setTimeout(()=>t.classList.remove('ck-show'),3000)};
  window.ckHideBanner = function(){const b=document.getElementById('cookie-banner');b.style.transition='transform .4s ease';b.style.transform='translateY(100%)';setTimeout(()=>b.style.display='none',400);document.getElementById('ck-revoke').classList.add('ck-visible')};
  window.ckAcceptAll = function(){ckSetCookie('ck_consent','all',395);ckSetCookie('ck_analytics','true',395);ckSetCookie('ck_marketing','true',395);ckSetCookie('ck_functional','true',395);ckHideBanner();ckCloseSettings();ckToast('✓ Tous les cookies ont été acceptés')};
  window.ckRefuseAll = function(){ckSetCookie('ck_consent','essential',395);ckSetCookie('ck_analytics','false',395);ckSetCookie('ck_marketing','false',395);ckSetCookie('ck_functional','false',395);ckHideBanner();ckCloseSettings();ckToast('✕ Seuls les cookies essentiels sont actifs')};
  window.ckSaveSettings = function(){ckSetCookie('ck_consent','custom',395);ckSetCookie('ck_analytics',document.getElementById('ck-analytics').checked?'true':'false',395);ckSetCookie('ck_marketing',document.getElementById('ck-marketing').checked?'true':'false',395);ckSetCookie('ck_functional',document.getElementById('ck-functional').checked?'true':'false',395);ckHideBanner();ckCloseSettings();ckToast('✓ Vos préférences ont été enregistrées')};
  window.ckRevoke = function(){['ck_consent','ck_analytics','ck_marketing','ck_functional'].forEach(c=>{document.cookie=c+'=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/'});document.getElementById('ck-revoke').classList.remove('ck-visible');const b=document.getElementById('cookie-banner');b.style.display='';b.style.transform='translateY(0)';ckToast('↩ Vos préférences ont été réinitialisées')};
  window.ckOpenSettings = function(){document.getElementById('cookie-modal').classList.add('ck-open');document.getElementById('ck-analytics').checked=ckGetCookie('ck_analytics')==='true';document.getElementById('ck-marketing').checked=ckGetCookie('ck_marketing')==='true';document.getElementById('ck-functional').checked=ckGetCookie('ck_functional')==='true'};
  window.ckCloseSettings = function(){document.getElementById('cookie-modal').classList.remove('ck-open')};
  window.ckOpenPolitique = function(){document.getElementById('politique-modal').classList.add('ck-open')};
  window.ckClosePolitique = function(){document.getElementById('politique-modal').classList.remove('ck-open')};

  document.getElementById('cookie-modal').addEventListener('click',function(e){if(e.target===this)ckCloseSettings()});
  document.getElementById('politique-modal').addEventListener('click',function(e){if(e.target===this)ckClosePolitique()});

  // Init
  if(ckGetCookie('ck_consent')){
    document.getElementById('cookie-banner').style.display='none';
    document.getElementById('ck-revoke').classList.add('ck-visible');
  }
})();
