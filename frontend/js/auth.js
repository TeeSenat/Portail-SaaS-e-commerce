let isLogin = true;

function toggleForm() {
  isLogin = !isLogin;

  const title = document.getElementById("form-title");
  const nameInput = document.getElementById("name");
  const button = document.querySelector("button");
  const toggleText = document.querySelector("p");

  if (isLogin) {
    title.innerText = "Connexion";
    button.innerText = "Se connecter";
    nameInput.style.display = "none";
    toggleText.innerText = "Pas de compte ? S'inscrire";
  } else {
    title.innerText = "Inscription";
    button.innerText = "S'inscrire";
    nameInput.style.display = "block";
    toggleText.innerText = "Déjà un compte ? Se connecter";
  }
}

async function submitForm() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const url = isLogin ? "/api/users/login" : "/api/users/register";

  const body = isLogin
    ? { email, password }
    : { name, email, password };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "/";
  } else {
    document.getElementById("message").innerText = data.message;
  }
}