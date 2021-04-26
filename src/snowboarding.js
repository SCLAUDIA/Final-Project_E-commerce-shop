import { http } from './http.js';
import {ui} from './ui.js';

// GET SNOWBOARD PRODUCTS ON DOM LOAD

document.addEventListener('DOMContentLoaded', getSnowboardingProducts);
function getSnowboardingProducts(){
    // const http = new customHTTPMethods();
    http.get('http://localhost:3000/product')
    .then((data)=> ui.showSnowboardingProducts(data))
    .then((data)=> ui.getProductsFromLocalStorage(data));
    // setup
    setup();
}

// DECLARING VARIABLES
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
let cart = [];
let buttonsDOM = [];

document.addEventListener('click', getAddToCartButtons);
function getAddToCartButtons(e){
  if(e.target.classList.contains('details-btn-cart')){
  let product = e.target;
  buttonsDOM = product;
  // console.log(product);
  const id =  parseInt(product.dataset.id); 
   // console.log(id);
  let inCart = cart.find(product => product.id === id);
  // console.log(inCart);
      if (inCart) {
        product.innerText = "In cart";
        product.disabled = true
      }
      else{
        e.target.innerText="Product added to cart";
        e.target.disabled=true; 
        e.target.style.backgroundColor = "#959595"
        e.target.style.color = "#fff"
        e.target.style.border = "none";
      }  
            
  // GET PRODUCTS FROM LS
  let cartItem ={...ui.getProductsFromLocalStorage(id), amount:1};
  // console.log(cartItem);

  // ADD PRODUCTS TO THE CART
  cart = [...cart,cartItem];
  // console.log(cart);

  // SAVE CART IN LS
  ui.saveCart(cart);

  // SET CART IN LS
  setCartValues(cart);

  // DISPLAY CART ITEMS
  addCartItem(cartItem);

  // SHOW CART ITEMS
  showCart();
  }        
}

// SET CART IN LS
  function setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map(product =>{
        tempTotal += product.price * product.amount;
        itemsTotal += product.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
    // console.log(cartTotal,cartItems);
  }

  // ADD CART ITEMS
  function addCartItem(product){
    const div = document.createElement ('div');
    div.classList.add('cart-item');
    div.innerHTML = `
            <img src="${product.image}" alt="img">
            <div>
                <h4>${product.title}</h4>
                <h5>${product.price} €</h5>
                <div class="chevron">
                    <p>Quantity: </p>
                    <i class="fas fa-chevron-left" data-id=${product.id}></i>
                    <p class="item-amount">${product.amount}</p>
                    <i class="fas fa-chevron-right" data-id=${product.id}></i>
                </div>
                <span class="remove-item" data-id=${product.id}>Delete Product</span>
            </div>
        `
    cartContent.appendChild(div);
    // console.log(cartContent);
  } 

// SHOW CART
  function showCart(){
    cartOverlay.classList.add('transparentBcg');
    cartDOM.classList.add('showCart');
  }

// HIDE CART
  function hideCart(){
    cartOverlay.classList.remove('transparentBcg');
    cartDOM.classList.remove('showCart');
  }
 
  function setup(){
    cart = ui.getCart();
    setCartValues(cart);
    populateCart(cart);
    cartBtn.addEventListener('click', showCart);
    closeCartBtn.addEventListener('click', hideCart);
    
  }
  // POPULATE CART
  function populateCart(cart){
      cart.forEach(item => addCartItem(item));
  }

  cartContent.addEventListener('click', (e) =>{
    if(e.target.classList.contains('remove-item')){
      let removeProduct = e.target;
      // console.log(removeItem);
      let id = removeProduct.dataset.id;
      cartContent.removeChild(removeProduct.parentElement.parentElement);
      removeItem(id);
    } 
    else if (e.target.classList.contains("fa-chevron-right")) {
      let addAmount = e.target;
      let id = parseInt(addAmount.dataset.id);
      let tempItem = cart.find(item => item.id === id);
      tempItem.amount = tempItem.amount + 1;
      ui.saveCart(cart);
      setCartValues(cart);
      addAmount.previousElementSibling.innerText = tempItem.amount;  
    }
    else if (e.target.classList.contains("fa-chevron-left")) {
      let lowerAmount = e.target;
      let id = parseInt(lowerAmount.dataset.id);
      let tempItem = cart.find(item => item.id === id);
      tempItem.amount = tempItem.amount - 1;
      if (tempItem.amount>0){
        ui.saveCart(cart);
        setCartValues(cart);
        lowerAmount.nextElementSibling.innerText = tempItem.amount;
      }
      else{
        cartContent.removeChild(lowerAmount.parentElement.parentElement.parentElement);
        removeItem(id)
      }
    }
  })

  clearCartBtn.addEventListener('click', clearCart)
  function clearCart(){
    let cartItems = cart.map(item => item.id);
    // console.log(cartItems);
    cartItems.forEach(id => removeItem(id));
    //   REMOVING CART CONTENT
    console.log(cartContent.children);

    while (cartContent.children.length>0){
        cartContent.removeChild(cartContent.children[0]);
    }
    // hideCart();
    showThankForYourPurchase();
  }

  function removeItem(id) {
    cart = cart.filter(item => item.id !== parseInt(id));
    setCartValues(cart);
    ui.saveCart(cart);
    let button = getRemoveButton(id);

    if(button) {
        button.disabled = false;
        button.innerHTML = `ADD TO BAG`;
    }
};

function getRemoveButton(id){
  return buttonsDOM.find(button => parseInt(button.dataset.id) === id);
}

// THANK YOU MESSAGE
const thankYouOrderMessage = document.getElementById("successMessage");
function showThankForYourPurchase(){
  let purchaseMessage = document.createElement('p');
  purchaseMessage.className = 'success';
  purchaseMessage.innerHTML = "Thank you for your order!";
  thankYouOrderMessage.appendChild(purchaseMessage);
  setTimeout(() => {
    thankYouOrderMessage.remove();
  }, 2000);
  // clearCart();    
}




