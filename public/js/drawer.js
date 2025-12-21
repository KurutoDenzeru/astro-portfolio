// Drawer toggle handling (JavaScript)
(function(){
  function toggleDrawer(){
    var drawer = document.getElementById('drawer');
    var drawerButton = document.getElementById('header-drawer-button');
    drawer && drawer.classList.toggle('open');
    drawerButton && drawerButton.classList.toggle('open');
  }
  
  function closeDrawer(){
    var drawer = document.getElementById('drawer');
    var drawerButton = document.getElementById('header-drawer-button');
    drawer && drawer.classList.remove('open');
    drawerButton && drawerButton.classList.remove('open');
  }
  
  function initializeDrawerButton(){
    var drawerButton = document.getElementById('header-drawer-button');
    if (!drawerButton) return;
    drawerButton.addEventListener('click', toggleDrawer);
    
    // Close drawer when any navigation link is clicked
    var navLinks = document.querySelectorAll('.md\\:hidden a[href]');
    navLinks.forEach(function(link) {
      link.addEventListener('click', closeDrawer);
    });
  }
  
  if (typeof document !== 'undefined'){
    document.addEventListener('astro:after-swap', initializeDrawerButton);
    window.addEventListener('load', initializeDrawerButton);
  }
  // Expose for legacy inline callers in components that expect a global
  try {
    window.initializeDrawerButton = initializeDrawerButton;
    window.toggleDrawer = toggleDrawer;
    window.closeDrawer = closeDrawer;
  } catch (e) {
    /* ignore in non-browser environments */
  }
})();
