// Background particle/star generation ported to TypeScript
// Keep this file focused and efficient; only run on client.

function generateParticles(n: number) {
  const parts: string[] = [];
  for (let i = 0; i < n; i++) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    parts.push(`${x}vw ${y}vh #000`);
  }
  return parts.join(",");
}

function generateStars(n: number) {
  const parts: string[] = [];
  for (let i = 0; i < n; i++) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    parts.push(`${x}vw ${y}vh #fff`);
  }
  return parts.join(",");
}

export function initBG(): void {
  const particlesSmall = generateParticles(1000);
  const particlesMedium = generateParticles(500);
  const particlesLarge = generateParticles(250);
  const particles1 = document.getElementById("particles1");
  const particles2 = document.getElementById("particles2");
  const particles3 = document.getElementById("particles3");

  if (particles1) {
    (particles1 as HTMLElement).style.cssText = `width:1px;height:1px;border-radius:50%;box-shadow:${particlesSmall};animation:animStar 50s linear infinite;`;
  }

  if (particles2) {
    (particles2 as HTMLElement).style.cssText = `width:1.5px;height:1.5px;border-radius:50%;box-shadow:${particlesMedium};animation:animateParticle 100s linear infinite;`;
  }

  if (particles3) {
    (particles3 as HTMLElement).style.cssText = `width:2px;height:2px;border-radius:50%;box-shadow:${particlesLarge};`;
  }

  const starsSmall = generateStars(1000);
  const starsMedium = generateStars(500);
  const starsLarge = generateStars(250);
  const stars1 = document.getElementById("stars1");
  const stars2 = document.getElementById("stars2");
  const stars3 = document.getElementById("stars3");

  if (stars1) (stars1 as HTMLElement).style.cssText = `width:1px;height:1px;border-radius:50%;box-shadow:${starsSmall};`;
  if (stars2) (stars2 as HTMLElement).style.cssText = `width:1.5px;height:1.5px;border-radius:50%;box-shadow:${starsMedium};`;
  if (stars3) (stars3 as HTMLElement).style.cssText = `width:2px;height:2px;border-radius:50%;box-shadow:${starsLarge};`;
}

if (typeof document !== "undefined") {
  document.addEventListener("astro:after-swap", initBG);
  window.addEventListener("load", initBG);
}
