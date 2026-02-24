async function loadCart() {
  const res = await fetch("/api/cart");
  const items = await res.json();

  const container = document.getElementById("cartItems");
  const totalElement = document.getElementById("cartTotal");

  container.innerHTML = "";
  let total = 0;

  items.forEach(item => {
    total += item.price * item.quantity;

    container.innerHTML += `
      <div class="cart-item">
        <img src="https://via.placeholder.com/150">
        <div class="cart-info">
          <h4>${item.name}</h4>
          <p class="cart-price">$${item.price}</p>

          <div class="cart-qty">
            <button onclick="updateQty(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQty(${item.id}, 1)">+</button>
            <button onclick="removeItem(${item.id})">🗑</button>
          </div>
        </div>
      </div>
    `;
  });

  totalElement.innerText = "$" + total.toFixed(2);
}

async function updateQty(productId, change) {
  await fetch("/api/cart/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product_id: productId, change })
  });

  loadCart();
}

async function removeItem(productId) {
  await fetch("/api/cart/remove", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product_id: productId })
  });

  loadCart();
}

function checkout() {
  alert("Commande validée !");
}

loadCart();