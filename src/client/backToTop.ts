export function goBackToTop(event: Event): void {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function inintializeBackToTop(): void {
  const backToTop = document.getElementById("back-to-top");
  if (!backToTop) return;
  backToTop.addEventListener("click", goBackToTop as EventListener);
}

if (typeof document !== "undefined") {
  document.addEventListener("astro:after-swap", inintializeBackToTop);
  window.addEventListener("load", inintializeBackToTop);
}
