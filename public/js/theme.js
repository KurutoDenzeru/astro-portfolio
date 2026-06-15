// Client theme utilities (JavaScript) — compiled from src/client/theme.ts
// Keep this file in sync with src/client/theme.ts
(() => {
  const preloadTheme = () => {
    try {
      const userTheme = localStorage.getItem("theme");
      const prefersDark =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      const theme =
        userTheme === "light" || userTheme === "dark" ? userTheme : prefersDark ? "dark" : "light";
      const element = document.documentElement;
      if (theme === "dark") {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
      try {
        localStorage.setItem("theme", theme);
      } catch (_e) {}
    } catch (_e) {}
  };

  const disableTransitionsTemporarily = () => {
    const css = document.createElement("style");
    css.appendChild(document.createTextNode("*{transition:none!important}"));
    document.head.appendChild(css);
    return css;
  };

  const changeTheme = () => {
    const element = document.documentElement;
    const theme = element.classList.contains("dark") ? "light" : "dark";
    const css = disableTransitionsTemporarily();
    if (theme === "dark") element.classList.add("dark");
    else element.classList.remove("dark");
    void window.getComputedStyle(css).opacity;
    document.head.removeChild(css);
    try {
      localStorage.setItem("theme", theme);
    } catch (_e) {}
  };

  const initializeThemeButtons = () => {
    const headerThemeButton = document.getElementById("header-theme-button");
    const drawerThemeButton = document.getElementById("drawer-theme-button");
    headerThemeButton?.addEventListener("click", changeTheme);
    drawerThemeButton?.addEventListener("click", changeTheme);
  };

  if (typeof document !== "undefined") {
    document.addEventListener("astro:after-swap", initializeThemeButtons);
    document.addEventListener("astro:after-swap", preloadTheme);
    window.addEventListener("load", () => {
      initializeThemeButtons();
      preloadTheme();
    });
    preloadTheme();
  }
})();
