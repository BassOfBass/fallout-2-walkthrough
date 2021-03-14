(() => {
  const body = document.body;
  const { localStorage } = window;
  const button = document.querySelector("#themeButton");
  
  let theme = localStorage.getItem("theme");

  button.addEventListener("click", toggleTheme);

  theme && initTheme(theme);

  /**
   * @param {string} theme 
   */
  function initTheme(theme) {
    // if the theme neither dark or light
    // probably a corrupted value
    if (theme !== "dark" && theme !== "light") {
      // remove the entry
      localStorage.removeItem("theme");
    }

    if (theme === "dark") {
      body.classList.add("dark");
      button.textContent = "use light theme";
    }
  }

  function toggleTheme() {
    if (body.classList.contains("dark")) {
      body.classList.remove("dark");
      localStorage.setItem("theme", "light");
      button.textContent = "use dark theme";
    } else {
      body.classList.add("dark");
      localStorage.setItem("theme", "dark");
      button.textContent = "use light theme";
    }
  }
})();
