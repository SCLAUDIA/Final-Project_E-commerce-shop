class UI{
    constructor (){
        this.productDiv = document.getElementById('product');
        this.title = document.getElementById('title');
        this.price = document.getElementById('price');
        this.image = document.getElementById('image');
        this.description = document.getElementById('description');
        this.category = document.getElementById('category');
        this.detailsCardPageDiv =document.getElementById('detailsCardPage'); 
        this.cartListDiv = document.querySelector(".table-cart");
    }

// SHOW ALL PRODUCTS
    showProducts(product){
    let output = '';
    product.forEach(product => {
        output += `
        <div class="product-single-item">
            <div class="product-content">
                <div class="product-img">
                <img src="${product.image}" alt="boot-image">
                    <br><br>
                </div>
                <div class="product-btn">
                    <button onclick="window.location.href='details.html?id=${product.id}'" type="button" class="details-cart"><i class="far fa-eye"></i> View details</button>
                </div>
            </div>
            <div class="product-info">
            <div class="product-info-title">
                    <h3>${product.title}</h3>
                </div>
                <div class="product-info-stock">
                    <p>${product.stock}</p>
                </div>
                <div class="product-info-price">
                    <p>${product.price} €</p>
                </div>
            </div>
        </div>
        `;
        this.productDiv.innerHTML=output;
    })
    }

// SHOW SNOWBOARDING PRODUCTS
    showSnowboardingProducts(product){
        let output = '';
        product.forEach((product) => {
            if (product.category == "snowboard"){
                output += `
                <div class="product-single-item">
                    <div class="product-content">
                        <div class="product-img">
                        <img src="${product.image}" alt="boot-image">
                            <br><br>
                        </div>
                        <div class="product-btn">
                            <button onclick="window.location.href='details.html?id=${product.id}'" type="button" class="details-cart"><i class="far fa-eye"></i> View details</button>
                        </div>
                    </div>
                    <div class="product-info">
                    <div class="product-info-title">
                            <h3>${product.title}</h3>
                        </div>
                        <div class="product-info-stock">
                            <p>${product.stock}</p>
                        </div>
                        <div class="product-info-price">
                            <p>${product.price} €</p>
                        </div>
                    </div>
                </div>
                `;
                this.productDiv.innerHTML=output;
            } 
            
        })
    }

// SHOW SKIING PRODUCTS
    showSkiingProducts(product){
        let output = '';
        product.forEach((product) => {
            if (product.category == "ski"){
                output += `
                <div class="product-single-item">
                    <div class="product-content">
                        <div class="product-img">
                        <img src="${product.image}" alt="boot-image">
                            <br><br>
                        </div>
                        <div class="product-btn">
                            <button onclick="window.location.href='details.html?id=${product.id}'" type="button" class="details-cart"><i class="far fa-eye"></i> View details</button>
                        </div>
                    </div>
                    <div class="product-info">
                    <div class="product-info-title">
                            <h3>${product.title}</h3>
                        </div>
                        <div class="product-info-stock">
                            <p>${product.stock}</p>
                        </div>
                        <div class="product-info-price">
                            <p>${product.price} €</p>
                        </div>
                    </div>
                </div>
                `;
            this.productDiv.innerHTML=output;
            } 
        })
    }

// SHOW ACCESSORIES PRODUCTS
    showAccessoriesProducts(product){
        let output = '';
        product.forEach((product) => {
            if (product.category == "accessories"){
                output += `
                <div class="product-single-item">
                    <div class="product-content">
                        <div class="product-img">
                        <img src="${product.image}" alt="boot-image">
                            <br><br>
                        </div>
                        <div class="product-btn">
                            <button onclick="window.location.href='details.html?id=${product.id}'" type="button" class="details-cart"><i class="far fa-eye"></i> View details</button>
                        </div>
                    </div>
                    <div class="product-info">
                    <div class="product-info-title">
                            <h3>${product.title}</h3>
                        </div>
                        <div class="product-info-stock">
                            <p>${product.stock}</p>
                        </div>
                        <div class="product-info-price">
                            <p>${product.price} €</p>
                        </div>
                    </div>
                </div>
                `;
            this.productDiv.innerHTML=output;
            } 
        })
    }

// SHOW DETAILS PRODUCTS
    showDetails(product){
        let output = '';  
        output = `
        <div class="details-card-wrapper">
            <div class="details-card">
                <div class="product-image">
                    <div class="image-display">
                        <div class="image-showcase">
                            <img src="${product.image}" alt="product-photo">
                        </div>
                    </div>
                </div>
            </div>                  
            <div class="details-right-section">
                <div class="product-title">
                    <h2>${product.title}</h2>
                </div>
                <div class="product-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
                <div class="product-stock">
                    <small>${product.stock}</small>
                </div>
                <div class="purchase-info">
                    
                       
                    <br>
                    <button type="button" class="details-btn-cart" data-id=${product.id}>Add to cart
                        
                    </button>
                </div>
                <div class="product-price">
                    <p>${product.price} €</p>
                </div>
                <div class="product-details">
                    <h2>Product description</h2>
                    <p>${product.description}</p>
                    <small>Category: <span>${product.category}</span></small>
                </div>        
            </div>              
        </div>`;
        this.detailsCardPageDiv.innerHTML=output;
    }

// SAVE PRODUCTS IN LS
    saveProductsInLocalStorage(products){
        localStorage.setItem("products", JSON.stringify(products));
    }

// GET PRODUCTS FROM LS
    getProductsFromLocalStorage(id){
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id);
    }

// SAVE CART IN LS
    saveCart(cart){
        localStorage.setItem('cart', JSON.stringify(cart))
    }

// GET CART ITEMS FROM LS
    getCart(){
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    }

}





    
// export const storage = new Storage();
export const ui = new UI();

