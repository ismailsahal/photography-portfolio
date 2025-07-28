// Your actual photo data
// Your actual photo data
// Your actual photo data
const photos = [
    {
        id: 1,
        src: 'assets/images/landscape/DSC_0173-1.jpg',
        title: 'River Through the City',
        category: 'landscape',
        price: '$50',
        description: 'A ferry passing throught the Chicago River'
    },
    {
        id: 2,
        src: 'assets/images/landscape/DSC_0299-1-2.jpg',
        title: 'A Storm is Coming',
        category: 'landscape',
        price: '$50',
        description: 'A stunning landscape capture showcasing the beauty of nature.'
    },
    {
        id: 3,
        src: 'assets/images/landscape/DSC_0302-1.jpg',
        title: 'The Red Bridge',
        category: 'landscape',
        price: '$50',
        description: 'A stunning landscape capture showcasing the beauty of nature.'
    },
    {
        id: 4,
        src: 'assets/images/landscape/DSC_0327-1-3.jpg',
        title: 'Layers of Stones',
        category: 'landscape',
        price: '$50',
        description: 'A stunning landscape capture showcasing the beauty of nature.'
    },
    {
        id: 5,
        src: 'assets/images/landscape/DSC_0374-1.jpg',
        title: 'Water is Blue',
        category: 'landscape',
        price: '$50',
        description: 'A stunning landscape capture showcasing the beauty of nature.'
    },
    {
        id: 6,
        src: 'assets/images/landscape/DSC_0550-1-2.jpg',
        title: 'The Moon Table',
        category: 'landscape',
        price: '$50',
        description: 'A stunning landscape capture showcasing the beauty of nature.'
    },
    {
        id: 7,
        src: 'assets/images/landscape/DSC_0566-1-4.jpg',
        title: 'High and Cold',
        category: 'landscape',
        price: '$50',
        description: 'A stunning landscape capture showcasing the beauty of nature.'
    },
    {
        id: 8,
        src: 'assets/images/landscape/DSC_0638-1-2.jpg',
        title: 'Hidden Lamp',
        category: 'landscape',
        price: '$50',
        description: 'A stunning landscape capture showcasing the beauty of nature.'
    },
    {
        id: 9,
        src: 'assets/images/street/DSC_0214-1.jpg',
        title: 'Jazz in the Park',
        category: 'street',
        price: '$50',
        description: 'Urban life captured in a candid street photography moment.'
    },
    {
        id: 10,
        src: 'assets/images/street/DSC_0524-1.jpg',
        title: 'Caged Memory',
        category: 'street',
        price: '$50',
        description: 'Urban life captured in a candid street photography moment.'
    },
    {
        id: 11,
        src: 'assets/images/street/DSC_0528-1.jpg',
        title: 'Modern Memory',
        category: 'street',
        price: '$50',
        description: 'Urban life captured in a candid street photography moment.'
    },
    {
        id: 12,
        src: 'assets/images/street/DSC_0771-1-2.jpg',
        title: 'Cold',
        category: 'street',
        price: '$50',
        description: 'Urban life captured in a candid street photography moment.'
    }
];

let currentPhotoIndex = 0;
let filteredPhotos = [...photos];

// DOM Elements
const galleryGrid = document.getElementById('galleryGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxPrice = document.getElementById('lightbox-price');
const buyBtn = document.getElementById('buyBtn');
const closeBtn = document.querySelector('.close');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Initialize gallery
function initGallery() {
    renderGallery(photos);
    setupEventListeners();
}

// Render gallery items
function renderGallery(photosToRender) {
    galleryGrid.innerHTML = '';
    photosToRender.forEach((photo, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${photo.src}" alt="${photo.title}" loading="lazy">
            <div class="gallery-item-info">
                <h3>${photo.title}</h3>
                <p>${photo.description}</p>
                <span class="price">${photo.price}</span>
            </div>
        `;
        galleryItem.addEventListener('click', () => openLightbox(index));
        galleryGrid.appendChild(galleryItem);
    });
}

// Filter functionality
function filterPhotos(category) {
    if (category === 'all') {
        filteredPhotos = [...photos];
    } else {
        filteredPhotos = photos.filter(photo => photo.category === category);
    }
    renderGallery(filteredPhotos);
}

// Open lightbox
function openLightbox(index) {
    currentPhotoIndex = index;
    const photo = filteredPhotos[currentPhotoIndex];
    
    lightboxImg.src = photo.src;
    lightboxTitle.textContent = photo.title;
    lightboxDescription.textContent = photo.description;
    lightboxPrice.textContent = photo.price;
    
    // Set up buy button with Stripe (placeholder)
    buyBtn.onclick = () => purchasePhoto(photo);
    
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Navigate lightbox
function navigateLightbox(direction) {
    if (direction === 'next') {
        currentPhotoIndex = (currentPhotoIndex + 1) % filteredPhotos.length;
    } else {
        currentPhotoIndex = currentPhotoIndex === 0 ? filteredPhotos.length - 1 : currentPhotoIndex - 1;
    }
    
    const photo = filteredPhotos[currentPhotoIndex];
    lightboxImg.src = photo.src;
    lightboxTitle.textContent = photo.title;
    lightboxDescription.textContent = photo.description;
    lightboxPrice.textContent = photo.price;
    buyBtn.onclick = () => purchasePhoto(photo);
}

// Stripe Elements Integration
let stripe;
let elements;
let cardElement;
let currentPhoto;

// Initialize Stripe (you'll need to replace with your publishable key)
function initializeStripe() {
    // Replace 'pk_test_...' with your actual Stripe publishable key
    stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY_HERE');
    elements = stripe.elements();
    
    // Create card element
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

// Cart Management
let cart = JSON.parse(localStorage.getItem('photographyCart')) || [];

// Update cart count in navigation
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.setAttribute('data-count', totalItems);
    }
}

// Add item to cart
function addToCart(photo, printSize, price) {
    const existingItem = cart.find(item => 
        item.photoId === photo.id && item.printSize === printSize
    );
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            photoId: photo.id,
            photoTitle: photo.title,
            photoSrc: photo.src,
            printSize: printSize,
            price: price,
            quantity: 1
        });
    }
    
    localStorage.setItem('photographyCart', JSON.stringify(cart));
    updateCartCount();
    
    // Debug log
    console.log('Added to cart:', {photo: photo.title, printSize, price});
    console.log('Cart now contains:', cart);
    
    // Show success message
    showAddToCartSuccess(photo.title, printSize);
}

// Show add to cart success message
function showAddToCartSuccess(photoTitle, printSize) {
    const successMsg = document.createElement('div');
    successMsg.className = 'cart-success-msg';
    successMsg.innerHTML = `
        <div style="background: #27ae60; color: white; padding: 1rem; border-radius: 4px; margin: 1rem 0; text-align: center;">
            ✅ Added "${photoTitle}" (${printSize}) to cart!
        </div>
    `;
    
    const lightboxInfo = document.querySelector('.lightbox-info');
    lightboxInfo.insertBefore(successMsg, lightboxInfo.firstChild);
    
    setTimeout(() => {
        successMsg.remove();
    }, 3000);
}

// Setup lightbox for add to cart
function purchasePhoto(photo) {
    currentPhoto = photo;
    setupAddToCartForm();
}

// Setup add to cart form event listeners
function setupAddToCartForm() {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const printOptions = document.querySelectorAll('input[name="lightbox-print-size"]');
    const selectedPriceSpan = document.getElementById('selected-price');
    
    console.log('Setting up add to cart form for:', currentPhoto.title);
    
    if (!addToCartBtn) {
        console.error('Add to cart button not found!');
        return;
    }
    
    // Remove any existing event listeners by cloning the button
    const newAddToCartBtn = addToCartBtn.cloneNode(true);
    addToCartBtn.parentNode.replaceChild(newAddToCartBtn, addToCartBtn);
    
    // Update price when selection changes
    printOptions.forEach(option => {
        option.addEventListener('change', () => {
            const price = option.dataset.price;
            selectedPriceSpan.textContent = `$${price}`;
        });
    });
    
    // Handle add to cart
    newAddToCartBtn.addEventListener('click', () => {
        console.log('Add to cart button clicked');
        const selectedOption = document.querySelector('input[name="lightbox-print-size"]:checked');
        const printSize = selectedOption.value;
        const price = parseInt(selectedOption.dataset.price);
        
        addToCart(currentPhoto, printSize, price);
    });
}

// Legacy function - will be removed when Stripe is moved to cart page
function setupPaymentForm() {
    const form = document.getElementById('payment-form');
    const submitButton = document.getElementById('submit-payment');
    const cancelButton = document.getElementById('cancel-payment');
    const cardErrors = document.getElementById('card-errors');
    
    // Handle real-time validation errors from the card Element
    cardElement.on('change', ({error}) => {
        if (error) {
            cardErrors.textContent = error.message;
        } else {
            cardErrors.textContent = '';
        }
    });
    
    // Handle form submission
    submitButton.addEventListener('click', handlePayment);
    
    // Handle cancel
    cancelButton.addEventListener('click', () => {
        hidePaymentForm();
    });
    
    // Update price when print size changes
    const printOptions = document.querySelectorAll('input[name="print-size"]');
    printOptions.forEach(option => {
        option.addEventListener('change', updatePrice);
    });
}

// Update price display
function updatePrice() {
    const selectedOption = document.querySelector('input[name="print-size"]:checked');
    const price = selectedOption.dataset.price;
    document.getElementById('lightbox-price').textContent = `$${price}`;
}

// Handle payment submission
async function handlePayment(event) {
    event.preventDefault();
    
    const submitButton = document.getElementById('submit-payment');
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
    const selectedPrint = document.querySelector('input[name="print-size"]:checked');
    const printSize = selectedPrint.value;
    const amount = parseInt(selectedPrint.dataset.price) * 100; // Convert to cents
    
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
    
    try {
        // Create payment intent on your server
        // For now, we'll simulate this with a placeholder
        const response = await createPaymentIntent(amount, customerEmail, {
            photoTitle: currentPhoto.title,
            printSize: printSize,
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
            showPaymentSuccess();
        }
    } catch (error) {
        cardErrors.textContent = error.message || 'An unexpected error occurred.';
    }
    
    resetButton();
}

// Reset button state
function resetButton() {
    const submitButton = document.getElementById('submit-payment');
    const buttonText = document.getElementById('button-text');
    const spinner = document.getElementById('spinner');
    
    submitButton.disabled = false;
    buttonText.style.display = 'inline';
    spinner.classList.add('hidden');
}

// Hide payment form
function hidePaymentForm() {
    document.getElementById('payment-form').style.display = 'none';
    document.getElementById('buyBtn').style.display = 'block';
    document.getElementById('card-errors').textContent = '';
    
    // Clear form fields
    document.getElementById('customer-name').value = '';
    document.getElementById('customer-email').value = '';
    document.getElementById('address-line1').value = '';
    document.getElementById('address-line2').value = '';
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';
    document.getElementById('postal-code').value = '';
    document.getElementById('country').value = '';
    
    // Reset print size to default
    document.querySelector('input[name="print-size"][value="8x10"]').checked = true;
}

// Show payment success
function showPaymentSuccess() {
    const paymentForm = document.getElementById('payment-form');
    paymentForm.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <h3 style="color: #27ae60; margin-bottom: 1rem;">✅ Payment Successful!</h3>
            <p>Thank you for your purchase. You'll receive an email confirmation shortly.</p>
            <button onclick="closeLightbox()" style="margin-top: 1rem; padding: 0.75rem 1.5rem; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
        </div>
    `;
}

// Create payment intent (placeholder - you'll need a server endpoint)
async function createPaymentIntent(amount, email, metadata) {
    // This is a placeholder - you'll need to implement this server-side
    // For testing, we'll return a dummy response
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                error: 'Payment processing requires a server. This is a demo version.',
            });
        }, 1000);
    });
    
    // Real implementation would look like:
    /*
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
    
    return await response.json();
    */
}

// Mobile navigation toggle
function toggleMobileNav() {
    navMenu.classList.toggle('active');
}

// Smooth scrolling for navigation links
function smoothScroll(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Close mobile menu if open
        navMenu.classList.remove('active');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            e.target.classList.add('active');
            // Filter photos
            filterPhotos(e.target.dataset.filter);
        });
    });
    
    // Lightbox controls
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => navigateLightbox('prev'));
    nextBtn.addEventListener('click', () => navigateLightbox('next'));
    
    // Close lightbox when clicking outside
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    navigateLightbox('prev');
                    break;
                case 'ArrowRight':
                    navigateLightbox('next');
                    break;
            }
        }
    });
    
    // Mobile navigation
    hamburger.addEventListener('click', toggleMobileNav);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-menu a, .cta-button').forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// Contact form handling
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            formStatus.style.display = 'none';
            
            try {
                const formData = new FormData(contactForm);
                const response = await fetch('/', {
                    method: 'POST',
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams(formData).toString()
                });
                
                if (response.ok) {
                    // Success
                    formStatus.className = 'form-status success';
                    formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                    formStatus.style.display = 'block';
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Error
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Sorry, there was an error sending your message. Please try again.';
                formStatus.style.display = 'block';
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    setupContactForm();
    updateCartCount(); // Initialize cart count display
});
