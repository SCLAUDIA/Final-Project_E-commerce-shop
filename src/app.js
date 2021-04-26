import { http } from './http.js';
import {ui} from './ui.js';
// get products on DOM Load
// document.addEventListener('DOMContentLoaded', getProducts);
// function getProducts(){
//     // const http = new customHTTPMethods();
//     http.get('http://localhost:3000/product')
//     .then((data)=> ui.showProducts(data));
// }

const sliderContainer = document.querySelector(".glide__track");
const slide = document.querySelector(".glide__slides");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const interval = 2500;


//  ********** start auto-play slider functions **********
let slides = document.querySelectorAll(".glide__slide");
let index = 1;
let slideId;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

slide.append(firstClone);
slide.prepend(lastClone);

const slideWidth = slides[index].clientWidth;
slide.style.transform = `translateX(${-slideWidth * index}px)`;
console.log(slides);

const startSlide = ()=>{
    slideId = setInterval(()=>{
        moveToNextSlide();
    }, interval);
}

slide.addEventListener('transitionend',() => {
    slides = document.querySelectorAll(".glide__slide");
    if(slides[index].id === firstClone.id){
        slide.style.transition = 'none';
        index=1;
        slide.style.transform = `translateX(${-slideWidth * index}px)`;
    }
    if(slides[index].id === lastClone.id){
        slide.style.transition = 'none';
        index = slides.length - 2;
        slide.style.transform = `translateX(${-slideWidth * index}px)`;
    }
});

const moveToNextSlide = () =>{
    slides = document.querySelectorAll(".glide__slide");
    if(index >= slides.length - 1) return;
    index++;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
    slide.style.transition = '1s';
}

const moveToPreviousSlide = () =>{
    if(index <= 0) return;
    index--;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
    slide.style.transition = '1s';
}

nextBtn.addEventListener('click', moveToNextSlide);
prevBtn.addEventListener('click', moveToPreviousSlide);

sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(slideId);
});
sliderContainer.addEventListener('mouseleave', startSlide)
startSlide();
//  ********** end auto-play slider functions **********


// console.log(window.location.search);
window.onload = () => {
    if (window.location.search !==''){
        const id = window.location.search.split('=')[1];
    
        http.get(`http://localhost:3000/product/${id}`  )  
        .then((data)=> ui.showDetails(data))
        .then((data)=> ui.getProductsFromLocalStorage(data));
        
        
    }
    // setup
    setup();
}
// variables
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.getElementById('#detailsCardPage');
let cart = [];
// BUTTONS
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
            
    // get product from Local Storage products
    let cartItem ={...ui.getProductsFromLocalStorage(id), amount:1};
    // console.log(cartItem);

    // add product to the cart
    cart = [...cart,cartItem];
    // console.log(cart);

    // save cart in Local Storage
    ui.saveCart(cart);

    // set cart items 
    setCartValues(cart);

    // display cart intems
    addCartItem(cartItem);

    // show cart items
    showCart();

  
 

    }     
    
  }

//   document.addEventListener('click', setCartValues);
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

//   document.addEventListener('click', addCartItem);
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

//   document.addEventListener('click', showCart);
  function showCart(){
    cartOverlay.classList.add('transparentBcg');
    cartDOM.classList.add('showCart');
  }

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
    //   removing cart content
    console.log(cartContent.children);

    while (cartContent.children.length>0){
        cartContent.removeChild(cartContent.children[0])
    }
    // hideCart();
    // showThankForYourPurchase();
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

// Thank you for your purchase message
clearCartBtn.addEventListener('click', showThankForYourPurchase)
const thankYouOrderMessage = document.getElementById("successMessage");
function showThankForYourPurchase(){
   
        let purchaseMessage = document.createElement('p');
        purchaseMessage.className = 'success';
        purchaseMessage.innerHTML = "Thank you for your order!";
        thankYouOrderMessage.appendChild(purchaseMessage);
        setTimeout(() => {
            thankYouOrderMessage.remove();
        }, 2000);
        
}








 

