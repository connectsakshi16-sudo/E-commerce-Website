document
.getElementById("contactForm")
.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Here you would typically send this data to a server
  console.log("Form submitted:", { name, email, subject, message });

  // Show success message
  alert("Thank you for your message! We will get back to you soon.");
  this.reset();
});

// Update cart count (reuse from other pages)
document.addEventListener("DOMContentLoaded", function () {
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCount = document.getElementById("cart-count");
const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

if (totalItems > 0) {
  cartCount.textContent = totalItems;
  cartCount.style.display = "flex";
} else {
  cartCount.style.display = "none";
}
});