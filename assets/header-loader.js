// Header Component Loader with Active Page Detection
(function () {
  // Load header HTML
  fetch("assets/header-component.html")
    .then((response) => response.text())
    .then((html) => {
      // Insert header at the beginning of layout-container
      const container = document.querySelector(".layout-container");
      if (container) {
        container.insertAdjacentHTML("afterbegin", html);

        // Set active page styling
        setActivePage();

        // Initialize header behaviors (dropdown, mobile menu)
        initializeHeader();
      }
    })
    .catch((error) => console.error("Error loading header:", error));

  // Detect current page and highlight active nav item
  function setActivePage() {
    const currentPage =
      window.location.pathname.split("/").pop().replace(".html", "") || "index";

    // Handle product pages
    const isProductPage = currentPage.startsWith("pdp");

    // Desktop nav links
    document.querySelectorAll(".nav-link").forEach((link) => {
      const linkPage = link.getAttribute("data-page");

      if (
        linkPage === currentPage ||
        (currentPage === "" && linkPage === "index")
      ) {
        link.classList.remove("text-gray-300");
        link.classList.add(
          "text-white",
          "font-bold",
          "border-b-2",
          "border-red-600",
          "pb-1"
        );
      }
    });

    // Mobile nav links
    document.querySelectorAll(".mobile-nav-link").forEach((link) => {
      const linkPage = link.getAttribute("data-page");

      if (
        linkPage === currentPage ||
        (currentPage === "" && linkPage === "index")
      ) {
        link.classList.add("font-bold", "text-white");
      }
    });

    // Highlight Products button if on a product page
    if (isProductPage) {
      const productsBtn = document.querySelector("[data-products-btn]");
      if (productsBtn) {
        productsBtn.classList.remove("text-gray-300");
        productsBtn.classList.add(
          "text-white",
          "font-bold",
          "border-b-2",
          "border-red-600",
          "pb-1"
        );
      }

      const mobileProductsBtn = document.querySelector("#mobileProductsBtn");
      if (mobileProductsBtn) {
        mobileProductsBtn.classList.add("font-bold", "text-white");
      }
    }
  }

  // Initialize header interactive behaviors
  function initializeHeader() {
    // Desktop product dropdown
    const prodBtn = document.querySelector("[data-products-btn]");
    const prodMenu = document.querySelector("[data-products-menu]");

    if (prodBtn && prodMenu) {
      prodBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        prodMenu.classList.toggle("hidden");
      });

      document.addEventListener("click", (e) => {
        if (!prodMenu.contains(e.target) && !prodBtn.contains(e.target)) {
          prodMenu.classList.add("hidden");
        }
      });
    }

    // Mobile menu toggle
    const mobileToggle = document.querySelector("#mobileToggle");
    const mobileMenu = document.querySelector("#mobileMenu");

    if (mobileToggle && mobileMenu) {
      function setMobile(open) {
        if (open) {
          mobileMenu.classList.remove("hidden");
          document.body.classList.add("menu-open");
        } else {
          mobileMenu.classList.add("hidden");
          document.body.classList.remove("menu-open");
        }
      }

      mobileToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const open = mobileMenu.classList.contains("hidden");
        setMobile(open);
      });

      mobileMenu.addEventListener("click", (e) => {
        e.stopPropagation();
      });

      document.addEventListener("click", (e) => {
        if (
          !mobileMenu.contains(e.target) &&
          !mobileToggle.contains(e.target)
        ) {
          setMobile(false);
        }
      });
    }

    // Mobile products submenu
    const mobileProductsBtn = document.querySelector("#mobileProductsBtn");
    const mobileProductsMenu = document.querySelector("#mobileProductsMenu");

    if (mobileProductsBtn && mobileProductsMenu) {
      mobileProductsBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        mobileProductsMenu.classList.toggle("hidden");
      });
    }
  }
})();
