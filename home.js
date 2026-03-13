
      // Login Popup Functionality
      function openLogin() {
        document.getElementById("overlay").classList.add("active");
        document.getElementById("loginPopup").classList.add("active");
      }

      function closeLogin() {
        document.getElementById("overlay").classList.remove("active");
        document.getElementById("loginPopup").classList.remove("active");
      }

      function validateLogin() {
        // Add your login validation logic here
        alert("Login functionality would be implemented here");
        closeLogin();
      }

      // Close popup when clicking outside
      document.getElementById("overlay").addEventListener("click", closeLogin);

      // Login Popup Functionality
      function openLogin() {
        document.getElementById("overlay").classList.add("active");
        document.getElementById("loginPopup").classList.add("active");
      }

      function closeLogin() {
        document.getElementById("overlay").classList.remove("active");
        document.getElementById("loginPopup").classList.remove("active");
      }

      function validateLogin() {
        // Add your login validation logic here
        alert("Login functionality would be implemented here");
        closeLogin();
      }

      // Close popup when clicking outside
      document.getElementById("overlay").addEventListener("click", closeLogin);

      // Cart functionality for homepage
      document.addEventListener("DOMContentLoaded", function () {
        // This will automatically update the cart count on page load
        // since we're using the Cart class from cart.js

        // If you want to make the cart count update more prominent:
        const cartCount = document.getElementById("cart-count");
        if (cart.getTotalItems() > 0) {
          cartCount.textContent = cart.getTotalItems();
          cartCount.style.display = "flex";
        } else {
          cartCount.style.display = "none";
        }
      });
    