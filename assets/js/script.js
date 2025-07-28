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

// Purchase photo (Stripe integration placeholder)
function purchasePhoto(photo) {
    // This will be replaced with actual Stripe integration
    alert(`Purchase functionality coming soon! You selected: ${photo.title} for ${photo.price}`);
    
    // Stripe integration would look like this:
    // stripe.redirectToCheckout({
    //     lineItems: [{
    //         price: photo.stripePriceId,
    //         quantity: 1,
    //     }],
    //     mode: 'payment',
    //     successUrl: window.location.origin + '/success.html',
    //     cancelUrl: window.location.origin + '/cancel.html',
    // });
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
});
