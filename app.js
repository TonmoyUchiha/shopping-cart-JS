const productList = document.getElementById('product-list');
const cartCount = document.getElementById('cart-count');
const subtotalPrice = document.getElementById('subtotal-price');
const totalPrice = document.getElementById('total-price');
const shippingOptions = document.getElementById('shipping-options');
const cartSummaryItems = document.getElementById('cart-summary-items');
const checkoutButton = document.querySelector('.checkout');
const errorMessage = document.getElementById('error-message');

let cart = [];

// Fetch products and display them
fetch('products.json')
    .then(response => response.json())
    .then(products => {
        displayProducts(products);
    })
    .catch(err => {
        console.error('Error fetching products:', err);
        alert('Failed to load products. Please try again later.');
    });

function displayProducts(products) {
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const imageUrl = `https://via.placeholder.com/60?text=${encodeURIComponent(product.name)}`;

        productCard.innerHTML = `
            <img src="${imageUrl}" alt="${product.name}">
            <div class="product-details">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>$${product.price.toFixed(2)}</p>
            </div>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productList.appendChild(productCard);
    });
}

function addToCart(productId) {
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            updateCart();
        })
        .catch(err => {
            console.error('Error adding to cart:', err);
            alert('Failed to add item to cart. Please try again.');
        });
}

function updateCart() {
    cartSummaryItems.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;

        const cartItem = document.createElement('li');
        cartItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        cartSummaryItems.appendChild(cartItem);
    });

    cartCount.textContent = cart.length;
    subtotalPrice.textContent = `$${subtotal.toFixed(2)}`;
    totalPrice.textContent = `$${(subtotal + parseFloat(shippingOptions.value)).toFixed(2)}`;
}

// Prevent checkout if cart is empty
checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        errorMessage.style.display = 'block';
    } else {
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('shipping', shippingOptions.value);
        window.location.href = 'checkout.html';
    }
});

shippingOptions.addEventListener('change', updateCart);
