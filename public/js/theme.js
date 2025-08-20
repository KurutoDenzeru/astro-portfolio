// Client theme utilities (JavaScript) — compiled from src/client/theme.ts
// Keep this file in sync with src/client/theme.ts
(function(){
  function preloadTheme() {
    try {
      var userTheme = localStorage.getItem("theme");
      var prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      var theme = userTheme === "light" || userTheme === "dark" ? userTheme : (prefersDark ? "dark" : "light");
      var element = document.documentElement;
      if (theme === "dark") {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
      try { localStorage.setItem("theme", theme); } catch (e) { }
    } catch (e) { }
  }

  function disableTransitionsTemporarily() {
    var css = document.createElement("style");
    css.appendChild(document.createTextNode("*{transition:none!important}"));
    document.head.appendChild(css);
    return css;
  }

  function changeTheme() {
    var element = document.documentElement;
    var theme = element.classList.contains("dark") ? "light" : "dark";
    var css = disableTransitionsTemporarily();
    if (theme === "dark") element.classList.add("dark"); else element.classList.remove("dark");
    void window.getComputedStyle(css).opacity;
    document.head.removeChild(css);
    try { localStorage.setItem("theme", theme); } catch (e) { }
  }

  function initializeThemeButtons() {
    var headerThemeButton = document.getElementById("header-theme-button");
    var drawerThemeButton = document.getElementById("drawer-theme-button");
    headerThemeButton && headerThemeButton.addEventListener("click", changeTheme);
    drawerThemeButton && drawerThemeButton.addEventListener("click", changeTheme);
  }

  if (typeof document !== "undefined") {
    document.addEventListener("astro:after-swap", initializeThemeButtons);
    document.addEventListener("astro:after-swap", preloadTheme);
    window.addEventListener("load", function(){ initializeThemeButtons(); preloadTheme(); });
    preloadTheme();
  }
})();
