(function () {
  function initMenu() {
    var burger = document.querySelector('.n-wrap');
    var menu = document.querySelector('.menu');
    if (!burger || !menu) return;

    // Strip Webflow data-w-id from the trigger chain so IX2 doesn't intercept
    ['.n-wrap', '.n-trigger', '.n-line'].forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        el.removeAttribute('data-w-id');
      });
    });

    var isOpen = false;

    function openMenu() {
      isOpen = true;
      menu.classList.add('menu-open');
      burger.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      isOpen = false;
      menu.classList.remove('menu-open');
      burger.classList.remove('menu-open');
      document.body.style.overflow = '';
    }

    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      isOpen ? closeMenu() : openMenu();
    });

    // Close when clicking any link inside the menu
    menu.querySelectorAll('a, .m-link, .nav-link, .project-link').forEach(function (el) {
      el.addEventListener('click', closeMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenu);
  } else {
    initMenu();
  }
})();
