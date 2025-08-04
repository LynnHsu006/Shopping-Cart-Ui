let tempProduct={};

function addToCart(productName,productPrice,productImg){
    console.log("It work");
    tempProduct={
        name:productName,
        price:productPrice,
        image:productImg
    }
    document.getElementById("box").classList.add("d-block");
    document.getElementById("box").classList.remove("d-none");
}
function cancel(){
    document.getElementById("box").classList.add("d-none");
    document.getElementById("box").classList.remove("d-block");
}
function add(){
    console.log("Cogito");
    let cart=JSON.parse(localStorage.getItem('cart')) || [];
    let existngProduct=cart.find(item=>item.name===tempProduct.name);
    if(existngProduct){
        existngProduct.quantity+=1;
    }else{
        let product={
        id:cart.length+1,
        name:tempProduct.name,
        price:tempProduct.price,
        image:tempProduct.image,
        quantity:1
    }
    cart.push(product);
    }
    localStorage.setItem("cart",JSON.stringify(cart));
    tempProduct={};
    cancel();    
}

function clearAll(){
    localStorage.removeItem("cart");    
    loadData();
    let price=document.getElementById("total");
    price.textContent=0;
}

function loadData(){   
    let cart=JSON.parse(localStorage.getItem("cart")) || [];
    let cartItem=document.querySelector(".carts");
    let total=0;
    cartItem.innerHTML="";
    if(cart.length===0){
        cartItem.innerHTML=`<h2 class="text-center">Your shopping cart is empty</h2>`;
    }else{
        cart.forEach((item,index)=>{
            cartItem.innerHTML+= `<div class="cart d-flex justify-content-between">
                    <img src="imgs/${item.image}" alt="" style="width: 100px; ">
                    <div class="info text-end">
                        <h4 class="m-0">${item.name}</h4>
                        <p class="m-0 fs-4">Price: $ ${item.price}</p>
                        <div class="btns">
                            <button onclick="changeQuantity(${index}, 'decrease')" class="btn mx-2 fs-4">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="changeQuantity(${index}, 'increase')" class="btn mx-2 fs-4">+</button>
                        </div>
                    </div>
                </div> <hr>`;
                total += item.price * item.quantity;
                let price=document.querySelector("#total");
                price.textContent=total;
        })
    }
}
function changeQuantity(index,action){
    let cart=JSON.parse(localStorage.getItem("cart")) || [];
    if(action=='increase'){
        cart[index].quantity+=1;
    }else if(action=='decrease'){
        cart[index].quantity-=1;
    }
    if(cart[index].quantity==0){
        cart.splice(index,1);
    }
    localStorage.setItem('cart',JSON.stringify(cart));
    loadData();
}
