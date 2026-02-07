function addProduct(){
  fetch("http://localhost:3000/api/products/create",{
    method:"POST",
    headers:{ "Content-Type":"application/json"},
    body:JSON.stringify({
      tenant_id:tenant_id.value,
      name:name.value,
      price:price.value,
      stock:stock.value
    })
  }).then(()=>alert("Produit ajouté"));
}

function loadProducts(){
  fetch("http://localhost:3000/api/products/"+tenantSearch.value)
  .then(res=>res.json())
  .then(data=>{
    list.innerHTML="";
    data.forEach(p=>{
      list.innerHTML+=`
      <li>${p.name} - ${p.price}$
      <button onclick="addToCart(${p.id})">Ajouter</button>
      </li>`;
    })
  })
}

function addToCart(id){
  fetch("http://localhost:3000/api/cart/add",{
    method:"POST",
    headers:{ "Content-Type":"application/json"},
    body:JSON.stringify({
      user_id:1,
      product_id:id,
      quantity:1
    })
  }).then(()=>alert("Ajouté au panier"));
}
