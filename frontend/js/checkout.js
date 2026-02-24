async function loadCheckout() {
  const res = await fetch("/api/cart");
  const items = await res.json();

  const orderContainer = document.getElementById("orderItems");
  const totalElement = document.getElementById("checkoutTotal");

  orderContainer.innerHTML = "";
  let total = 0;

  items.forEach(item => {
    total += item.price * item.quantity;

    orderContainer.innerHTML += `
      <p>${item.name} x${item.quantity} 
      <strong>$${item.price * item.quantity}</strong></p>
    `;
  });

  totalElement.innerText = "$" + total.toFixed(2);
}

async function processPayment() {
  const name = document.getElementById("fullname").value;

  if (!name) {
    alert("Veuillez remplir les informations");
    return;
  }

  
  document.getElementById("paymentMessage").innerText =
    "Paiement effectué avec succès 🎉";

  document.getElementById("paymentMessage").style.color = "green";

  // vider panier
  await fetch("/api/cart/clear", { method: "POST" });
}

loadCheckout();

// Mise à jour visuelle carte
document.getElementById("cardNumber").addEventListener("input", e => {
  document.getElementById("previewNumber").innerText =
    e.target.value || "•••• •••• •••• ••••";
});

document.getElementById("fullname").addEventListener("input", e => {
  document.getElementById("previewName").innerText =
    e.target.value || "Nom Complet";
});

document.getElementById("expiry").addEventListener("input", e => {
  document.getElementById("previewExpiry").innerText =
    e.target.value || "MM/AA";
});

document.getElementById("cvv").addEventListener("focus", () => {
  document.querySelector(".card-preview").classList.add("flip");
});

document.getElementById("cvv").addEventListener("blur", () => {
  document.querySelector(".card-preview").classList.remove("flip");
});

document.getElementById("cvv").addEventListener("input", e => {
  document.getElementById("previewCvv").innerText =
    e.target.value || "•••";
});

async function processPayment() {
  const container = document.querySelector(".checkout-form");

  container.innerHTML = `
    <div class="success-animation">
      <h2> Paiement Réussi !</h2>
      <p>Merci pour votre achat 🎉</p>
    </div>
  `;

  await fetch("/api/cart/clear", { method: "POST" });
}