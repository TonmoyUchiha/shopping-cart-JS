const checkoutItems = document.getElementById('checkout-items');
const checkoutSubtotal = document.getElementById('checkout-subtotal');
const discountAmount = document.getElementById('discount-amount');
const finalTotal = document.getElementById('final-total');
const promoCodeInput = document.getElementById('promo-code-input');
const applyPromoCodeButton = document.getElementById('apply-promo-code');
const promoMessage = document.getElementById('promo-message');
const confirmOrderButton = document.getElementById('confirm-order'); // Confirm Order button

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let shipping = parseFloat(localStorage.getItem('shipping')) || 5;
let currentPromoCode = ''; // Track the currently applied promo code
let discount = 0;

// Display cart items and calculate totals
function updateSummary() {
    if (cart.length === 0) {
        checkoutItems.innerHTML = '<p>Your cart is empty.</p>';
        checkoutSubtotal.textContent = `$0.00`;
        discountAmount.textContent = `$0.00`;
        finalTotal.textContent = `$0.00`;
        return;
    }

    checkoutItems.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;

        const cartItem = document.createElement('li');
        cartItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        checkoutItems.appendChild(cartItem);
    });

    checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    discountAmount.textContent = `-$${discount.toFixed(2)}`;
    finalTotal.textContent = `$${(subtotal - discount + shipping).toFixed(2)}`;
}

// Validate and apply promo code
applyPromoCodeButton.addEventListener('click', () => {
    const promoCode = promoCodeInput.value.trim().toLowerCase();
    let subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (promoCode === currentPromoCode) {
        promoMessage.style.color = 'red';
        promoMessage.textContent = 'Promo code already applied!';
        promoMessage.style.display = 'block';
        return;
    }

    if (promoCode === 'ostad10') {
        discount = subtotal * 0.1; // 10% discount
        currentPromoCode = promoCode;
        promoMessage.style.color = 'green';
        promoMessage.textContent = 'Promo code applied: 10% discount!';
    } else if (promoCode === 'ostad5') {
        discount = subtotal * 0.05; // 5% discount
        currentPromoCode = promoCode;
        promoMessage.style.color = 'green';
        promoMessage.textContent = 'Promo code applied: 5% discount!';
    } else {
        promoMessage.style.color = 'red';
        promoMessage.textContent = 'Invalid promo code!';
        return;
    }

    promoMessage.style.display = 'block';
    updateSummary();
});

// Handle confirm order click
confirmOrderButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to your cart before placing an order.');
        return;
    }

    alert('Thank you! Your order has been placed successfully.');
    localStorage.removeItem('cart'); // Clear cart after order placement
    window.location.href = 'index.html'; // Redirect to Shopping Cart page
});


// Initialize summary on page load
updateSummary();
