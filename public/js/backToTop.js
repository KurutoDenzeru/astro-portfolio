// Back to top helper
(function(){
  function goBackToTop(event){ event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  function inintializeBackToTop(){
    var backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;
    backToTop.addEventListener('click', goBackToTop);
  }
  if (typeof document !== 'undefined'){
    document.addEventListener('astro:after-swap', inintializeBackToTop);
    window.addEventListener('load', inintializeBackToTop);
  }
  try {
    window.inintializeBackToTop = inintializeBackToTop;
    window.goBackToTop = goBackToTop;
  } catch (e) {
    /* ignore in non-browser environments */
  }
})();
