// Lightweight scroll handling to toggle header/drawer scrolled class
export function onScroll(): void {
  const header = document.getElementById("header");
  if (!header) return;
  if (window.scrollY > 0) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
}

export function initializeScroll(): void {
  onScroll();
  document.addEventListener("scroll", onScroll);
  document.addEventListener("astro:after-swap", onScroll);
}

if (typeof window !== "undefined") {
  window.addEventListener("load", initializeScroll);
}
