let cart =
    JSON.parse(localStorage.getItem("cartifyCart")) || [];

const checkoutItems =
    document.getElementById("checkoutItems");

const checkoutTotal =
    document.getElementById("checkoutTotal");


function displayCheckoutItems() {

    checkoutItems.innerHTML = "";

    let total = 0;


    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p class="empty-checkout">
                Your cart is empty.
            </p>
        `;

        checkoutTotal.textContent = "₹0";

        return;
    }


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        const div =
            document.createElement("div");

        div.className = "checkout-item";


        div.innerHTML = `

            <div class="checkout-product">

                <span class="checkout-icon">
                    ${item.icon}
                </span>

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <p>
                        ₹${item.price} × ${item.quantity}
                    </p>

                </div>

            </div>

            <strong>
                ₹${itemTotal}
            </strong>

        `;


        checkoutItems.appendChild(div);

    });


    checkoutTotal.textContent =
        `₹${total}`;

}


function placeOrder() {

    const name =
        document.getElementById("fullName").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const address =
        document.getElementById("address").value.trim();

    const city =
        document.getElementById("city").value.trim();

    const pincode =
        document.getElementById("pincode").value.trim();


    if (
        !name ||
        !phone ||
        !address ||
        !city ||
        !pincode
    ) {

        alert("Please fill all delivery details.");

        return;
    }


    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    alert(
        "🎉 Order placed successfully!\n\nThank you for shopping with Cartify."
    );


    localStorage.removeItem("cartifyCart");

    window.location.href = "index.html";

}


displayCheckoutItems();