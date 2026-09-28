const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 1499,
        icon: "🎧"
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 2299,
        icon: "⌚"
    },
    {
        id: 3,
        name: "Classic T-Shirt",
        category: "Fashion",
        price: 699,
        icon: "👕"
    },
    {
        id: 4,
        name: "Denim Jacket",
        category: "Fashion",
        price: 1599,
        icon: "🧥"
    },
    {
        id: 5,
        name: "Face Serum",
        category: "Beauty",
        price: 599,
        icon: "🧴"
    },
    {
        id: 6,
        name: "Makeup Kit",
        category: "Beauty",
        price: 999,
        icon: "💄"
    },
    {
        id: 7,
        name: "Travel Backpack",
        category: "Accessories",
        price: 1299,
        icon: "🎒"
    },
    {
        id: 8,
        name: "Sunglasses",
        category: "Accessories",
        price: 799,
        icon: "🕶️"
    }
];


let cart = JSON.parse(localStorage.getItem("cartifyCart")) || [];

let selectedCategory = "All";


const productsContainer =
    document.getElementById("productsContainer");

const searchInput =
    document.getElementById("searchInput");

const sortFilter =
    document.getElementById("sortFilter");

const cartBtn =
    document.getElementById("cartBtn");

const cartSidebar =
    document.getElementById("cartSidebar");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const themeToggle =
    document.getElementById("themeToggle");


/* Display Products */

function displayProducts() {

    const searchText =
        searchInput.value.toLowerCase();

    let filteredProducts = products.filter(product => {

        const matchesSearch =
            product.name.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });


    /* Sort */

    if (sortFilter.value === "low") {

        filteredProducts.sort(
            (a, b) => a.price - b.price
        );

    }

    if (sortFilter.value === "high") {

        filteredProducts.sort(
            (a, b) => b.price - a.price
        );

    }


    productsContainer.innerHTML = "";


    if (filteredProducts.length === 0) {

        productsContainer.innerHTML = `
            <p>No products found.</p>
        `;

        return;
    }


    filteredProducts.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">
                ${product.icon}
            </div>

            <p class="product-category">
                ${product.category}
            </p>

            <h3>
                ${product.name}
            </h3>

            <div class="product-price">
                ₹${product.price}
            </div>

            <button
                class="add-cart-btn"
                onclick="addToCart(${product.id})"
            >
                🛒 Add to Cart
            </button>

        `;


        productsContainer.appendChild(card);

    });

}


/* Add to Cart */

function addToCart(id) {

    const existingItem =
        cart.find(item => item.id === id);


    if (existingItem) {

        existingItem.quantity++;

    } else {

        const product =
            products.find(product => product.id === id);

        cart.push({
            ...product,
            quantity: 1
        });

    }


    saveCart();

    updateCart();

}


/* Save Cart */

function saveCart() {

    localStorage.setItem(
        "cartifyCart",
        JSON.stringify(cart)
    );

}


/* Update Cart */

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    }


    cart.forEach(item => {

        total += item.price * item.quantity;

        count += item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.style.marginBottom = "20px";


        cartItem.innerHTML = `

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                gap:10px;
            ">

                <div>

                    <strong>
                        ${item.icon} ${item.name}
                    </strong>

                    <p>
                        ₹${item.price} × ${item.quantity}
                    </p>

                </div>

                <div>

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>

                    <span style="margin:0 8px;">
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent = count;

    cartTotal.textContent =
        `₹${total}`;

}


/* Change Quantity */

function changeQuantity(id, amount) {

    const item =
        cart.find(item => item.id === id);

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(item => item.id !== id);

    }


    saveCart();

    updateCart();

}


/* Open Cart */

cartBtn.addEventListener("click", () => {

    cartSidebar.classList.add("active");

    cartOverlay.classList.add("active");

});


/* Close Cart */

closeCart.addEventListener("click", closeCartPanel);

cartOverlay.addEventListener("click", closeCartPanel);


function closeCartPanel() {

    cartSidebar.classList.remove("active");

    cartOverlay.classList.remove("active");

}


/* Search */

searchInput.addEventListener(
    "input",
    displayProducts
);


/* Sort */

sortFilter.addEventListener(
    "change",
    displayProducts
);


/* Categories */

document
    .querySelectorAll(".category-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".category-btn")
                .forEach(btn =>
                    btn.classList.remove("active")
                );

            button.classList.add("active");

            selectedCategory =
                button.dataset.category;
                console.log("Selected Category:", selectedCategory);

            displayProducts();

        });

    });


/* Theme */

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (
        document.body.classList.contains("dark-mode")
    ) {

        themeToggle.textContent = "☀️";

    } else {

        themeToggle.textContent = "🌙";

    }

});


/* Shop Now */

function scrollToProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* Initial Load */

displayProducts();

updateCart();
function goToCheckout() {
    window.location.href = "checkout.html";
}