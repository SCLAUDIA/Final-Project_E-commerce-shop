import { http } from './http.js';
import { ui } from './ui.js';

// ADMIN PAGE - declare variables
const addNewProductBtn = document. getElementById('add-np-btn');
const skiProducts = document. getElementById('skiing');
const snowboardProducts = document. getElementById('snowboarding');
const accessoriesProducts = document. getElementById('accessories');
const manageProducts = document.getElementById('product-manag');
const allProducts = document.getElementById('all-products');
const addNewProductItem = document.getElementById('add-np');
const editProductItem = document.getElementById('edit-np');
const editProductImg = document.getElementById('edit-np-image');
const editProductName = document.getElementById('edit-np-name');
const editProductDescription = document.getElementById('edit-np-description');
const editProductPrice = document.getElementById('edit-np-price');
const editProductSize = document.getElementById('edit-np-size');
const editProductStock = document.getElementById('edit-np-stock');
const editProductId = document.getElementById('edit-np-id');
const editProductCategory = document.getElementById('edit-np-category');
const cancelAddingNewProduct = document.getElementById('cancel-adding-items');


// FETCH ALL PRODUCTS FROM JSON - in table, in ADMIN Page
fetch('http://localhost:3000/product').then(
    res =>{
        res.json().then(
            data => {
                console.log(data);
                if(data.length > 0){
                    let output = "";

                    data.forEach((product) =>{
                        output += `
                        <tr>
                            <td><img src="${product.image}"></td>
                            <td class="p-name"><a href="details.html?id=${product.id}">${product.title}</a></td>
                            <td class="p-price">${product.price} €</td>
                            <td class="p-stock">${product.stock}</td>
                            <td style="display: none;">${product.id}</td>
                            <td class="p-remove"><button class="deleteItemFromApi"><i class="far fa-trash-alt" id=${product.id}></i></button></td>
                        </tr>    
                        `               
                    })

                    document.getElementById('all-products-from-db').innerHTML = output;
                    
                }
            }
        )
    }
)

// SHOW DIV for adding new product
addNewProductBtn.addEventListener('click', divForAddingNewProduct);
function divForAddingNewProduct() {
    addNewProductItem.classList.add('show-div-adminPage');
    manageProducts.classList.add('hide-div-adminPage');
    allProducts.classList.add('hide-div-adminPage');
 
}

// CANCEL DIV for adding new product - by click on cancel btn
cancelAddingNewProduct.addEventListener('click', backToAdminPage)
function backToAdminPage() {
    addNewProductItem.classList.remove('show-div-block');
    manageProducts.classList.remove('hide-div-adminPage');
    allProducts.classList.remove('hide-div-adminPage');
    manageProducts.classList.add('show-div-adminPageFlex');
    allProducts.classList.add('show-div-adminPageFlex');
    window.location = 'admin.html';
}

// ADD NEW PRODUCTS IN DB/API - in a certain category

document.addEventListener('onload', getSkiingProducts);
function getSkiingProducts(){
http.get('http://localhost:3000/product').then((data)=> ui.showSkiingProducts(data));
}
document.addEventListener('onload', getSnowboardingProducts);
function getSnowboardingProducts(){
http.get('http://localhost:3000/product').then((data)=> ui.showSnowboardingProducts(data));
}
document.addEventListener('onload', getAccessoriesProducts);
function getAccessoriesProducts(){
http.get('http://localhost:3000/product').then((data)=> ui.showAccessoriesProducts(data));
}

const saveAddingNewProduct = document.getElementById('save-adding-items');
saveAddingNewProduct.addEventListener('click', saveNewProduct);
function saveNewProduct() {
const newProductImg = document.getElementById('np-image').value;
const newProductName = document.getElementById('np-name').value;
const newProductDescription = document.getElementById('np-description').value;
const newProductPrice = document.getElementById('np-price').value;
const newProductSize = document.getElementById('np-size').value;
const newProductStock = document.getElementById('np-stock').value;
const newProductId = document.getElementById('np-id').value;
const newProductCategory = document.getElementById('np-category').value;
	let product = {
	  id: newProductId,
      title: newProductName,
      price: newProductPrice,
      description: newProductDescription,
      category: newProductCategory,
      image: newProductImg,
      stock: newProductStock,
      size: newProductSize,
    };
  if(newProductImg !== '' && newProductName !== '' &&  newProductDescription !== '' && newProductPrice !== '' && newProductSize !== '' && newProductStock !== '' && newProductId !== '' && newProductCategory !== ''){
	http
		.post('http://localhost:3000/product', product).then((data) => getSkiingProducts());
    http
		.post('http://localhost:3000/product', product).then((data) => getAccessoriesProducts());
    http
		.post('http://localhost:3000/product', product).then((data) => getSnowboardingProducts()); 
    }  
    else{
        alert('Please fill all fields!');
    }
}

// DELETE PRODUCTS IN DB/API 
document.getElementById('all-products-from-db').addEventListener('click', deleteProductFromAdminList);
// console.log(deteleFromTable);
function deleteProductFromAdminList(e){
    
    // console.log(e.target);
    if (e.target.classList.contains('far')) {
        		const id = e.target.id;
        		http
        			.delete(`http://localhost:3000/product/${id}`)
        			.then((data) => getSkiingProducts())
                    .then((data) => getAccessoriesProducts())
                    .then((data) => getSnowboardingProducts())
        			.catch('Error on delete!');
        	}
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


