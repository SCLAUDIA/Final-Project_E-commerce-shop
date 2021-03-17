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
                            <td class="p-remove"><button class="deleteItemFromApi" id=${product.id}><i class="far fa-trash-alt"></i></button></td>
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
// next to figure out