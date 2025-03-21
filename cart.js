
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceContainer.textContent = "Total: ₹0";
        document.getElementById('checkout-button').style.display = 'none'; 
    } else {
        let cartProduct = '';
        let totalPrice = 0;

        cartItems.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            cartProduct += `
                <div class="cart-item">
                    <span>${item.name} - ₹${item.price} x ${item.quantity} = ₹${itemTotal}</span>
                    <button onclick="removeItem(${index})">Remove</button>
                </div>
            `;
        });

        cartProduct += '</ul>';
        cartItemsContainer.innerHTML = cartProduct;
        totalPriceContainer.textContent = `Total: ₹${totalPrice}`;
        document.getElementById('checkout-button').style.display = 'block'; // Show checkout button if cart has items
    }
}

// Function to remove an item from the cart
function removeItem(index) {
    cartItems.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update localStorage
    displayCartItems(); // Refresh the cart display
    updateCartCount(); // Update the cart count on all pages
    alert('Item removed from cart!');
}

// Function to handle checkout
function checkout() {
    if (cartItems.length === 0) {
        alert('Your cart is empty. Add items to proceed to checkout.');
    } else {
        alert('Thank you for your purchase! Your order has been placed.');
        localStorage.removeItem('cartItems'); // Clear the cart after checkout
        window.location.href = 'index.html'; // Redirect to the home page or a confirmation page
    }
}

// Function to update the cart count on all pages
function updateCartCount() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    document.getElementById('cart-count').textContent = cartItems.length;
}

// Display cart items on page load
document.addEventListener('DOMContentLoaded', displayCartItems);

function checkout() {
    if (cartItems.length === 0) {
        alert('Your cart is empty. Add items to proceed to checkout.');
    } else {
        window.location.href = 'booking_form.html'; // Redirect to a checkout page
    }
}

