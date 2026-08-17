(() => {
  const mobileBreakpoint = window.matchMedia("(max-width: 980px)");

  document.querySelectorAll(".site-header").forEach((header) => {
    const toggle = header.querySelector(".nav-toggle");
    const navigation = header.querySelector("nav");

    if (!toggle || !navigation) return;

    const closeMenu = () => {
      header.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation menu");
      document.documentElement.classList.remove("nav-is-open");
    };

    const openMenu = () => {
      header.classList.add("nav-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close navigation menu");
      document.documentElement.classList.add("nav-is-open");
    };

    toggle.addEventListener("click", () => {
      if (header.classList.contains("nav-open")) closeMenu();
      else openMenu();
    });

    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (header.classList.contains("nav-open") && !header.contains(event.target)) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && header.classList.contains("nav-open")) {
        closeMenu();
        toggle.focus();
      }
    });

    mobileBreakpoint.addEventListener("change", (event) => {
      if (!event.matches) closeMenu();
    });
  });
})();
