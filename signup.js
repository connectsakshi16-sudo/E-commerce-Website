
      // Toggle password visibility
      function togglePassword() {
        const passwordInput = document.getElementById("password");
        const toggleIcon = document.querySelector(".password-toggle");

        if (passwordInput.type === "password") {
          passwordInput.type = "text";
          toggleIcon.classList.remove("fa-eye");
          toggleIcon.classList.add("fa-eye-slash");
        } else {
          passwordInput.type = "password";
          toggleIcon.classList.remove("fa-eye-slash");
          toggleIcon.classList.add("fa-eye");
        }
      }

      // Form submission
      document
        .getElementById("signupForm")
        .addEventListener("submit", function (e) {
          e.preventDefault();

          const password = document.getElementById("password").value;
          const confirmPassword =
            document.getElementById("confirm-password").value;

          if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
          }

          // Here you would typically send the data to your server
          alert(
            "Account created successfully! Redirecting to your dashboard..."
          );
          window.location.href = "index.html";
        });

      // Update cart count with animation
      document.addEventListener("DOMContentLoaded", function () {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartCount = document.getElementById("cart-count");
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

        if (totalItems > 0) {
          cartCount.textContent = totalItems;
          cartCount.style.display = "flex";
          // Add animation when page loads
          cartCount.style.transform = "scale(1.3)";
          setTimeout(() => {
            cartCount.style.transform = "scale(1)";
          }, 300);
        } else {
          cartCount.style.display = "none";
        }
      });

      // Cart icon hover effect
      const cartIcon = document.querySelector(".cart-icon");
      cartIcon.addEventListener("mouseenter", function () {
        this.querySelector("i").style.transform = "translateY(-2px)";
      });
      cartIcon.addEventListener("mouseleave", function () {
        this.querySelector("i").style.transform = "translateY(0)";
      });

      // Add focus effects to form inputs
      const inputs = document.querySelectorAll(".form-group input");
      inputs.forEach((input) => {
        input.addEventListener("focus", function () {
          this.parentElement.querySelector("label").style.color =
            "var(--primary)";
        });
        input.addEventListener("blur", function () {
          this.parentElement.querySelector("label").style.color = "var(--dark)";
        });
      });
    