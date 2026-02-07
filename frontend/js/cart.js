function loadCart(){
  fetch("http://localhost:3000/api/cart/1")
  .then(res=>res.json())
  .then(data=>{
    cartList.innerHTML="";
    data.forEach(i=>{
      cartList.innerHTML+=`
      <li>${i.name} x ${i.quantity}</li>
      `;
    })
  })
}
