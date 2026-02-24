async function createTenant() {
  const name = document.getElementById("name").value;

  const res = await fetch("/api/tenants/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });

  const data = await res.json();

  const message = document.getElementById("message");
  message.innerText = data.message;
  message.style.color = res.ok ? "green" : "red";
}