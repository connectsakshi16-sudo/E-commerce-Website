
      document.addEventListener("DOMContentLoaded", function () {
        // Load cart data
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartCountElement = document.getElementById("cart-count");

        // Update cart count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = totalItems > 0 ? "flex" : "none";

        // Render order items
        const orderItemsContainer = document.getElementById(
          "order-items-container"
        );
        const orderTotalsContainer = document.getElementById(
          "order-totals-container"
        );

        if (cart.length === 0) {
          orderItemsContainer.innerHTML = "<p>Your cart is empty</p>";
          orderTotalsContainer.innerHTML = `
            <div class="order-row">
              <span>Subtotal</span>
              <span>₹0.00</span>
            </div>
            <div class="order-row">
              <span>Shipping</span>
              <span>₹0.00</span>
            </div>
            <div class="order-row order-total">
              <span>Total</span>
              <span>₹0.00</span>
            </div>
          `;
          return;
        }

        // Render items
        orderItemsContainer.innerHTML = cart
          .map(
            (item) => `
          <div class="order-item">
            <div class="order-item-img">
              <img src="${item.image}" alt="${
              item.name
            }" onerror="this.src='https://via.placeholder.com/60?text=Product'">
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

        // Payment option toggles
        const paymentOptions = document.querySelectorAll(".payment-option");
        paymentOptions.forEach((option) => {
          const header = option.querySelector(".payment-option-header");
          header.addEventListener("click", () => {
            paymentOptions.forEach((opt) => opt.classList.remove("active"));
            option.classList.add("active");
          });
        });

        // Pay Now button
        document
          .getElementById("pay-now-btn")
          .addEventListener("click", function () {
            // Get selected payment method
            const selectedMethod = document.querySelector(
              'input[name="payment-method"]:checked'
            ).id;

            // Validate form based on selected method
            let isValid = true;
            let errorMessage = "";

            if (selectedMethod === "credit-card") {
              const cardNumber = document
                .getElementById("card-number")
                .value.replace(/\s/g, "");
              const cardName = document.getElementById("card-name").value;
              const expiryDate = document.getElementById("expiry-date").value;
              const cvv = document.getElementById("cvv").value;

              if (!cardNumber || !cardName || !expiryDate || !cvv) {
                isValid = false;
                errorMessage = "Please fill in all card details";
              } else if (!/^\d{16}$/.test(cardNumber)) {
                isValid = false;
                errorMessage = "Please enter a valid 16-digit card number";
              } else if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
                isValid = false;
                errorMessage = "Please enter expiry date in MM/YY format";
              } else if (!/^\d{3,4}$/.test(cvv)) {
                isValid = false;
                errorMessage = "Please enter a valid CVV (3 or 4 digits)";
              }
            } else if (selectedMethod === "upi") {
              const upiId = document.getElementById("upi-id").value;
              if (!upiId) {
                isValid = false;
                errorMessage = "Please enter your UPI ID";
              } else if (!/^[\w.-]+@[\w]+$/.test(upiId)) {
                isValid = false;
                errorMessage = "Please enter a valid UPI ID (e.g. name@upi)";
              }
            } else if (selectedMethod === "net-banking") {
              const bank = document.querySelector(".net-banking-select").value;
              if (!bank) {
                isValid = false;
                errorMessage = "Please select your bank";
              }
            }

            if (!isValid) {
              alert(errorMessage);
              return;
            }

            // Save payment method to order
            const order = {
              items: cart,
              paymentMethod: selectedMethod,
              paymentStatus: "Paid",
              totalAmount: total,
              shipping: shipping,
              date: new Date().toISOString(),
            };

            // Save order to localStorage
            const orders = JSON.parse(localStorage.getItem("orders")) || [];
            orders.push(order);
            localStorage.setItem("orders", JSON.stringify(orders));

            // Clear cart
            localStorage.removeItem("cart");

            // Redirect to confirmation page
            window.location.href = "order-confirmation.html";
          });
      });
    