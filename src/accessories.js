
import { http } from './http.js';
import {ui} from './ui.js';

// get getAccessoriesProducts on DOM Load
document.addEventListener('DOMContentLoaded', getAccessoriesProducts);
function getAccessoriesProducts(){
    http.get('http://localhost:3000/product')
    .then((data)=> ui.showAccessoriesProducts(data))
}

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