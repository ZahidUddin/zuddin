/**
 * ============================================================================
 * ZAHID UDDIN - PORTFOLIO SCRIPT ENGINE
 * Full Interactivity: Themes, Filter Tabs, Profiler, Modals, Clock, Form
 * ============================================================================
 */

(function () {
  "use strict";

  // --------------------------------------------------------------------------
  // 1. Theme Switcher (Dark Noir / Warm Champagne Light)
  // --------------------------------------------------------------------------
  const STORAGE_KEY_THEME = "zu-theme-mode";
  const htmlRoot = document.documentElement;
  const bodyRoot = document.body;
  const themeToggleBtn = document.getElementById("zu-theme-toggle");

  function applyTheme(theme) {
    htmlRoot.setAttribute("data-theme", theme);
    bodyRoot.setAttribute("data-zu-theme", theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to warm light theme" : "Switch to luxury dark theme"
      );
      // Update sun/moon icon
      if (theme === "dark") {
        themeToggleBtn.innerHTML = `<svg class="zu-theme-icon" viewBox="0 0 24 24" width="18" height="18"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>`;
      } else {
        themeToggleBtn.innerHTML = `<svg class="zu-theme-icon" viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
      }
    }
  }

  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme ? savedTheme : (systemDark ? "dark" : "dark"); // Default to dark noir
    applyTheme(initialTheme);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", () => {
        const currentTheme = htmlRoot.getAttribute("data-theme") || "dark";
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
        localStorage.setItem(STORAGE_KEY_THEME, nextTheme);
      });
    }
  }

  // --------------------------------------------------------------------------
  // 2. Header Scroll Glassmorphism & Active Link Tracking
  // --------------------------------------------------------------------------
  const header = document.getElementById("zu-header");
  const navLinks = document.querySelectorAll(".zu-nav-link");
  const sections = document.querySelectorAll("section[id]");

  let sectionPositions = [];

  function updateSectionPositions() {
    if (!sections.length) return;
    sectionPositions = Array.from(sections).map((sec) => {
      const top = sec.offsetTop - 140;
      return {
        id: sec.getAttribute("id") || "",
        top: top,
        bottom: top + sec.offsetHeight
      };
    });
  }

  let scrollScheduled = false;

  function handleScroll() {
    const scrollY = window.scrollY;

    if (header) {
      if (scrollY > 40) {
        header.classList.add("zu-header-scrolled");
      } else {
        header.classList.remove("zu-header-scrolled");
      }
    }

    // ScrollSpy active link detection with zero forced reflow
    if (sectionPositions.length > 0) {
      let currentSectionId = "";
      for (let i = 0; i < sectionPositions.length; i++) {
        const s = sectionPositions[i];
        if (scrollY >= s.top && scrollY < s.bottom) {
          currentSectionId = s.id;
          break;
        }
      }

      if (currentSectionId) {
        navLinks.forEach((link) => {
          const targetHref = link.getAttribute("href") || "";
          if (targetHref === `#${currentSectionId}`) {
            link.classList.add("zu-active");
          } else {
            link.classList.remove("zu-active");
          }
        });
      }
    }
  }

  function onScroll() {
    if (!scrollScheduled) {
      window.requestAnimationFrame(() => {
        handleScroll();
        scrollScheduled = false;
      });
      scrollScheduled = true;
    }
  }

  // --------------------------------------------------------------------------
  // 3. Mobile Navigation Drawer
  // --------------------------------------------------------------------------
  const menuToggleBtn = document.getElementById("zu-menu-toggle");
  const mobileNav = document.getElementById("zu-mobile-menu");

  function initMobileNav() {
    if (!menuToggleBtn || !mobileNav) return;

    menuToggleBtn.addEventListener("click", () => {
      const isOpen = header.classList.toggle("zu-nav-open");
      menuToggleBtn.setAttribute("aria-expanded", String(isOpen));
    });

    mobileNav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        header.classList.remove("zu-nav-open");
        menuToggleBtn.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (e) => {
      if (!header.contains(e.target) && header.classList.contains("zu-nav-open")) {
        header.classList.remove("zu-nav-open");
        menuToggleBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. Blurry Smooth Scroll System (Viewport Blur-In & Blur-Out)
  // --------------------------------------------------------------------------
  function initScrollReveal() {
    const revealItems = document.querySelectorAll(
      "[data-zu-reveal], .zu-section-header, .zu-cta-banner, .zu-value-card, .zu-project-card, .zu-timeline-row"
    );
    if (!revealItems.length) return;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const rect = entry.boundingClientRect;
            if (entry.isIntersecting) {
              entry.target.classList.add("zu-revealed");
              entry.target.classList.add("zu-in-view");
              entry.target.classList.remove("zu-out-view");
            } else {
              entry.target.classList.remove("zu-in-view");
              if (rect.top < 0) {
                // Scrolled past upwards -> soft blur out
                entry.target.classList.add("zu-out-view");
              } else {
                // Below viewport
                entry.target.classList.remove("zu-out-view");
              }
            }
          });
        },
        {
          threshold: [0.06, 0.25],
          rootMargin: "0px 0px -25px 0px",
        }
      );

      revealItems.forEach((el) => observer.observe(el));
    } else {
      revealItems.forEach((el) => {
        el.classList.add("zu-revealed");
        el.classList.add("zu-in-view");
      });
    }
  }

  // --------------------------------------------------------------------------
  // 5. Featured Projects Category Filter
  // --------------------------------------------------------------------------
  function initProjectFilters() {
    const filterBtns = document.querySelectorAll(".zu-filter-btn");
    const projectCards = document.querySelectorAll(".zu-project-card");

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("zu-active"));
        btn.classList.add("zu-active");

        const selectedFilter = btn.getAttribute("data-filter");

        projectCards.forEach((card) => {
          const cardCategories = (card.getAttribute("data-category") || "").split(" ");
          const cardPlatform = card.getAttribute("data-platform") || "";
          if (selectedFilter === "all" || cardCategories.includes(selectedFilter) || cardPlatform === selectedFilter) {
            card.classList.remove("zu-hidden");
          } else {
            card.classList.add("zu-hidden");
          }
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. Interactive Backend Playground / Profiler Tab Switcher
  // --------------------------------------------------------------------------
  function initTerminalPlayground() {
    const tabs = document.querySelectorAll(".zu-term-tab");
    const panes = document.querySelectorAll(".zu-term-pane");

    if (!tabs.length || !panes.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const targetId = tab.getAttribute("data-term-tab");
        if (!targetId) return;

        tabs.forEach((t) => {
          t.classList.remove("zu-active");
          t.setAttribute("aria-selected", "false");
        });
        panes.forEach((p) => p.classList.remove("zu-active"));

        tab.classList.add("zu-active");
        tab.setAttribute("aria-selected", "true");

        const activePane = document.getElementById(targetId);
        if (activePane) {
          activePane.classList.add("zu-active");
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 7. Project Case Study Modal Dialog Specs
  // --------------------------------------------------------------------------
  const caseSpecs = {
    "modal-gco": {
      title: "Gulf Coast Outfitters",
      tag: "Custom WooCommerce Architecture",
      link: "https://gulfcoastoutfitters.com/",
      summary: "High-volume outdoor retail platform processing bulk orders with sub-second checkout loading.",
      challenge: "The default WooCommerce checkout suffered from layout friction and heavy plugin bloat causing cart abandonment on mobile.",
      solution: "Engineered a custom checkout page in clean PHP, asynchronous cart drawer recalculations, asset minification, and database indexing for product variations.",
      metrics: ["42% reduction in checkout abandonment", "0.8s avg mobile page load time", "100% custom theme implementation"]
    },
    "modal-caflat": {
      title: "CA Flat Fee",
      tag: "Real Estate WordPress Platform",
      link: "https://caflatfee.com/",
      summary: "Modern property brokerage web platform featuring dynamic listing directories and automated lead capture.",
      challenge: "Required an intuitive content administration setup for non-technical agents to publish complex property meta without breaking layouts.",
      solution: "Created tailored ACF Pro flexible content blocks, custom post types for listings, and bidirectional CRM webhooks for instant lead delivery.",
      metrics: ["Instant CRM sync under 250ms", "98/100 Desktop PageSpeed score", "Zero visual builder lock-in"]
    },
    "modal-budgrower": {
      title: "The Bud Grower",
      tag: "High-AOV E-Commerce Build",
      link: "https://thebudgrower.com/",
      summary: "Specialized horticulture equipment store with custom bundle configurator and subscription billing.",
      challenge: "Multi-tiered product packages with high variability in shipping weight and upsell accessories.",
      solution: "Developed bespoke bundle logic, custom Stripe & PayPal payment hooks, and server-side OPcache tuning.",
      metrics: ["Over $1M+ processed seamlessly", "99.9% uptime during peak holiday promos", "Optimized Core Web Vitals across 200+ product pages"]
    },
    "modal-nwa": {
      title: "Naturally NWA",
      tag: "Headless WordPress & REST API",
      link: "https://naturallynwa.com/",
      summary: "Decoupled publishing engine built for lightning-fast editorial rendering and content syndication.",
      challenge: "Editorial team loved WordPress admin, but marketing demanded sub-second global edge performance.",
      solution: "Built a headless WordPress setup with cached REST endpoints feeding static pages with Cloudflare edge worker invalidation.",
      metrics: ["60ms Time to First Byte (TTFB)", "Lighthouse score: 99 across all pages", "Instant headless cache purges on post save"]
    },
    "modal-ucsd": {
      title: "UCSD Community Health",
      tag: "Healthcare & Institutional CMS",
      link: "https://ucsdcommunityhealth.org/",
      summary: "Academic healthcare portal built for accessibility, reliability, and structured research publication.",
      challenge: "Strict compliance with WCAG 2.1 AA accessibility guidelines and complex multi-department hierarchy.",
      solution: "Custom Gutenberg block system with accessible ARIA semantics, automated contrast checking, and strict role permissions.",
      metrics: ["100% WCAG 2.1 AA Accessibility compliance", "Structured taxonomy for 500+ health resources", "Zero security defects reported in audits"]
    },
    "modal-nub": {
      title: "Northern University Admissions",
      tag: "Laravel + Vue High-Concurrency Engine",
      link: "https://nub.ac.bd/",
      summary: "University enrollment portal handling thousands of concurrent applicants during national admission seasons.",
      challenge: "Legacy portal crashed under heavy simultaneous submission spikes during university admission deadlines.",
      solution: "Re-architected the application in Laravel + Vue.js with Redis queue workers, background document processing, and MySQL connection pooling.",
      metrics: ["Zero downtime across 15,000+ simultaneous applicants", "70% faster application processing time", "Automated SMS/Email notification pipeline"]
    }
  };

  const modal = document.getElementById("zu-case-modal");
  const modalCloseBtn = document.getElementById("zu-modal-close-btn");
  const modalContent = document.getElementById("zu-modal-content");

  function openCaseModal(key) {
    const data = caseSpecs[key];
    if (!data || !modal || !modalContent) return;

    modalContent.innerHTML = `
      <div class="zu-eyebrow" style="margin-bottom: 0.5rem;">${data.tag}</div>
      <h3 style="font-size: 1.85rem; margin-bottom: 1rem; color: rgb(var(--color-fg));">${data.title}</h3>
      <p style="font-size: 1rem; line-height: 1.7; color: rgba(var(--color-fg), 0.8); margin-bottom: 1.5rem;">${data.summary}</p>
      
      <div style="background-color: rgba(var(--color-fg), 0.04); border-left: 3px solid rgb(var(--color-accent)); padding: 1rem 1.25rem; margin-bottom: 1.5rem; border-radius: 2px;">
        <strong style="font-family: var(--font-heading); display: block; margin-bottom: 0.25rem; color: rgb(var(--color-fg));">The Engineering Challenge:</strong>
        <span style="font-size: 0.9375rem; color: rgba(var(--color-fg), 0.7);">${data.challenge}</span>
      </div>

      <div style="background-color: rgba(var(--color-fg), 0.04); border-left: 3px solid rgb(var(--color-success)); padding: 1rem 1.25rem; margin-bottom: 1.75rem; border-radius: 2px;">
        <strong style="font-family: var(--font-heading); display: block; margin-bottom: 0.25rem; color: rgb(var(--color-fg));">Architectural Solution:</strong>
        <span style="font-size: 0.9375rem; color: rgba(var(--color-fg), 0.7);">${data.solution}</span>
      </div>

      <h4 style="font-family: var(--font-mono); font-size: 0.8125rem; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(var(--color-fg), 0.6); margin-bottom: 0.75rem;">Key Engineering Outcomes</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 2rem; font-family: var(--font-mono); font-size: 0.8125rem; color: rgba(var(--color-fg), 0.85);">
        ${data.metrics.map(m => `<li><span style="color: rgb(var(--color-accent)); font-weight: bold; margin-right: 0.5rem;">✓</span>${m}</li>`).join("")}
      </ul>

      <div style="display: flex; gap: 1rem;">
        <a class="zu-btn zu-btn-primary zu-btn-sm" href="${data.link}" target="_blank" rel="noopener noreferrer">Visit Live Site &#8599;</a>
      </div>
    `;

    modal.classList.add("zu-modal-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeCaseModal() {
    if (!modal) return;
    modal.classList.remove("zu-modal-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function initModals() {
    document.querySelectorAll("[data-modal-target]").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const key = trigger.getAttribute("data-modal-target");
        if (key) openCaseModal(key);
      });
    });

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener("click", closeCaseModal);
    }

    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeCaseModal();
      });
    }

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal && modal.classList.contains("zu-modal-open")) {
        closeCaseModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 8. 1-Click Copy Email Feature
  // --------------------------------------------------------------------------
  function initEmailCopy() {
    const emailToCopy = "zahidudd0.in@gmail.com";
    const textCopyBtn = document.getElementById("zu-copy-email-btn");
    const iconCopyBtns = document.querySelectorAll(".zu-copy-inline-btn, #zu-copy-inline");

    if (textCopyBtn) {
      textCopyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(emailToCopy).then(() => {
          const originalText = textCopyBtn.textContent;
          textCopyBtn.textContent = "✓ Copied to clipboard!";
          setTimeout(() => {
            textCopyBtn.textContent = originalText;
          }, 2500);
        }).catch(() => {
          window.location.href = `mailto:${emailToCopy}`;
        });
      });
    }

    iconCopyBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        navigator.clipboard.writeText(emailToCopy).then(() => {
          btn.classList.add("zu-copied");
          const originalTooltip = btn.getAttribute("data-zu-tooltip") || "Copy email";
          btn.setAttribute("data-zu-tooltip", "Copied!");
          setTimeout(() => {
            btn.classList.remove("zu-copied");
            btn.setAttribute("data-zu-tooltip", originalTooltip);
          }, 2000);
        }).catch(() => {
          window.location.href = `mailto:${emailToCopy}`;
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 9. Contact Form Simulation & Mailto Fallback
  // --------------------------------------------------------------------------
  function initContactForm() {
    const form = document.getElementById("zu-contact-form");
    const feedback = document.getElementById("zu-form-feedback");
    const submitBtn = document.getElementById("zu-form-submit-btn");

    if (!form || !feedback || !submitBtn) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = (document.getElementById("contact-name") || {}).value?.trim() || "Client";
      const email = (document.getElementById("contact-email") || {}).value?.trim() || "";
      const subject = (document.getElementById("contact-subject") || {}).value?.trim() || "Project Inquiry";
      const message = (document.getElementById("contact-message") || {}).value?.trim() || "";

      if (!name || !email || !message) {
        feedback.style.display = "block";
        feedback.style.color = "#EF4444";
        feedback.textContent = "Please fill in all required fields.";
        return;
      }

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.textContent = "Sending to Zahid...";
      submitBtn.disabled = true;
      feedback.style.display = "none";

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, subject, message })
        });

        const data = await res.json().catch(() => ({}));

        if (res.ok && data.success) {
          // Success! Delivered directly to Gmail via Resend
          feedback.style.display = "block";
          feedback.style.color = "rgb(var(--color-success))";
          feedback.innerHTML = `✓ Thank you, <strong>${name}</strong>! Your message has been sent directly to Zahid's Gmail inbox. You'll receive a reply shortly.`;
          form.reset();

          setTimeout(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
          }, 4000);
        } else if (res.status === 404) {
          // Local environment fallback (e.g. running on local XAMPP without Vercel CLI)
          const mailtoUrl = `mailto:zahidudd0.in@gmail.com?subject=${encodeURIComponent(subject + " - from " + name)}&body=${encodeURIComponent(message + "\n\nFrom: " + name + " <" + email + ">")}`;
          feedback.style.display = "block";
          feedback.style.color = "#E88D4A";
          feedback.innerHTML = `Notice: Vercel serverless /api/contact runs when deployed to Vercel. Preparing email draft...`;
          window.location.href = mailtoUrl;

          setTimeout(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            form.reset();
          }, 3000);
        } else {
          // API error
          throw new Error(data.error || "Failed to send message. Please try again.");
        }
      } catch (err) {
        feedback.style.display = "block";
        feedback.style.color = "#EF4444";
        feedback.textContent = `✕ ${err.message || "An error occurred. Please email directly at zahidudd0.in@gmail.com"}`;
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }

  // --------------------------------------------------------------------------
  // 10. Live Dhaka Time (UTC+6) Clock in Footer
  // --------------------------------------------------------------------------
  function initDhakaClock() {
    const clockEl = document.getElementById("zu-dhaka-clock");
    if (!clockEl) return;

    function updateClock() {
      try {
        const now = new Date();
        const options = {
          timeZone: "Asia/Dhaka",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true
        };
        const formatter = new Intl.DateTimeFormat("en-US", options);
        clockEl.textContent = `${formatter.format(now)} (Dhaka, UTC+6)`;
      } catch (err) {
        clockEl.textContent = "Dhaka, UTC+6";
      }
    }

    updateClock();
    setInterval(updateClock, 1000);
  }

  // --------------------------------------------------------------------------
  // 10. Live Tab Favicon Bouncing Dot Animation
  // --------------------------------------------------------------------------
  function initFaviconAnimation() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const faviconLink = document.querySelector("link[rel*='icon']");
    if (!faviconLink) return;

    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    const totalFrames = 26;
    let timerId = null;

    const bounceOffsets = [
      0, 0, -2, -5, -8, -10, -9, -7, -4, -1, 0, 0, -2, -4, -3, -1, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0
    ];

    function drawFavicon(offsetIndex) {
      const isDark = (document.documentElement.getAttribute("data-theme") || "dark") === "dark";
      const bgColor = isDark ? "#140E0A" : "#F6F1E9";
      const fgColor = isDark ? "#DAC5A7" : "#140E0A";
      const accentColor = isDark ? "#E88D4A" : "#B45224";

      ctx.clearRect(0, 0, 32, 32);

      // Squircle Background
      ctx.fillStyle = bgColor;
      if (typeof ctx.roundRect === "function") {
        ctx.beginPath();
        ctx.roundRect(1, 1, 30, 30, 8);
        ctx.fill();
        ctx.strokeStyle = isDark ? "rgba(232, 141, 74, 0.35)" : "rgba(180, 82, 36, 0.25)";
        ctx.lineWidth = 1;
        ctx.stroke();
      } else {
        ctx.fillRect(1, 1, 30, 30);
      }

      // Monogram 'z'
      ctx.fillStyle = fgColor;
      ctx.font = "bold 17px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      ctx.fillText("z", 6, 17);

      // Bouncing Orange Dot
      const yOffset = bounceOffsets[offsetIndex % bounceOffsets.length] || 0;
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(23, 22 + yOffset, 2.7, 0, Math.PI * 2);
      ctx.fill();

      faviconLink.href = canvas.toDataURL("image/png");
    }

    let cycles = 0;
    const maxCycles = 2; // Run 2 bounce cycles (~5s) on load, then halt interval to keep main thread idle

    function step() {
      if (document.hidden) return;
      drawFavicon(frame);
      frame = (frame + 1) % totalFrames;
      if (frame === 0) {
        cycles++;
        if (cycles >= maxCycles) {
          stop();
        }
      }
    }

    function start() {
      if (!timerId && cycles < maxCycles) {
        timerId = setInterval(step, 100);
      }
    }

    function stop() {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stop();
      } else if (cycles < maxCycles) {
        start();
      }
    });

    start();
  }

  // --------------------------------------------------------------------------
  // Bootstrapping
  // --------------------------------------------------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initMobileNav();
    initScrollReveal();
    initProjectFilters();
    initTerminalPlayground();
    initModals();
    initEmailCopy();
    initContactForm();
    initDhakaClock();
    initFaviconAnimation();

    updateSectionPositions();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      clearTimeout(window._zuResizeTimer);
      window._zuResizeTimer = setTimeout(updateSectionPositions, 150);
    }, { passive: true });
    window.addEventListener("load", updateSectionPositions);
    handleScroll();
  });
})();
