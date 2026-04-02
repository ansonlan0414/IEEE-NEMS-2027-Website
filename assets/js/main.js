/* ============================================
   IEEE NEMS 2027 - 主要 JavaScript
   處理導覽列互動、手風琴、共用元件載入
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAccordions();
  highlightCurrentPage();
});

/* --- 導覽列：漢堡選單 & 手機版下拉 --- */
function initNavigation() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('open');
  });

  // 手機版：點擊有子選單的項目展開/收合
  const hasSubmenu = menu.querySelectorAll('li:has(.submenu)');
  hasSubmenu.forEach(item => {
    const link = item.querySelector(':scope > a');
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        item.classList.toggle('submenu-open');
      }
    });
  });

  // 點擊外部關閉選單
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-bar')) {
      toggle.classList.remove('active');
      menu.classList.remove('open');
    }
  });
}

/* --- 手風琴展開/收合（講者頁面用） --- */
function initAccordions() {
  document.querySelectorAll('.accordion-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      if (content && content.classList.contains('accordion-content')) {
        content.classList.toggle('open');
        const icon = btn.querySelector('.acc-icon');
        if (icon) {
          icon.textContent = content.classList.contains('open') ? '−' : '+';
        }
      }
    });
  });
}

/* --- 根據目前頁面 URL 高亮對應選單項 --- */
function highlightCurrentPage() {
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href.replace(/^\.\.\//, '').replace(/^\.\//, ''))) {
      link.closest('li').classList.add('active');
      // 如果在子選單中，也高亮父選單
      const parentLi = link.closest('.submenu')?.closest('li');
      if (parentLi) parentLi.classList.add('active');
    }
  });
}
