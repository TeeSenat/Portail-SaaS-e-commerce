async function loadProducts() {
  const res = await fetch("/api/products");
  const products = await res.json();

  const container = document.getElementById("productsContainer");
  container.innerHTML = "";

  products.forEach(product => {
    container.innerHTML += `
      <div class="product-card">
        <img src="https://via.placeholder.com/200" alt="Produit">
        <div class="product-title">${product.name}</div>
        <div class="product-rating">☆</div>
        <div class="product-price">$${product.price}</div>
        <button onclick="addToCart(${product.id})">
          Ajouter au panier
        </button>
      </div>
    `;
  });
}

async function addToCart(productId) {
  await fetch("/api/cart/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product_id: productId, quantity: 1 })
  });

  alert("Produit ajouté au panier !");
}

loadProducts();