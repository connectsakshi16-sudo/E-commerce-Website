document.addEventListener("DOMContentLoaded", function () {
    // 1. INITIALIZE CLEAN CART - TESTED
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
    const cart = new Cart();
    window.cart = cart;

    // 2. DOM ELEMENTS - TESTED
    const cartItemsContainer = document.getElementById(
      "cart-items-container"
    );
    const cartSummaryContainer = document.getElementById(
      "cart-summary-container"
    );
    const cartCountElement = document.getElementById("cart-count");

    // 3. MAIN RENDER FUNCTION - TESTED
    function renderCart() {
      const items = cart.getItems();
      const totalItems = cart.getTotalItems();

      // Update cart count - TESTED
      cartCountElement.textContent = totalItems;
      cartCountElement.style.display = totalItems > 0 ? "flex" : "none";

      // Handle empty cart - TESTED
      if (items.length === 0) {
        cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added any items to your cart yet.</p>
                    <a href="products.html">Continue Shopping</a>
                </div>`;
        cartSummaryContainer.innerHTML = "";
        return;
      }

      // Render cart items - TESTED
      cartItemsContainer.innerHTML = items
        .map(
          (item) => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <div class="cart-item-price">₹${item.price.toFixed(
                      2
                    )}</div>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn minus">-</button>
                            <input type="number" class="quantity-input" value="${
                              item.quantity
                            }" min="1">
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="remove-btn">Remove</button>
                    </div>
                </div>
            </div>
        `
        )
        .join("");

      // Calculate totals - TESTED
      const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const shippingThreshold = 499;
      const shippingFee = subtotal >= shippingThreshold ? 0 : 99;
      const total = subtotal + shippingFee;

      // Render summary - TESTED
      cartSummaryContainer.innerHTML = `
            <h3 class="summary-title">Order Summary</h3>
            <div class="summary-row">
                <span class="summary-label">Subtotal (${totalItems} ${
        totalItems === 1 ? "item" : "items"
      })</span>
                <span class="summary-value">₹${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span class="summary-label">Shipping</span>
                <span class="summary-value">${
                  shippingFee === 0 ? "FREE" : "₹" + shippingFee.toFixed(2)
                }</span>
            </div>
            ${
              subtotal < shippingThreshold
                ? `<div class="shipping-message">Add ₹${(
                    shippingThreshold - subtotal
                  ).toFixed(2)} more for free shipping!</div>`
                : `<div class="shipping-message">You've unlocked free shipping!</div>`
            }
            <div class="summary-row total-row">
                <span class="summary-label total-label">Total</span>
                <span class="summary-value total-value">₹${total.toFixed(
                  2
                )}</span>
            </div>
            <a href="checkout.html">
<button class="checkout-btn">Proceed to Checkout</button>
</a>
            <a href="products.html" class="continue-shopping">Continue Shopping</a>
        `;

      // Add event listeners - TESTED
      setupEventListeners();
    }

    // 4. EVENT LISTENERS - TESTED
    function setupEventListeners() {
      // Quantity decrease
      document.querySelectorAll(".minus").forEach((btn) => {
        btn.onclick = function () {
          const itemId = this.closest(".cart-item").dataset.id;
          const input = this.nextElementSibling;
          const newQty = parseInt(input.value) - 1;
          if (newQty >= 1) {
            cart.updateQuantity(itemId, newQty);
            renderCart();
          }
        };
      });

      // Quantity increase
      document.querySelectorAll(".plus").forEach((btn) => {
        btn.onclick = function () {
          const itemId = this.closest(".cart-item").dataset.id;
          const input = this.previousElementSibling;
          const newQty = parseInt(input.value) + 1;
          cart.updateQuantity(itemId, newQty);
          renderCart();
        };
      });

      // Direct input change
      document.querySelectorAll(".quantity-input").forEach((input) => {
        input.onchange = function () {
          const itemId = this.closest(".cart-item").dataset.id;
          const newQty = parseInt(this.value);
          if (!isNaN(newQty) && newQty >= 1) {
            cart.updateQuantity(itemId, newQty);
          } else {
            this.value = 1;
          }
          renderCart();
        };
      });

      // Remove items
      document.querySelectorAll(".remove-btn").forEach((btn) => {
        btn.onclick = function () {
          const itemId = this.closest(".cart-item").dataset.id;
          cart.removeItem(itemId);
          renderCart();
        };
      });

      // Checkout
      const checkoutBtn = document.querySelector(".checkout-btn");
      if (checkoutBtn) {
        checkoutBtn.onclick = function () {
          if (cart.getTotalItems() > 0) {
            alert("Proceeding to checkout!");
          } else {
            alert("Your cart is empty!");
          }
        };
      }
    }

    // 5. INITIAL RENDER - TESTED
    renderCart();

    // 6. CROSS-TAB SYNC - TESTED
    window.addEventListener("storage", function (e) {
      if (e.key === "cart") {
        renderCart();
      }
    });

  });

