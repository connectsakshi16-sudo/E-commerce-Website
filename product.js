document.addEventListener("DOMContentLoaded", function () {
    // Initialize cart count on page load
    updateCartCountDisplay();

    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", function () {
        const productCard = this.closest(".product-card");
        const productId = productCard.dataset.id;
        const productName =
          productCard.querySelector(".product-title").textContent;
        const productPrice = parseFloat(
          productCard
            .querySelector(".current-price")
            .textContent.replace("₹", "")
        );
        const productImage =
          productCard.querySelector(".product-image img").src;

        // Add item to cart
        cart.addItem({
          id: productId,
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1,
        });

        // Show confirmation
        showAddToCartConfirmation(productCard);

        // Update button state temporarily
        this.textContent = "Added!";
        this.classList.add("added");

        setTimeout(() => {
          this.textContent = "Add to Cart";
          this.classList.remove("added");
        }, 2000);
      });
    });

    // Function to show add to cart confirmation
    function showAddToCartConfirmation(productCard) {
      const confirmation = document.createElement("div");
      confirmation.className = "add-to-cart-confirmation";
      confirmation.textContent = "Added to cart!";
      productCard.appendChild(confirmation);

      setTimeout(() => {
        confirmation.remove();
      }, 2000);
    }

    // Function to update cart count display
    function updateCartCountDisplay() {
      const cartCount = document.getElementById("cart-count");
      const totalItems = cart.getTotalItems();

      if (totalItems > 0) {
        cartCount.textContent = totalItems;
        cartCount.style.display = "flex";
      } else {
        cartCount.style.display = "none";
      }
    }

    // Listen for cart updates (in case you want to update from other tabs)
    window.addEventListener("storage", function (e) {
      if (e.key === "cart") {
        updateCartCountDisplay();
      }
    });
  });