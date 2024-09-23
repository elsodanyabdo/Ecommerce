// open & close cart 
let cartIcon = document.getElementById("cart-icon");
let cart = document.querySelector(".cart");
let closeCart=document.querySelector("#cart-close")


cartIcon.addEventListener("click" , ()=> {
    cart.classList.add("active")
})

closeCart.addEventListener("click" , ()=> {
    cart.classList.remove("active")
    
})

// Start when the document ready 
if (document.readyState == "loading") {
        document.addEventListener("DOMContentLoaded" , start)
}else{
    start();
}
//############################start##################################
function start(){
    addEvent();
}

//############################uppdate & render ##################################
function uppdate(){
    addEvent();
    uppdateTotal();
}

//############################ add event ##################################
let itemsAdded = [];
function addEvent(){
    //remove item from cart
    let cartRemoveItemBtns = document.querySelectorAll(".cart-remove");

    cartRemoveItemBtns.forEach(btn => {
        btn.addEventListener("click" , handelRemoveItemsCart)
    })


    //change the item quantity
    let cartQuantityInputs = document.querySelectorAll(".cart-quantity")
    cartQuantityInputs.forEach((input)=>{
        input.addEventListener("change" , handelChangeItemQuantity)
    })


    // add item to cart
    let addToCart = document.querySelectorAll(".add-cart")
    addToCart.forEach(add => {
        add.addEventListener("click" , addItemsToCart)
    })

    // handel buy button
    let buyBtn = document.querySelector(".btn-buy")
    buyBtn.addEventListener("click" , handelBuyBtn)
}

//################## addItemsToCart ################
function addItemsToCart(){
    let product = this.parentElement; 

    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".poroduct-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;

    let newToAdd = {
        title , 
        price ,  
        imgSrc,
    }
   
    //handel item is alredy exist
    if (itemsAdded.find((el) => el.title == newToAdd.title)) {
            alert("this item alredy exist")
            return;
    }else{
        itemsAdded.push(newToAdd)
    }
    // add prdouct to cart 
    let cartBoxElement = cartBoxComponent(title , price ,  imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = document.querySelector(".cart-content")
    cartContent.appendChild(newNode)
    uppdate();
}
//######################### handelBuyBtn ########################

function handelBuyBtn(){
    if (itemsAdded.length <= 0) {
        alert("threr is no ordder to place yet \nplease make an order to buy");
    return;
    }
    const cartContent = document.querySelector(".cart-content")
    cartContent.innerHTML = "";
    alert("your order is plased succesfuly")
    itemsAdded =[]
    uppdate()
}
//################## handelRemoveItemsCart ################
function handelRemoveItemsCart(){
    this.parentElement.remove()
   itemsAdded.filter(el => el.title != this.parentElement.querySelector(".cart-prodict-title").innerHTML)
    uppdate();
}

//################## handelChangeItemQuantity ################
function handelChangeItemQuantity(){
    if (isNaN(this.value) || this.value < 1 ) {
        this.value = 1;
    }
    this.value =Math.floor(this.value);  //to keet it an integre value 
    uppdate()
}

//############# uppdateTotal ############

function uppdateTotal(){
    let cartBoxs = document.querySelectorAll(".cart-box")
    let totalElement = document.querySelector(".total-price")
    let total = 0;
    cartBoxs.forEach(cartBox => {
        let priceElement = cartBox.querySelector(".cart-product-price")
        let price = parseFloat(priceElement.innerHTML.replace("$", ""))
        let quantity = cartBox.querySelector(".cart-quantity").value ;
        total += price * quantity;
    });
    //to keet the total only 2 digets
    total = total.toFixed(2);
    totalElement.innerHTML = "$" + total
}

function cartBoxComponent(title , price ,  imgSrc){
    return `
        <div class="cart-box">
            <img src=${ imgSrc} alt="" class="cart-img">
            <div class="ditales-box">
                <div class="cart-prodict-title">${title}</div>
                <div class="cart-product-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <!-- remove cart -->
            <i class="fa-solid fa-trash cart-remove"></i>
        </div>
    `
}