// Client theme utilities (TypeScript)
// Source for theme behavior. Keep this in sync with public/js/theme.js which is loaded at runtime.

export function preloadTheme(): void {
  try {
    const userTheme = localStorage.getItem("theme");
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme =
      userTheme === "light" || userTheme === "dark"
        ? userTheme
        : prefersDark
          ? "dark"
          : "light";
    const element = document.documentElement;
    if (theme === "dark") {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      /* ignore */
    }
  } catch (e) {
    // ignore
  }
}

function disableTransitionsTemporarily(): HTMLStyleElement {
  const css = document.createElement("style");
  css.appendChild(document.createTextNode(`*{transition:none!important}`));
  document.head.appendChild(css);
  return css;
}

export function changeTheme(): void {
  const element = document.documentElement;
  const theme = element.classList.contains("dark") ? "light" : "dark";

  const css = disableTransitionsTemporarily();

  if (theme === "dark") element.classList.add("dark");
  else element.classList.remove("dark");

  // force style flush then remove temporary rule
  void window.getComputedStyle(css).opacity;
  document.head.removeChild(css);

  try { localStorage.setItem("theme", theme); } catch (e) { /* ignore */ }
}

export function initializeThemeButtons(): void {
  const headerThemeButton = document.getElementById("header-theme-button");
  const drawerThemeButton = document.getElementById("drawer-theme-button");
  headerThemeButton?.addEventListener("click", changeTheme);
  drawerThemeButton?.addEventListener("click", changeTheme);
}

if (typeof document !== "undefined") {
  document.addEventListener("astro:after-swap", initializeThemeButtons);
  document.addEventListener("astro:after-swap", preloadTheme);
  window.addEventListener("load", () => {
    initializeThemeButtons();
    preloadTheme();
  });
  preloadTheme();
}
