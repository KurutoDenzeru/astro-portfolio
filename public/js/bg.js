// Background particle and star generation.
(() => {
  const DESKTOP_COUNTS = {
    small: 420,
    medium: 220,
    large: 110,
  };
  const MOBILE_COUNTS = {
    small: 180,
    medium: 90,
    large: 45,
  };

  let initialized = false;
  let scheduled = false;

  const getParticleCounts = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return { small: 60, medium: 30, large: 15 };
    }

    return window.matchMedia("(max-width: 767px)").matches ? MOBILE_COUNTS : DESKTOP_COUNTS;
  };

  const generatePoints = (count, color) => {
    const points = [];
    for (let index = 0; index < count; index += 1) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      points.push(`${x}vw ${y}vh ${color}`);
    }
    return points.join(",");
  };

  const applyBackground = (element, points, size, animation = "") => {
    if (!element) return;
    element.style.cssText = `width:${size};height:${size};border-radius:50%;box-shadow:${points};${animation ? `animation:${animation};` : ""}`;
  };

  const initBackground = () => {
    scheduled = false;
    if (initialized) return;

    const particles = [
      document.getElementById("particles1"),
      document.getElementById("particles2"),
      document.getElementById("particles3"),
    ];
    const stars = [
      document.getElementById("stars1"),
      document.getElementById("stars2"),
      document.getElementById("stars3"),
    ];

    if (![...particles, ...stars].some(Boolean)) return;

    initialized = true;
    const counts = getParticleCounts();
    const sizes = ["1px", "1.5px", "2px"];
    const particleAnimations = [
      "animStar 50s linear infinite",
      "animateParticle 100s linear infinite",
      "",
    ];
    const starAnimations = [
      "animStar 80s linear infinite",
      "animateParticle 140s linear infinite",
      "",
    ];

    particles.forEach((element, index) => {
      applyBackground(
        element,
        generatePoints(counts[Object.keys(counts)[index]], "#000"),
        sizes[index],
        particleAnimations[index],
      );
    });

    stars.forEach((element, index) => {
      applyBackground(
        element,
        generatePoints(counts[Object.keys(counts)[index]], "#fff"),
        sizes[index],
        starAnimations[index],
      );
    });
  };

  const scheduleBackground = () => {
    if (initialized || scheduled) return;
    scheduled = true;

    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(initBackground, { timeout: 1200 });
    } else {
      window.setTimeout(initBackground, 0);
    }
  };

  document.addEventListener("astro:after-swap", () => {
    initialized = false;
    scheduleBackground();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleBackground, { once: true });
  } else {
    scheduleBackground();
  }
})();
