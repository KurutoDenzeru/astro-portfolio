// Drawer toggle handling (JavaScript)
(function(){
  function toggleDrawer(){
    var drawer = document.getElementById('drawer');
    var drawerButton = document.getElementById('header-drawer-button');
    drawer && drawer.classList.toggle('open');
    drawerButton && drawerButton.classList.toggle('open');
  }
  function initializeDrawerButton(){
    var drawerButton = document.getElementById('header-drawer-button');
    if (!drawerButton) return;
    drawerButton.addEventListener('click', toggleDrawer);
  }
  if (typeof document !== 'undefined'){
    document.addEventListener('astro:after-swap', initializeDrawerButton);
    window.addEventListener('load', initializeDrawerButton);
  }
  // Expose for legacy inline callers in components that expect a global
  try {
    window.initializeDrawerButton = initializeDrawerButton;
    window.toggleDrawer = toggleDrawer;
  } catch (e) {
    /* ignore in non-browser environments */
  }
})();
