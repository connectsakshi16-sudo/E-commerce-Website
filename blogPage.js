 // Simple form submission handler
 document
 .querySelector(".newsletter-form")
 .addEventListener("submit", function (e) {
   e.preventDefault();
   const email = this.querySelector("input").value;
   alert(
     `Thank you for subscribing with ${email}! You'll receive our next beauty guide soon.`
   );
   this.querySelector("input").value = "";
 });