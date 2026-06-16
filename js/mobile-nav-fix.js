(function(){
  function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/.test(navigator.userAgent) || (navigator.maxTouchPoints && navigator.maxTouchPoints>1);
  }

  if (!isMobile()) return;

  // Convert links that open in new tabs to open in the same tab on mobile
  document.addEventListener('click', function(e){
    const a = e.target.closest && e.target.closest('a');
    if (!a) return;
    if (a.target === '_blank') {
      e.preventDefault();
      window.location.href = a.href;
    }
  }, true);

  // Override window.open to use same-tab navigation on mobile
  (function(){
    const origOpen = window.open.bind(window);
    window.open = function(url, target, features){
      if (!url) return null;
      try {
        if (target === '_blank') {
          window.location.href = url;
          return null;
        }
      } catch (e) {}
      return origOpen(url, target, features);
    };
  })();

  // Floating back button (added on mobile except for project pages and pages ending with "3d.html")
  const btn = document.createElement('button');
  btn.id = 'mobile-back-btn';
  btn.innerText = 'Back';
  Object.assign(btn.style, {
    position: 'fixed',
    left: '12px',
    top: '12px',
    zIndex: 99999,
    padding: '8px 10px',
    fontSize: '14px',
    background: 'rgba(0,0,0,0.6)',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    backdropFilter: 'blur(4px)'
  });
  btn.addEventListener('click', function(){
    if (window.history.length > 1) return window.history.back();
    if (document.referrer) return window.location.href = document.referrer;
    window.location.href = 'index.html';
  });
  document.addEventListener('DOMContentLoaded', function(){
    try {
      const filename = window.location.pathname.split('/').pop() || '';
      if (/^Project.*\.html$/i.test(filename) || /3d\.html$/i.test(filename)) {
        // Skip adding back button on project pages and 3D scene pages
        return;
      }
    } catch (e) {}
    document.body.appendChild(btn);
  });
})();
