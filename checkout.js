const checkoutItems = document.getElementById('checkout-items');
const checkoutItemsCount = document.getElementById('checkout-items-count');
const checkoutSubtotal = document.getElementById('checkout-subtotal');
const checkoutShipping = document.getElementById('checkout-shipping');
const checkoutTotal = document.getElementById('checkout-total');
const confirmOrderButton = document.getElementById('confirm-order');

const cart = JSON.parse(localStorage.getItem('cart')) || [];
const shipping = parseFloat(localStorage.getItem('shipping')) || 5;

let subtotal = 0;

cart.forEach(item => {
    subtotal += item.price * item.quantity;

    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
    checkoutItems.appendChild(listItem);
});

checkoutItemsCount.textContent = cart.length;
checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
checkoutShipping.textContent = `$${shipping.toFixed(2)}`;
checkoutTotal.textContent = `$${(subtotal + shipping).toFixed(2)}`;

confirmOrderButton.addEventListener('click', () => {
    alert('Order confirmed! Thank you for shopping.');
    localStorage.clear();
    window.location.href = 'index.html';
});
