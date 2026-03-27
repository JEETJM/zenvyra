// (() => {
//   "use strict";

//   const forms = document.querySelectorAll(".needs-validation");

//   Array.from(forms).forEach((form) => {
//     form.addEventListener(
//       "submit",
//       (event) => {
//         if (!form.checkValidity()) {
//           event.preventDefault();
//           event.stopPropagation();
//         }

//         form.classList.add("was-validated");
//       },
//       false
//     );
//   });
// })();

// document.addEventListener("DOMContentLoaded", function () {
//   const themeToggle = document.getElementById("themeToggle");
//   const themeIcon = document.querySelector(".theme-icon");
//   const themeText = document.querySelector(".theme-text");
//   const body = document.body;

//   const savedTheme = localStorage.getItem("zenvyra-theme");

//   function applyTheme(theme) {
//     if (theme === "dark") {
//       body.classList.add("dark-mode");
//       if (themeIcon) themeIcon.textContent = "🌙";
//       if (themeText) themeText.textContent = "Dark";
//     } else {
//       body.classList.remove("dark-mode");
//       if (themeIcon) themeIcon.textContent = "☀️";
//       if (themeText) themeText.textContent = "Light";
//     }
//   }

//   applyTheme(savedTheme || "light");

//   if (themeToggle) {
//     themeToggle.addEventListener("click", function () {
//       const nextTheme = body.classList.contains("dark-mode") ? "light" : "dark";
//       localStorage.setItem("zenvyra-theme", nextTheme);
//       applyTheme(nextTheme);
//     });
//   }

//   document.querySelectorAll(".toggle-password").forEach((btn) => {
//     btn.addEventListener("click", function () {
//       const targetId = this.getAttribute("data-target");
//       const input = document.getElementById(targetId);
//       const icon = this.querySelector("i");

//       if (!input) return;

//       if (input.type === "password") {
//         input.type = "text";
//         if (icon) {
//           icon.classList.remove("fa-eye");
//           icon.classList.add("fa-eye-slash");
//         }
//       } else {
//         input.type = "password";
//         if (icon) {
//           icon.classList.remove("fa-eye-slash");
//           icon.classList.add("fa-eye");
//         }
//       }
//     });
//   });
// });

(() => {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false,
    );
  });
})();

document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.querySelector(".theme-icon");
  const themeText = document.querySelector(".theme-text");
  const body = document.body;

  const savedTheme = localStorage.getItem("zenvyra-theme");

  function applyTheme(theme) {
    if (theme === "dark") {
      body.classList.add("dark-mode");
      if (themeIcon) themeIcon.textContent = "🌙";
      if (themeText) themeText.textContent = "Dark";
    } else {
      body.classList.remove("dark-mode");
      if (themeIcon) themeIcon.textContent = "☀️";
      if (themeText) themeText.textContent = "Light";
    }

    updateMapTheme();
  }

  function updateMapTheme() {
    if (window.map && typeof window.map.setStyle === "function") {
      const isDarkMode = body.classList.contains("dark-mode");

      window.map.setStyle(
        isDarkMode ?
          "mapbox://styles/mapbox/dark-v11"
        : "mapbox://styles/mapbox/light-v11",
      );
    }
  }

  applyTheme(savedTheme || "light");

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const nextTheme = body.classList.contains("dark-mode") ? "light" : "dark";
      localStorage.setItem("zenvyra-theme", nextTheme);
      applyTheme(nextTheme);
    });
  }

  document.querySelectorAll(".toggle-password").forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const input = document.getElementById(targetId);
      const icon = this.querySelector("i");

      if (!input) return;

      if (input.type === "password") {
        input.type = "text";
        if (icon) {
          icon.classList.remove("fa-eye");
          icon.classList.add("fa-eye-slash");
        }
      } else {
        input.type = "password";
        if (icon) {
          icon.classList.remove("fa-eye-slash");
          icon.classList.add("fa-eye");
        }
      }
    });
  });

  // Review form validation
  const reviewForm = document.getElementById("reviewForm");

  if (reviewForm) {
    reviewForm.addEventListener("submit", function (e) {
      const rating = document.querySelector(
        'input[name="review[rating]"]:checked',
      );
      const ratingError = document.getElementById("ratingError");
      const comment = document.getElementById("reviewComment");
      const commentError = document.getElementById("commentError");

      let hasError = false;

      if (!rating || rating.value === "") {
        e.preventDefault();
        if (ratingError) ratingError.style.display = "block";
        hasError = true;
      } else {
        if (ratingError) ratingError.style.display = "none";
      }

      if (comment && comment.value.trim() === "") {
        e.preventDefault();
        if (commentError) commentError.style.display = "block";
        hasError = true;
      } else {
        if (commentError) commentError.style.display = "none";
      }

      return !hasError;
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const filterToggleBtn = document.getElementById("filterToggleBtn");
  const filters = document.getElementById("filters");

  if (!filterToggleBtn || !filters) return;

  function handleFiltersByScreen() {
    if (window.innerWidth > 992) {
      filters.classList.remove("show");
      filterToggleBtn.classList.remove("open");
    }
  }

  filterToggleBtn.addEventListener("click", function () {
    if (window.innerWidth <= 992) {
      filters.classList.toggle("show");
      filterToggleBtn.classList.toggle("open");
    }
  });

  window.addEventListener("resize", handleFiltersByScreen);
});

let taxSwitch = document.getElementById("switchCheckDefault");

taxSwitch.addEventListener("change", () => {
  let taxInfo = document.getElementsByClassName("tax-info");

  for (let info of taxInfo) {
    if (taxSwitch.checked) {
      info.style.display = "inline";
    } else {
      info.style.display = "none";
    }
  }
});
