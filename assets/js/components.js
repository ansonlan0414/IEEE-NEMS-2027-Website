/* ============================================
   IEEE NEMS 2027 - 共用元件（Header / Footer）
   透過 JS 動態載入，避免每頁重複維護
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 判斷是否在子頁面（pages/ 目錄下）
  const isSubpage = window.location.pathname.includes('/pages/');
  const prefix = isSubpage ? '../' : '';
  const pagePrefix = isSubpage ? '' : 'pages/';

  injectHeader(prefix, pagePrefix);
  injectFooter();
  initLanguageSystem();
});

/* --- 產生 Header HTML --- */
function injectHeader(prefix, pagePrefix) {
  const headerEl = document.getElementById('site-header');
  if (!headerEl) return;

  headerEl.innerHTML = `
    <div class="header-title-bar">
      <h1><a href="${prefix}index.html">IEEE-NEMS 2027</a></h1>
      <button class="lang-toggle" id="langToggle" title="Switch Language">
        <span class="lang-icon">🌐</span>
        <span id="langLabel">EN</span>
      </button>
    </div>
    <nav class="nav-bar">
      <div class="container">
        <button class="nav-toggle" aria-label="Toggle navigation">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav-menu">
          <li><a href="${prefix}index.html" data-i18n="nav.home">Home</a></li>
          <li>
            <a href="#" data-i18n="nav.general">General Information</a>
            <ul class="submenu">
              <li><a href="${pagePrefix}welcome.html" data-i18n="nav.welcome">Welcome Message</a></li>
              <li><a href="${pagePrefix}committees.html" data-i18n="nav.committees">Committees</a></li>
              <li><a href="${pagePrefix}scope.html" data-i18n="nav.scope">Conference Scope</a></li>
            </ul>
          </li>
          <li>
            <a href="#" data-i18n="nav.program">Program</a>
            <ul class="submenu">
              <li><a href="${pagePrefix}program.html" data-i18n="nav.program-glance">Program at a Glance</a></li>
              <li><a href="${pagePrefix}plenary-speakers.html" data-i18n="nav.plenary">Plenary Speakers</a></li>
              <li><a href="${pagePrefix}keynote-speakers.html" data-i18n="nav.keynote">Keynote Speakers</a></li>
              <li><a href="${pagePrefix}invited-sessions.html" data-i18n="nav.invited">Invited Sessions</a></li>
            </ul>
          </li>
          <li>
            <a href="#" data-i18n="nav.authors">For Authors</a>
            <ul class="submenu">
              <li><a href="${pagePrefix}call-for-papers.html" data-i18n="nav.cfp">Call for Papers</a></li>
              <li><a href="${pagePrefix}submission.html" data-i18n="nav.submission">Abstract Submission</a></li>
              <li><a href="${pagePrefix}presentation.html" data-i18n="nav.presentation">Presentation Guidelines</a></li>
            </ul>
          </li>
          <li><a href="${pagePrefix}awards.html" data-i18n="nav.awards">Conference Awards</a></li>
          <li><a href="${pagePrefix}registration.html" data-i18n="nav.registration">Registration</a></li>
          <li>
            <a href="#" data-i18n="nav.sponsorship">Sponsorship &amp; Exhibition</a>
            <ul class="submenu">
              <li><a href="${pagePrefix}sponsorship.html" data-i18n="nav.sponsor-outline">Sponsorship Outline</a></li>
              <li><a href="${pagePrefix}sponsors-list.html" data-i18n="nav.sponsor-list">Sponsors &amp; Exhibitors</a></li>
            </ul>
          </li>
          <li>
            <a href="#" data-i18n="nav.attendee">Attendee Info</a>
            <ul class="submenu">
              <li><a href="${pagePrefix}venue.html" data-i18n="nav.venue">Venue</a></li>
              <li><a href="${pagePrefix}accommodation.html" data-i18n="nav.accommodation">Accommodation</a></li>
            </ul>
          </li>
          <li><a href="${pagePrefix}contact.html" data-i18n="nav.contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  `;
}

/* --- 產生 Footer HTML --- */
function injectFooter() {
  const footerEl = document.getElementById('site-footer');
  if (!footerEl) return;

  footerEl.innerHTML = `
    <div class="footer-orgs">
      <div class="container">
        <span class="org-label" data-i18n="footer.organized">Organized by</span>
        <span style="font-weight:600;">IEEE</span>
        <span>|</span>
        <span style="font-weight:600;">IEEE Nanotechnology Council</span>
        <span>|</span>
        <span style="font-weight:600;">National Tsing Hua University</span>
      </div>
    </div>
    <div class="footer-copyright">
      <span data-i18n="footer.copyright">Copyright © 2027 IEEE-NEMS 2027. All rights reserved.</span>
    </div>
  `;
}

/* --- 語言切換系統 --- */
function initLanguageSystem() {
  // 讀取使用者偏好語言（預設英文）
  const savedLang = localStorage.getItem('nems2027-lang') || 'en';
  setLanguage(savedLang);

  // 綁定切換按鈕
  const toggleBtn = document.getElementById('langToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = localStorage.getItem('nems2027-lang') || 'en';
      const next = current === 'en' ? 'zh' : 'en';
      setLanguage(next);
    });
  }
}

/* --- 設定語言並更新所有翻譯 --- */
function setLanguage(lang) {
  localStorage.setItem('nems2027-lang', lang);

  // 更新按鈕標籤
  const label = document.getElementById('langLabel');
  if (label) {
    label.textContent = lang === 'en' ? 'EN' : '中';
  }

  // 更新所有帶 data-i18n 屬性的元素
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
      // 如果翻譯內容包含 HTML 標籤，用 innerHTML；否則用 textContent
      const text = TRANSLATIONS[key][lang];
      if (text.includes('<')) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    }
  });

  // 更新 html lang 屬性
  document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
}
