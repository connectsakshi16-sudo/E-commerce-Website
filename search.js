
      // Get search query from URL
      const urlParams = new URLSearchParams(window.location.search);
      const searchQuery = urlParams.get("query") || "";

      // Update search input and results count
      document.getElementById("search-input").value = searchQuery;
      document.getElementById(
        "results-count"
      ).textContent = `Showing results for "${searchQuery}"`;

      // Sample product data - in a real app, this would come from your database
      const allProducts = [
        {
          id: 1,
          title: "Gentle Face Serum with Aloe Vera",
          description:
            "Hydrating serum with pure aloe vera extract for all skin types",
          price: 300,
          originalPrice: 450,
          image: "https://i.postimg.cc/bwkrK6HM/IMG-20250308-WA0040.jpg",
          tags: ["serum", "hydrating", "aloe"],
        },
        {
          id: 2,
          title: "Hydrating Lip Mask",
          description:
            "Overnight treatment for dry, chapped lips with hyaluronic acid",
          price: 159,
          originalPrice: 250,
          image: "https://i.postimg.cc/MHwXZ165/IMG-20250308-WA0041.jpg",
          tags: ["lip", "mask", "hydrating"],
        },
        {
          id: 3,
          title: "Ultra Soothing Lip Moisturizer",
          description: "Daily lip treatment with shea butter and vitamin E",
          price: 499,
          originalPrice: 699,
          image: "https://i.postimg.cc/4NBnZKrv/IMG-20250308-WA0039.jpg",
          tags: ["lip", "moisturizer", "soothing"],
        },
        {
          id: 4,
          title: "Collagen Booster Face Toner",
          description:
            "Refreshing toner that enhances skin elasticity and firmness",
          price: 358,
          originalPrice: 499,
          image: "https://i.postimg.cc/3R5x92vh/IMG-20250308-WA0037.jpg",
          tags: ["toner", "collagen", "firming"],
        },
        {
          id: 5,
          title: "Exfoliating Solution",
          description: "Gentle chemical exfoliant with AHA and BHA complex",
          price: 219,
          originalPrice: 350,
          image: "https://i.postimg.cc/nz2f7mK0/IMG-20250308-WA0034.jpg",
          tags: ["exfoliator", "AHA", "BHA"],
        },
        {
          id: 6,
          title: "Hylamide Radiance Booster",
          description: "Illuminating serum for a healthy, glowing complexion",
          price: 299,
          originalPrice: 450,
          image: "https://i.postimg.cc/pr0xNjpp/IMG-20250308-WA0035.jpg",
          tags: ["serum", "radiance", "glow"],
        },
      ];

      // Filter products based on search query
      function filterProducts(query) {
        if (!query) return allProducts;

        const lowerQuery = query.toLowerCase();
        return allProducts.filter(
          (product) =>
            product.title.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery) ||
            product.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
        );
      }

      // Display filtered products
      function displayResults() {
        const productsContainer = document.getElementById("products-container");
        const noResults = document.getElementById("no-results");
        const filteredProducts = filterProducts(searchQuery);

        if (filteredProducts.length === 0) {
          productsContainer.style.display = "none";
          noResults.style.display = "block";
          return;
        }

        noResults.style.display = "none";
        productsContainer.style.display = "grid";
        productsContainer.innerHTML = "";

        filteredProducts.forEach((product) => {
          const productCard = document.createElement("div");
          productCard.className = "product-card";
          productCard.innerHTML = `
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.title}</h3>
                        <p class="product-desc">${product.description}</p>
                        <div class="price-container">
                            <span class="current-price">₹${product.price.toFixed(
                              2
                            )}</span>
                            <span class="original-price">₹${product.originalPrice.toFixed(
                              2
                            )}</span>
                        </div>
                        <button class="add-to-cart" onclick="addToCart(${
                          product.id
                        })">Add to Cart</button>
                    </div>
                `;
          productsContainer.appendChild(productCard);
        });
      }

      // Mock add to cart function
      function addToCart(productId) {
        alert(`Product ${productId} added to cart`);
        // In a real app, you would update the cart count here
      }

      // Initialize the page
      displayResults();
    