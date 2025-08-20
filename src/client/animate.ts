// Simple animate on reveal utilities (TypeScript)
export function animate(): void {
  const animateElements = document.querySelectorAll<HTMLElement>(".animate");

  animateElements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add("show");
    }, index * 150);
  });
}

export function initializeAnimate(): void {
  animate();
  document.addEventListener("astro:after-swap", animate);
}

if (typeof window !== "undefined") {
  window.addEventListener("load", initializeAnimate);
}
