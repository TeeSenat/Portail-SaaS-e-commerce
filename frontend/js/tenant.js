function createTenant(){
  const name = document.getElementById("name").value;

  fetch("http://localhost:3000/api/tenants/create",{
    method:"POST",
    headers:{ "Content-Type":"application/json"},
    body:JSON.stringify({name})
  })
  .then(res=>res.json())
  .then(data=>alert("Boutique ID: "+data.tenantId));
}
