class UI{
    constructor (){
        this.productDiv = document.getElementById('product');
        this.title = document.getElementById('title');
        this.price = document.getElementById('price');
        this.image = document.getElementById('image');
        this.description = document.getElementById('description');
        this.category = document.getElementById('category');
        this.detailsCardPageDiv =document.getElementById('detailsCardPage'); 
    }

    // show all products
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
                    <button type="button" class="btn-cart">Add to cart
                        <span><i class="fas fa-shopping-cart"></i></span>
                    </button>
                    <button onclick="window.location.href='details.html?id=${product.id}'" type="button" class="btn-cart details-cart">View details</button>
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


    // show Snowboarding products
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
                            <button type="button" class="btn-cart">Add to cart
                                <span><i class="fas fa-shopping-cart"></i></span>
                            </button>
                            <button onclick="window.location.href='details.html?id=${product.id}'" type="button" class="btn-cart details-cart">View details</button>
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

    // show Skiing products
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
                            <button type="button" class="btn-cart">Add to cart
                                <span><i class="fas fa-shopping-cart"></i></span>
                            </button>
                            <button onclick="window.location.href='details.html?id=${product.id}'" type="button" class="btn-cart details-cart">View details</button>
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

        


    // show Accessories products
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
                            <button type="button" class="btn-cart">Add to cart
                                <span><i class="fas fa-shopping-cart"></i></span>
                            </button>
                            <button onclick="window.location.href='details.html?id=${product.id}'" type="button" class="btn-cart details-cart">View details</button>
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


    // show details product
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
                    <p>Size</p>
                    <input placeholder="Quantity" type="number" min='0' >
                        <select name="size" id="size">
                            <option>${product.size}</option>
                        </select>
                    <br>
                    <button type="button" class="details-btn-cart">Add to cart
                        <span><i class="fas fa-shopping-cart"></i></span>
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
     
}
        

    

export const ui = new UI();


