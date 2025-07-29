// Cart Page JavaScript

let cart = JSON.parse(localStorage.getItem('photographyCart')) || [];
let stripe;
let elements;
let cardElement;

// Initialize Stripe (gets key from server)
async function initializeStripe() {
    try {
        // Get publishable key from server
        const response = await fetch('/config');
        const { publishableKey } = await response.json();
        
        stripe = Stripe(publishableKey);
        elements = stripe.elements();
    } catch (error) {
        console.error('Error initializing Stripe:', error);
        // Fallback to hardcoded key for development
        stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY_HERE');
        elements = stripe.elements();
    }
    
    cardElement = elements.create('card', {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
        },
    });
}

// Update cart count in navigation
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.setAttribute('data-count', totalItems);
    }
}

// Calculate cart total
function calculateCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Remove item from cart
function removeFromCart(photoId, printSize) {
    cart = cart.filter(item => !(item.photoId === photoId && item.printSize === printSize));
    localStorage.setItem('photographyCart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

// Render cart items
function renderCart() {
    const cartEmpty = document.getElementById('cart-empty');
    const cartItems = document.getElementById('cart-items');
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
        cartItems.style.display = 'none';
        document.getElementById('checkout-section').style.display = 'none';
        return;
    }
    
    cartEmpty.style.display = 'none';
    cartItems.style.display = 'block';
    
    // Render cart items
    cartList.innerHTML = '';
    cart.forEach((item, index) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.photoSrc}" alt="${item.photoTitle}" class="cart-item-image">
            <div class="cart-item-details">
                <h4>${item.photoTitle}</h4>
                <p>Print Size: ${item.printSize}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <div class="cart-item-price">$${item.price * item.quantity}</div>
            <button class="remove-item" onclick="removeFromCart(${item.photoId}, '${item.printSize}')">
                Remove
            </button>
        `;
        cartList.appendChild(cartItemElement);
    });
    
    // Update total
    const total = calculateCartTotal();
    cartTotal.textContent = `$${total}`;
    
    // Add proceed to checkout button
    let proceedBtn = document.getElementById('proceed-checkout');
    if (!proceedBtn) {
        proceedBtn = document.createElement('button');
        proceedBtn.id = 'proceed-checkout';
        proceedBtn.className = 'proceed-checkout';
        proceedBtn.textContent = 'Proceed to Checkout';
        proceedBtn.addEventListener('click', showCheckout);
        document.querySelector('.cart-summary').appendChild(proceedBtn);
    }
}

// Show checkout form
function showCheckout() {
    document.getElementById('cart-items').style.display = 'none';
    document.getElementById('checkout-section').style.display = 'block';
    
    // Mount Stripe card element
    if (!cardElement._mounted) {
        cardElement.mount('#card-element');
        cardElement._mounted = true;
    }
    
    setupCheckoutForm();
}

// Setup checkout form
function setupCheckoutForm() {
    const backBtn = document.getElementById('back-to-cart');
    const checkoutForm = document.getElementById('checkout-form');
    const cardErrors = document.getElementById('card-errors');
    
    // Back to cart
    backBtn.addEventListener('click', () => {
        document.getElementById('checkout-section').style.display = 'none';
        document.getElementById('cart-items').style.display = 'block';
    });
    
    // Handle real-time validation errors from the card Element
    cardElement.on('change', ({error}) => {
        if (error) {
            cardErrors.textContent = error.message;
        } else {
            cardErrors.textContent = '';
        }
    });
    
    // Handle form submission
    checkoutForm.addEventListener('submit', handleCheckout);
}

// Handle checkout submission
async function handleCheckout(event) {
    event.preventDefault();
    
    const submitButton = document.getElementById('place-order');
    const buttonText = document.getElementById('button-text');
    const spinner = document.getElementById('spinner');
    const cardErrors = document.getElementById('card-errors');
    
    // Disable button and show loading
    submitButton.disabled = true;
    buttonText.style.display = 'none';
    spinner.classList.remove('hidden');
    
    // Get form data
    const customerName = document.getElementById('customer-name').value;
    const customerEmail = document.getElementById('customer-email').value;
    const addressLine1 = document.getElementById('address-line1').value;
    const addressLine2 = document.getElementById('address-line2').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const postalCode = document.getElementById('postal-code').value;
    const country = document.getElementById('country').value;
    
    // Validate form
    if (!customerName || !customerEmail || !addressLine1 || !city || !state || !postalCode || !country) {
        cardErrors.textContent = 'Please fill in all required fields.';
        resetButton();
        return;
    }
    
    if (country === 'OTHER') {
        cardErrors.textContent = 'Please contact us directly for international shipping to your location.';
        resetButton();
        return;
    }
    
    const total = calculateCartTotal();
    const amount = total * 100; // Convert to cents
    
    try {
        // Create payment intent on your server
        const response = await createPaymentIntent(amount, customerEmail, {
            cart: cart,
            customerName: customerName,
            shippingAddress: {
                line1: addressLine1,
                line2: addressLine2,
                city: city,
                state: state,
                postal_code: postalCode,
                country: country
            }
        });
        
        if (response.error) {
            throw new Error(response.error);
        }
        
        // Confirm payment with Stripe
        const result = await stripe.confirmCardPayment(response.clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: customerName,
                    email: customerEmail,
                    address: {
                        line1: addressLine1,
                        line2: addressLine2,
                        city: city,
                        state: state,
                        postal_code: postalCode,
                        country: country,
                    }
                },
            }
        });
        
        if (result.error) {
            cardErrors.textContent = result.error.message;
        } else {
            // Payment succeeded
            showOrderSuccess();
        }
    } catch (error) {
        cardErrors.textContent = error.message || 'An unexpected error occurred.';
    }
    
    resetButton();
}

// Reset button state
function resetButton() {
    const submitButton = document.getElementById('place-order');
    const buttonText = document.getElementById('button-text');
    const spinner = document.getElementById('spinner');
    
    submitButton.disabled = false;
    buttonText.style.display = 'inline';
    spinner.classList.add('hidden');
}

// Show order success
function showOrderSuccess() {
    document.getElementById('checkout-section').style.display = 'none';
    document.getElementById('order-success').style.display = 'block';
    
    // Clear cart
    cart = [];
    localStorage.setItem('photographyCart', JSON.stringify(cart));
    updateCartCount();
}

// Create payment intent
async function createPaymentIntent(amount, email, metadata) {
    try {
        const response = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: amount,
                currency: 'usd',
                customer_email: email,
                metadata: metadata
            }),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Server error');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error creating payment intent:', error);
        return { error: error.message };
    }
}

// Mobile navigation toggle
function toggleMobileNav() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    navMenu.classList.toggle('active');
}

// Refresh cart data from localStorage
function refreshCartData() {
    const cartData = localStorage.getItem('photographyCart');
    
    if (cartData) {
        try {
            cart = JSON.parse(cartData);
        } catch (error) {
            console.error('Error parsing cart data:', error);
            cart = [];
        }
    } else {
        cart = [];
    }
    
    updateCartCount();
    renderCart();
}

// Listen for storage changes (when cart is updated from other tabs/pages)
window.addEventListener('storage', (e) => {
    if (e.key === 'photographyCart') {
        refreshCartData();
    }
});

// Initialize cart page
document.addEventListener('DOMContentLoaded', async () => {
    refreshCartData();
    await initializeStripe();
    
    // Setup mobile navigation
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileNav);
    }
});

// Also refresh when page becomes visible (for when user returns to tab)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        refreshCartData();
    }
});