// ADMIN PAGE - declare variables
const addNewProductBtn = document. getElementById('add-np-btn');
const skiProducts = document. getElementById('skiing');
const snowboardProducts = document. getElementById('snowboarding');
const accessoriesProducts = document. getElementById('accessories');
const manageProducts = document.getElementById('product-manag');
const allProducts = document.getElementById('all-products');
const addNewProductItem = document.getElementById('add-np');
const newProductImg = document.getElementById('np-image').value;
const newProductName = document.getElementById('np-name').value;
const newProductDescription = document.getElementById('np-description').value;
const newProductPrice = document.getElementById('np-price').value;
const newProductSize = document.getElementById('np-size').value;
const newProductStock = document.getElementById('np-stock').value;
const newProductId = document.getElementById('np-id').value;
const newProductCategory = document.getElementById('np-category').value;
const editProductItem = document.getElementById('edit-np');
const editProductImg = document.getElementById('edit-np-image');
const editProductName = document.getElementById('edit-np-name');
const editProductDescription = document.getElementById('edit-np-description');
const editProductPrice = document.getElementById('edit-np-price');
const editProductSize = document.getElementById('edit-np-size');
const editProductStock = document.getElementById('edit-np-stock');
const editProductId = document.getElementById('edit-np-id');
const editProductCategory = document.getElementById('edit-np-category');


// ADD ALL PRODUCTS FROM JSON - in table from ADMIN Page
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
                            <td class="p-price">${product.price}</td>
                            <td class="p-stock">${product.stock}</td>
                            <td style="display: none;">${product.id}</td>
                            <td class="p-remove"><button id="${product.id}"><i class="far fa-trash-alt"></i></button></td>
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
    addNewProductItem.classList.add('show-table');
    manageProducts.classList.add('hide-table');
    allProducts.classList.add('hide-table');
    // manageProducts.classList.remove('show-div-flex');
    // allProducts.classList.remove('show-div-flex');
 
}

