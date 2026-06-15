// Background particle/star generation (JavaScript)
(() => {
  const PARTICLE_COUNTS = {
    small: 1000,
    medium: 500,
    large: 250,
  };

  const generateParticles = (n) => {
    const parts = [];
    for (let i = 0; i < n; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      parts.push(`${x}vw ${y}vh #000`);
    }
    return parts.join(",");
  };
  const generateStars = (n) => {
    const parts = [];
    for (let i = 0; i < n; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      parts.push(`${x}vw ${y}vh #fff`);
    }
    return parts.join(",");
  };
  const initBG = () => {
    const particlesSmall = generateParticles(PARTICLE_COUNTS.small);
    const particlesMedium = generateParticles(PARTICLE_COUNTS.medium);
    const particlesLarge = generateParticles(PARTICLE_COUNTS.large);
    const particles1 = document.getElementById("particles1");
    const particles2 = document.getElementById("particles2");
    const particles3 = document.getElementById("particles3");
    if (particles1) {
      particles1.style.cssText = `width:1px;height:1px;border-radius:50%;box-shadow:${particlesSmall};animation:animStar 50s linear infinite;`;
    }
    if (particles2) {
      particles2.style.cssText = `width:1.5px;height:1.5px;border-radius:50%;box-shadow:${particlesMedium};animation:animateParticle 100s linear infinite;`;
    }
    if (particles3) {
      particles3.style.cssText = `width:2px;height:2px;border-radius:50%;box-shadow:${particlesLarge};`;
    }
    const starsSmall = generateStars(PARTICLE_COUNTS.small);
    const starsMedium = generateStars(PARTICLE_COUNTS.medium);
    const starsLarge = generateStars(PARTICLE_COUNTS.large);
    const stars1 = document.getElementById("stars1");
    const stars2 = document.getElementById("stars2");
    const stars3 = document.getElementById("stars3");
    if (stars1)
      stars1.style.cssText = `width:1px;height:1px;border-radius:50%;box-shadow:${starsSmall};animation:animStar 80s linear infinite;`;
    if (stars2)
      stars2.style.cssText = `width:1.5px;height:1.5px;border-radius:50%;box-shadow:${starsMedium};animation:animateParticle 140s linear infinite;`;
    if (stars3)
      stars3.style.cssText = `width:2px;height:2px;border-radius:50%;box-shadow:${starsLarge};`;
  };
  if (typeof document !== "undefined") {
    document.addEventListener("astro:after-swap", initBG);
    if (document.readyState === "complete" || document.readyState === "interactive") {
      initBG();
    } else {
      document.addEventListener("DOMContentLoaded", initBG, { once: true });
      window.addEventListener("load", initBG, { once: true });
    }
  }
})();
