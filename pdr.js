function addToCart(productName, price) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const existingProduct = cartItems.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cartItems.push({ name: productName, price: price, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    updateCartCount();

    alert(`${productName} added to cart!`);
}
function updateCartCount() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    document.getElementById('cart-count').textContent = cartItems.length;
}
    document.addEventListener('DOMContentLoaded', updateCartCount);
