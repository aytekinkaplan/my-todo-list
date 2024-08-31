document.addEventListener("DOMContentLoaded", function () {
  // Close alert messages
  const alertCloseButtons = document.querySelectorAll(".alert .close");
  alertCloseButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.parentElement.style.display = "none";
    });
  });

  // Form validation
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (event) {
      if (!validateForm(this)) {
        event.preventDefault();
      }
    });
  });

  // Toggle password visibility
  const passwordToggles = document.querySelectorAll(".password-toggle");
  passwordToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const passwordInput = this.previousElementSibling;
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      this.textContent = type === "password" ? "Show" : "Hide";
    });
  });

  // Dynamically update character count for textareas
  const textareas = document.querySelectorAll("textarea[maxlength]");
  textareas.forEach((textarea) => {
    const maxLength = textarea.getAttribute("maxlength");
    const charCount = document.createElement("div");
    charCount.className = "char-count";
    textarea.parentNode.insertBefore(charCount, textarea.nextSibling);

    function updateCharCount() {
      const remaining = maxLength - textarea.value.length;
      charCount.textContent = `${remaining} characters remaining`;
    }

    textarea.addEventListener("input", updateCharCount);
    updateCharCount(); // Initial count
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Helper functions
  window.formatDate = function (date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  window.truncateText = function (text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };
});

// Form validation helper
function validateForm(form) {
  let isValid = true;
  form.querySelectorAll("[required]").forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add("is-invalid");
      let feedback = input.nextElementSibling;
      if (!feedback || !feedback.classList.contains("invalid-feedback")) {
        feedback = document.createElement("div");
        feedback.className = "invalid-feedback";
        input.parentNode.insertBefore(feedback, input.nextSibling);
      }
      feedback.textContent = "This field is required.";
    } else {
      input.classList.remove("is-invalid");
      const feedback = input.nextElementSibling;
      if (feedback && feedback.classList.contains("invalid-feedback")) {
        feedback.remove();
      }
    }
  });
  return isValid;
}
