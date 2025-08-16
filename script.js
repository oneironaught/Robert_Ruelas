// Run after DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    // ---------- AOS ----------
    if (typeof AOS !== "undefined" && AOS?.init) {
      AOS.init();
    }

    // ---------- Mobile Menu ----------
    // Expose a single toggle for any inline onclick usage
    function toggleMenu() {
      const navLinks = document.querySelector(".nav-links");
      if (!navLinks) return;

      // Prefer class-based toggle; CSS should control layout
      navLinks.classList.toggle("open");
      // Safety: if closed, ensure it cannot intercept clicks
      if (!navLinks.classList.contains("open")) {
        navLinks.style.pointerEvents = "none";
      } else {
        navLinks.style.pointerEvents = "auto";
      }
    }
    // Make available globally if HTML uses onclick="toggleMenu()"
    window.toggleMenu = toggleMenu;

    // ---------- Dark Mode ----------
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    if (darkModeToggle) {
      darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
      });
    }

    // ---------- Back to Top ----------
    const backToTopBtn = document.getElementById("backToTopBtn");
    if (backToTopBtn) {
      const onScroll = () => {
        const y = window.pageYOffset || document.documentElement.scrollTop;
        backToTopBtn.style.display = y > 20 ? "block" : "none";
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll(); // run once on load

      // Keep your existing topFunction() working if used inline
      window.topFunction = function () {
        document.body.scrollTop = 0; // Safari
        document.documentElement.scrollTop = 0; // Others
      };
    }

    // ---------- Modal (Photos) ----------
    const modal = document.getElementById("photoModal");
    const modalContent = modal?.querySelector(".modal-content");
    const enlargedPhoto = document.getElementById("enlargedPhoto");

    // Helpers ensure the modal never blocks clicks when "closed"
    const openModal = (src, x = 0, y = 0) => {
      if (!modal || !modalContent || !enlargedPhoto) return;

      enlargedPhoto.src = src || "";
      modal.style.display = "flex";
      modal.style.opacity = "1";
      modal.style.pointerEvents = "auto"; // accept clicks while open

      // Animate origin near click
      modalContent.style.transformOrigin = `${x}px ${y}px`;
      // CSS handles transitions via .show class
      requestAnimationFrame(() => {
        modal.classList.add("show");
        modalContent.classList.add("show");
      });
    };

    const closeModal = () => {
      if (!modal || !modalContent) return;

      modal.classList.remove("show");
      modalContent.classList.remove("show");

      // Immediately remove from hit-testing so it can't block links
      modal.style.opacity = "0";
      modal.style.display = "none";
      modal.style.pointerEvents = "none";

      // Optional: clear source to free memory
      if (enlargedPhoto) enlargedPhoto.removeAttribute("src");
    };

    // Click any photo to open modal (event delegation for robustness)
    const photosContainer = document.querySelector(".photos-container");
    if (photosContainer && modal) {
      photosContainer.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        const img = target.closest(".photo-container img");
        if (!img) return;

        openModal(img.src, event.clientX, event.clientY);
      });

      // Close when clicking backdrop (but not the image)
      modal.addEventListener("click", (event) => {
        if (!modalContent) return;
        if (!modalContent.contains(event.target)) {
          closeModal();
        }
      });

      // Close on Escape
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
      });

      // Ensure modal starts non-blocking
      modal.style.pointerEvents = "none";
      modal.style.display = "none";
      modal.style.opacity = "0";
    }

    // ---------- Accordion ----------
    const accordionButtons = document.querySelectorAll(".accordion-button");
    if (accordionButtons.length) {
      accordionButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const accordionItem = button.closest(".accordion-item");
          if (!accordionItem) return;

          const content = accordionItem.querySelector(".accordion-content");
          if (!content) return;

          const isOpening = !accordionItem.classList.contains("active");
          accordionItem.classList.toggle("active", isOpening);

          // Use explicit max-height for smooth transition; avoid overlay
          if (isOpening) {
            content.style.maxHeight = content.scrollHeight + "px";
          } else {
            content.style.maxHeight = "0px";
          }
        });
      });
    }
  });
