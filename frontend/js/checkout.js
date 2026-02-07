function pay(){
  fetch("http://localhost:3000/api/orders/checkout",{
    method:"POST",
    headers:{ "Content-Type":"application/json"},
    body:JSON.stringify({
      user_id:1,
      tenant_id:1,
      total:total.value,
      payment_method:method.value
    })
  }).then(()=>alert("Paiement réussi"));
}
