(function(){
  function basename(path){
    const p = (path || '').split('/').pop() || '';
    return p.split('?')[0].split('#')[0];
  }

  function findHeaderCandidate(){
    const selectors = [
      '.lookbook__head__title h2',
      '.hero-h1__wrap',
      '.h-h1.hero-home',
      '.hero-h1',
      'h1.h-h1',
      '.hero-row',
      '.campaign .lookbook__head__title',
      '.h-h2.gradient',
      'main .content h1',
      'main .content h2',
      '#dataset h1',
      '#dataset h2',
    ];
    for (const s of selectors) {
      const el = document.querySelector(s);
      if (el) return el;
    }

    // fallback: first heading inside main
    const main = document.querySelector('main') || document.querySelector('.content');
    if (main) {
      const h = main.querySelector('h1, h2, h3');
      if (h) return h;
    }
    return null;
  }

  document.addEventListener('DOMContentLoaded', function(){
    const file = basename(window.location.pathname || '') || basename(window.location.href || '');
    if (!file) return;
    const m = file.match(/^(Project[A-Za-z0-9_ -]+)\.html$/);
    let base;
    if (m) {
      base = m[1];
    } else {
      // fallback: try to find any anchor linking to a Project*3d.html on the page
      const a = Array.from(document.querySelectorAll('a[href]')).find(x => /Project.*3d\.html$/i.test(x.getAttribute('href')));
      if (a) {
        const href = a.getAttribute('href').split('/').pop().split('?')[0].split('#')[0];
        const mm = href.match(/^(Project[A-Za-z0-9_ -]+)3d\.html$/i);
        if (mm) base = mm[1];
      }
    }
    if (!base) return;
    const target = base + '3d.html';

    const debug = /[?&]debug=1/i.test(window.location.search || window.location.href);

    const el = findHeaderCandidate();
    if (!el) return;

    // Ensure it's obvious it's clickable and accessible
    el.style.cursor = 'pointer';
    el.setAttribute('role', 'link');
    if (!el.hasAttribute('tabindex')) el.tabIndex = 0;

    function go(){ window.location.href = target; }
    el.addEventListener('click', go, {passive:true});
    el.addEventListener('touchend', function(e){ e.preventDefault(); go(); }, {passive:false});
    el.addEventListener('keydown', function(e){ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });

    // small visual affordance: underline on hover / small chevron
    try {
      el.classList.add('project-header-link');
      const styleId = 'project-header-link-style';
      if (!document.getElementById(styleId)) {
        const s = document.createElement('style');
        s.id = styleId;
        s.innerHTML = `
          .project-header-link{position:relative}
          .project-header-link::after{content:'\u203A';position:absolute;right:-1.6rem;top:50%;transform:translateY(-50%);font-size:1.1rem;opacity:0.7}
          .project-header-link:hover{text-decoration:underline}
        `;
        document.head.appendChild(s);
      }
    } catch (e) {}

    if (debug) {
      try {
        console.info('[project-header-link] matched element:', el);
        console.info('[project-header-link] navigating to:', target);
        el.style.outline = '3px dashed rgba(255,0,0,0.6)';
        el.style.transition = 'outline 0.2s ease-in-out';
      } catch (e) {}
    }
  });
})();
