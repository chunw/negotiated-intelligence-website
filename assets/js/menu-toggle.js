(function () {
  var burger, menu, lines, open;

  function init() {
    burger = document.querySelector('.n-wrap');
    menu   = document.querySelector('.menu');
    lines  = document.querySelectorAll('.n-line');
    open   = false;

    if (!burger || !menu) return;

    // Large, reliable tap target
    burger.style.cssText += ';padding:16px;margin:-16px;cursor:pointer;-webkit-tap-highlight-color:transparent;';

    // Capture phase — runs before Webflow or any other handler
    burger.addEventListener('click', toggle, true);
    burger.addEventListener('touchend', function (e) {
      e.preventDefault();
      toggle(e);
    }, { capture: true, passive: false });

    // Close when any link inside the menu is tapped/clicked
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a, .m-link, .nav-link, .project-link')) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && open) closeMenu();
    });
  }

  function toggle(e) {
    e && e.stopPropagation();
    open ? closeMenu() : openMenu();
  }

  function openMenu() {
    open = true;
    menu.style.display  = 'block';
    menu.style.zIndex   = '15';
    document.body.style.overflow = 'hidden';
    animateBurger(true);
  }

  function closeMenu() {
    open = false;
    menu.style.display  = 'none';
    document.body.style.overflow = '';
    animateBurger(false);
  }

  function animateBurger(isOpen) {
    lines.forEach(function (line) {
      line.style.transition = 'transform 0.25s ease';
    });
    var top = lines[0], bot = lines[1];
    if (!top || !bot) return;
    if (isOpen) {
      top.style.transform = 'translateY(6px) rotate(45deg)';
      bot.style.transform = 'translateY(-6px) rotate(-45deg)';
      bot.style.left = '0';
    } else {
      top.style.transform = '';
      bot.style.transform = '';
      bot.style.left = '';
    }
  }

  // Wait for full page load so all elements exist
  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init);
  }
})();
