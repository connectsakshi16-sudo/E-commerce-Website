document.addEventListener("DOMContentLoaded", function () {
    const reviewForm = document.getElementById("reviewForm");
    const confirmationMessage = document.getElementById(
      "confirmationMessage"
    );

    reviewForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const review = {
        userName: document.getElementById("userName").value,
        userEmail: document.getElementById("userEmail").value,
        rating: document.querySelector('input[name="rating"]:checked')
          .value,
        reviewTitle: document.getElementById("reviewTitle").value,
        productSelect: document.getElementById("productSelect").value,
        reviewText: document.getElementById("reviewText").value,
        date: new Date().toISOString(),
      };

      // Save to localStorage
      const existingReviews =
        JSON.parse(localStorage.getItem("cosmeticReviews")) || [];
      existingReviews.push(review);
      localStorage.setItem(
        "cosmeticReviews",
        JSON.stringify(existingReviews)
      );

      // Show confirmation
      reviewForm.style.display = "none";
      confirmationMessage.style.display = "block";

      // Reset form (for if they return)
      reviewForm.reset();
    });
  });