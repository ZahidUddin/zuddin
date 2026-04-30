(function () {
  "use strict";

  const zuThemeStorageKey = "zu-theme-preference";
  const zuRoot = document.documentElement;
  const zuBody = document.body;
  const zuThemeToggleButtons = document.querySelectorAll("[data-zu-theme-toggle]");
  const zuNav = document.querySelector(".zu-nav");
  const zuNavToggle = document.querySelector(".zu-nav-toggle");
  const zuNavMenu = document.querySelector(".zu-nav-menu");
  const zuNavLinks = document.querySelectorAll(".zu-nav-link");
  const zuSections = document.querySelectorAll("main section[id]");
  const zuRevealElements = document.querySelectorAll(".zu-reveal");
  const zuProjectToggleButton = document.getElementById("zu-project-toggle");
  const zuExtraProjectCards = document.querySelectorAll(".zu-project-card-extra");
  const zuReducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let zuScrollRafId = null;

  function zuGetStoredTheme() {
    return window.localStorage.getItem(zuThemeStorageKey);
  }

  function zuGetSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function zuSetTheme(zuThemeValue) {
    zuBody.setAttribute("data-zu-theme", zuThemeValue);
    zuRoot.style.colorScheme = zuThemeValue;

    const zuThemeLabel =
      zuThemeValue === "dark" ? "Switch to light theme" : "Switch to dark theme";
    const zuThemeText = zuThemeValue === "dark" ? "Light" : "Dark";

    zuThemeToggleButtons.forEach((zuButton) => {
      zuButton.setAttribute("aria-label", zuThemeLabel);
      const zuTextElement = zuButton.querySelector(".zu-theme-toggle-text");
      if (zuTextElement) {
        zuTextElement.textContent = zuThemeText;
      }
    });
  }

  function zuInitTheme() {
    const zuStoredTheme = zuGetStoredTheme();
    const zuInitialTheme = zuStoredTheme || zuGetSystemTheme();
    zuSetTheme(zuInitialTheme);

    zuThemeToggleButtons.forEach((zuButton) => {
      zuButton.addEventListener("click", () => {
        const zuCurrentTheme = zuBody.getAttribute("data-zu-theme");
        const zuNextTheme = zuCurrentTheme === "dark" ? "light" : "dark";
        zuSetTheme(zuNextTheme);
        window.localStorage.setItem(zuThemeStorageKey, zuNextTheme);
      });
    });
  }

  function zuCloseMobileNav() {
    if (!zuNav || !zuNavToggle || !zuNavMenu) {
      return;
    }
    zuNav.classList.remove("zu-nav-open");
    zuNavToggle.setAttribute("aria-expanded", "false");
  }

  function zuInitNav() {
    if (!zuNav || !zuNavToggle || !zuNavMenu) {
      return;
    }

    zuNavToggle.addEventListener("click", () => {
      const zuOpenState = zuNav.classList.toggle("zu-nav-open");
      zuNavToggle.setAttribute("aria-expanded", String(zuOpenState));
    });

    zuNavLinks.forEach((zuLink) => {
      zuLink.addEventListener("click", () => {
        zuCloseMobileNav();
      });
    });

    window.addEventListener("keydown", (zuEvent) => {
      if (zuEvent.key === "Escape") {
        zuCloseMobileNav();
      }
    });
  }

  function zuUpdateActiveNav(zuSectionId) {
    zuNavLinks.forEach((zuLink) => {
      const zuLinkTarget = zuLink.getAttribute("href") || "";
      const zuIsActive = zuLinkTarget === `#${zuSectionId}`;
      zuLink.classList.toggle("zu-nav-link-active", zuIsActive);
      if (zuIsActive) {
        zuLink.setAttribute("aria-current", "page");
      } else {
        zuLink.removeAttribute("aria-current");
      }
    });
  }

  function zuInitActiveSections() {
    if (!zuSections.length) {
      return;
    }

    window.addEventListener("scroll", zuHandleScroll, { passive: true });
    window.addEventListener("resize", zuHandleScroll);
    zuHandleScroll();
  }

  function zuHandleScroll() {
    if (zuScrollRafId !== null) {
      return;
    }

    zuScrollRafId = window.requestAnimationFrame(() => {
      const zuViewportHeight = window.innerHeight;
      const zuScrollY = window.scrollY;
      const zuDocHeight = document.documentElement.scrollHeight;
      const zuOffset = zuScrollY + zuViewportHeight * 0.36;
      let zuVisibleSectionId = zuSections[0] ? zuSections[0].id : "";

      zuSections.forEach((zuSection) => {
        if (zuOffset >= zuSection.offsetTop) {
          zuVisibleSectionId = zuSection.id;
        }
      });

      if (zuScrollY + zuViewportHeight >= zuDocHeight - 2) {
        const zuLastSection = zuSections[zuSections.length - 1];
        if (zuLastSection) {
          zuVisibleSectionId = zuLastSection.id;
        }
      }

      if (zuVisibleSectionId) {
        zuUpdateActiveNav(zuVisibleSectionId);
      }
      zuScrollRafId = null;
    });
  }

  function zuRevealVisibleItems() {
    zuRevealElements.forEach((zuElement) => {
      zuElement.classList.add("zu-reveal-visible");
    });
  }

  function zuInitRevealAnimations() {
    if (!zuRevealElements.length) {
      return;
    }

    if (zuReducedMotionQuery.matches || !("IntersectionObserver" in window)) {
      zuRevealVisibleItems();
      return;
    }

    const zuRevealObserver = new IntersectionObserver(
      (zuEntries, zuObserver) => {
        zuEntries.forEach((zuEntry) => {
          if (zuEntry.isIntersecting) {
            zuEntry.target.classList.add("zu-reveal-visible");
            zuObserver.unobserve(zuEntry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    zuRevealElements.forEach((zuElement) => {
      zuRevealObserver.observe(zuElement);
    });
  }

  function zuSetProjectExpansion(zuExpanded) {
    zuExtraProjectCards.forEach((zuCard) => {
      zuCard.hidden = !zuExpanded;
    });

    if (!zuProjectToggleButton) {
      return;
    }

    zuProjectToggleButton.setAttribute("aria-expanded", String(zuExpanded));
    zuProjectToggleButton.textContent = zuExpanded
      ? "Show Less Projects"
      : "Show More Projects";
  }

  function zuInitProjectToggle() {
    if (!zuProjectToggleButton || !zuExtraProjectCards.length) {
      return;
    }

    zuSetProjectExpansion(false);

    zuProjectToggleButton.addEventListener("click", () => {
      const zuIsExpanded = zuProjectToggleButton.getAttribute("aria-expanded") === "true";
      zuSetProjectExpansion(!zuIsExpanded);
    });
  }

  function zuInit() {
    zuInitTheme();
    zuInitNav();
    zuInitActiveSections();
    zuInitRevealAnimations();
    zuInitProjectToggle();
  }

  document.addEventListener("DOMContentLoaded", zuInit);
})();
