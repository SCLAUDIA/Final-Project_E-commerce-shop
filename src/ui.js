class UI{
    constructor (){
        this.productDiv = document.getElementById('product');
        this.title = document.getElementById('title');
        this.price = document.getElementById('price');
        this.image = document.getElementById('image');
        this.description = document.getElementById('description');
        this.category = document.getElementById('category');
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
                    <button onclick="window.location.href='details.html'" type="button" class="btn-cart details-cart">View details</button>
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
                            <button onclick="window.location.href='details.html'" type="button" class="btn-cart details-cart">View details</button>
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
                            <button onclick="window.location.href='details.html'" type="button" class="btn-cart details-cart">View details</button>
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
                            <button onclick="window.location.href='details.html'" type="button" class="btn-cart details-cart">View details</button>
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
                            <button onclick="window.location.href='details.html'" type="button" class="btn-cart details-cart">View details</button>
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
}
export const ui = new UI();


