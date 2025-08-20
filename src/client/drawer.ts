// Drawer toggle handling
export function toggleDrawer(): void {
  const drawer = document.getElementById("drawer");
  const drawerButton = document.getElementById("header-drawer-button");
  drawer?.classList.toggle("open");
  drawerButton?.classList.toggle("open");
}

export function initializeDrawerButton(): void {
  const drawerButton = document.getElementById("header-drawer-button");
  if (!drawerButton) return;
  drawerButton.addEventListener("click", toggleDrawer);
}

if (typeof document !== "undefined") {
  document.addEventListener("astro:after-swap", initializeDrawerButton);
  window.addEventListener("load", initializeDrawerButton);
}
