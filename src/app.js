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
const interval = 3000;


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



//  ********** event listeners **********
// JS SHOPPING CART RELATED
// declaring variables
const productList = document.querySelector('.details-card-wrapper');
const cartContainer = document.querySelector('.cart-container');
const cartList = document.querySelector('.cart-list');
const cartTotalValue = document.getElementById('cart-total-value');
const cartCountInfo = document.getElementById('cart-count-info');
let cartItemID = 1;
const message  = document.querySelector('.purchase-with-payment');

// EVENT LISTENERS
eventListeners();
function eventListeners(){
    // Loading Shopping Cart
    window.addEventListener('DOMContentLoaded', () => {
        loadCart();
    });
    const cartContainer = document.querySelector('.cart-container');

    // Show & Hide Cart Container
    document.getElementById('cart-btn').addEventListener('click', () => {
        cartContainer.classList.toggle('show-cart-container');
    });

    // Add to cart Items
    productList.addEventListener('click', purchaseProduct);

   // Delete Items from Cart
   cartList.addEventListener('click', deleteProduct);
   // thank you for your purchase
   message.addEventListener('click', showThankForYourPurchase);
}

// UPDATE CART INFO
function updateCartInfo(){
    let cartInfo = findCartInfo();
    // console.log(cartInfo);
    cartCountInfo.textContent = cartInfo.productCount;
    cartTotalValue.textContent = cartInfo.total;
}
updateCartInfo();

// PURCHASE PRDUCT ITEMS
function purchaseProduct(e){
    if(e.target.classList.contains('details-btn-cart')){
        let product = e.target.parentElement.parentElement.parentElement;
        // console.log(product);
        getProductInfo(product);
    }
}

// GET PRODUCT INFO FROM DETAILS PAGE
function getProductInfo(product){
    let productInfo = {
        id: cartItemID,
        image: product.querySelector('.image-showcase img').src,
        title: product.querySelector('.product-title').textContent,
        price: product.querySelector('.product-price').textContent
    }
    cartItemID++;
    // console.log(productInfo);
    addToCartList(productInfo);
    saveProductInStorage(productInfo);
}

// ADD SELECTED PRODUCTS - into the Cart List
function addToCartList(product){
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-id', `${product.id}`);
    cartItem.innerHTML = `
        <img src="${product.image}" alt="image">
        <div class = "cart-item-info">
            <h3 class = "cart-item-name">${product.title}</h3>
            <span class = "cart-item-price">${product.price}</span>
            
        </div>

        <button type = "button" class = "removeBtn" id="removeBtn">Remove Item</button>
    `;
    cartList.appendChild(cartItem);
}

// SAVE PRODUCTS IN LOCAL STORAGE
function saveProductInStorage(item){
    let products = getProductFromStorage();
    // console.log(products);
    products.push(item);
    localStorage.setItem('products', JSON.stringify(products));
    updateCartInfo();
}

// GET PRODUCTS FROM LOCAL STORAGE
function getProductFromStorage(){
    return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
}

// LOAD CART PRODUCTS
function loadCart(){
    let products = getProductFromStorage();
    if(products.length < 1){
        cartItemID = 1;
    } else {
        cartItemID = products[products.length - 1].id;
        cartItemID++;
    }
    // console.log(cartItemID);
    products.forEach(product => addToCartList(product));
    updateCartInfo();
}

// CALCULATE TOTAL PRICE IN THE SHOPPING CART
function findCartInfo(){
    let products = getProductFromStorage();
    // console.log(products);
    let total = products.reduce((acc, product) => {
        let price = parseFloat(product.price.substr(1));
        return acc += price;
    }, 0); 
    return{
        total: total.toFixed(2),
        productCount: products.length
    }
}
    findCartInfo();

// DELETE PRODUCTS FROM THE CART AND FROM THE LOCAL STORAGE 
function deleteProduct(e){
    // console.log(e.target);
    let cartItem;
    if(e.target.className === "removeBtn"){
        cartItem = e.target.parentElement;
        cartItem.remove(); 
    } else if(e.target.className === "I"){
        cartItem = e.target.parentElement.parentElement;
        cartItem.remove();
    }
    // console.log(cartItem);
    let products = getProductFromStorage();
    let updatedProducts = products.filter(product => {
        return product.id !== parseInt(cartItem.dataset.id);
    });
    // console.log(products);
    // console.log(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts)); 
    // console.log(products);
    updateCartInfo();
}

// Thank you for your purchase message
const thankYouOrderMessage = document.getElementById("successMessage");
function showThankForYourPurchase(e){
    e.preventDefault();
        let purchaseMessage = document.createElement('p');
        purchaseMessage.className = 'success';
        purchaseMessage.innerHTML = "Thank you for your order!";
        thankYouOrderMessage.appendChild(purchaseMessage);
        setTimeout(() => {
            thankYouOrderMessage.remove();
        }, 2000);
        
}

 

