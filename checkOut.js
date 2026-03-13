
      document.addEventListener("DOMContentLoaded", function () {
        // Load cart data
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartCountElement = document.getElementById("cart-count");

        // Update cart count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountElement) {
          cartCountElement.textContent = totalItems;
          cartCountElement.style.display = totalItems > 0 ? "flex" : "none";
        }

        // Render order items
        const orderItemsContainer = document.getElementById(
          "order-items-container"
        );
        const orderTotalsContainer = document.getElementById(
          "order-totals-container"
        );

        if (cart.length === 0) {
          orderItemsContainer.innerHTML = "<p>Your cart is empty</p>";
          return;
        }

        // Render items
        orderItemsContainer.innerHTML = cart
          .map(
            (item) => `
          <div class="order-item">
            <div class="order-item-img">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="order-item-details">
              <div class="order-item-name">${item.name}</div>
              <div class="order-item-price">₹${item.price.toFixed(2)}</div>
              <div class="order-item-qty">Qty: ${item.quantity}</div>
            </div>
          </div>
        `
          )
          .join("");

        // Calculate totals
        const subtotal = cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const shipping = subtotal >= 499 ? 0 : 99;
        const total = subtotal + shipping;

        // Render totals
        orderTotalsContainer.innerHTML = `
          <div class="order-row">
            <span>Subtotal</span>
            <span>₹${subtotal.toFixed(2)}</span>
          </div>
          <div class="order-row">
            <span>Shipping</span>
            <span>${shipping === 0 ? "FREE" : "₹" + shipping.toFixed(2)}</span>
          </div>
          <div class="order-row order-total">
            <span>Total</span>
            <span>₹${total.toFixed(2)}</span>
          </div>
        `;

        // Get all required form fields and the button
        const requiredFields = document.querySelectorAll(
          "#checkout-form [required]"
        );
        const placeOrderBtn = document.getElementById("place-order-btn");

        // Function to check if all required fields are filled
        function checkFormValidity() {
          let allValid = true;
          requiredFields.forEach((field) => {
            if (!field.value.trim()) {
              allValid = false;
              field.style.borderColor = "red";
            } else {
              field.style.borderColor = "#ddd";
            }
          });
          placeOrderBtn.disabled = !allValid;
        }

        // Add event listeners to all required fields
        requiredFields.forEach((field) => {
          field.addEventListener("input", checkFormValidity);
          field.addEventListener("change", checkFormValidity);
        });

        // Place order button click handler
        placeOrderBtn.addEventListener("click", function () {
          if (!placeOrderBtn.disabled) {
            // Save order to localStorage
            const order = {
              id: Date.now().toString(),
              date: new Date().toISOString(),
              items: cart,
              subtotal,
              shipping,
              total,
              shippingInfo: {
                name: `${document.getElementById("first-name").value} ${
                  document.getElementById("last-name").value
                }`,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                state: document.getElementById("state").value,
                zip: document.getElementById("zip").value,
                country: document.getElementById("country").value,
                notes: document.getElementById("notes").value,
              },
              status: "Processing",
            };

            // Save order to localStorage
            const orders = JSON.parse(localStorage.getItem("orders")) || [];
            orders.push(order);
            localStorage.setItem("orders", JSON.stringify(orders));

            // Clear cart
            localStorage.setItem("cart", JSON.stringify([]));

            // Redirect to payment page
            window.location.href = "paymentPage.html";
          }
        });

        // Initial check
        checkFormValidity();
      });
   