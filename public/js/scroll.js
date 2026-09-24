// Lightweight scroll handling for the header state.
(() => {
  let initialized = false;
  let frameId = 0;

  const updateHeader = () => {
    frameId = 0;
    const header = document.getElementById("header");
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 0);
  };

  const onScroll = () => {
    if (frameId) return;
    frameId = window.requestAnimationFrame(updateHeader);
  };

  const initializeScroll = () => {
    updateHeader();
    if (initialized) return;
    initialized = true;
    document.addEventListener("scroll", onScroll, { passive: true });
  };

  document.addEventListener("astro:after-swap", initializeScroll);
  window.addEventListener("load", initializeScroll, { once: true });
})();
