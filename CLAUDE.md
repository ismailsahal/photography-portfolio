# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a photography portfolio website designed to showcase and sell photography prints. The project is a multi-page static website using vanilla HTML, CSS, and JavaScript with a complete e-commerce shopping cart system and Stripe integration.

## Architecture

- **Multi-page Frontend**: Static website with multiple pages and no backend dependencies
- **Gallery System**: JavaScript-driven photo gallery with filtering and lightbox functionality
- **Complete E-commerce System**: Full shopping cart with localStorage persistence and Stripe payment integration
- **Admin Panel**: Password-protected interface for photo management
- **Responsive Design**: Mobile-first approach using CSS Grid and Flexbox

## Project Structure

```
├── index.html              # Main gallery page with hero, gallery, about, contact
├── cart.html              # Shopping cart and checkout page
├── admin.html             # Admin panel for photo management
├── assets/
│   ├── css/
│   │   ├── styles.css     # Main responsive styles
│   │   └── cart.css       # Cart-specific styles
│   ├── js/
│   │   ├── script.js      # Main gallery functionality and cart integration
│   │   └── cart.js        # Cart page functionality and checkout flow
│   └── images/
│       ├── landscape/     # Landscape photography assets
│       └── street/        # Street photography assets
├── process-images.bat     # Batch script for image processing
├── edit-photo-data.ps1    # PowerShell script for photo data management
└── pngImagesToConvert/    # Temporary folder for image processing
```

## Key Features

### Gallery System
- Photo filtering by category (All, Landscape, Street)
- Lightbox modal with navigation
- Print size selection (8x10, 11x14, 16x20)
- Add to cart functionality from lightbox

### Shopping Cart System
- localStorage-based cart persistence
- Cart count display in navigation
- Full cart management (add, remove, quantity)
- Cross-tab synchronization

### E-commerce Integration
- **Stripe Elements**: Card payment processing (demo mode)
- **Checkout Flow**: Customer information and shipping address collection
- **Order Management**: Success confirmation and cart clearing
- **Print Options**: Multiple sizes with dynamic pricing

### Admin Panel
- **Password Protection**: Default password "photo2025"
- **Photo Management**: Edit titles, descriptions, and prices
- **Code Export**: Generate updated JavaScript for photo data
- **Local Storage**: Changes persist in browser until exported

## Development Commands

Since this is a static website, no build process is required. Simply open `index.html` in a browser for development.

For production deployment:
- Update Stripe publishable keys in `assets/js/script.js` and `assets/js/cart.js`
- All assets should be optimized
- Images should be compressed and sized appropriately
- Consider using a CDN for image delivery

## Gallery Data Structure

Photos are managed in the `photos` array in `assets/js/script.js`:
```javascript
{
  id: unique_id,
  src: "assets/images/category/filename.jpg",
  title: "Photo Title",
  category: "landscape|street",
  price: "$50",
  description: "Photo description"
}
```

## Cart Data Structure

Cart items are stored in localStorage as:
```javascript
{
  photoId: number,
  photoTitle: string,
  photoSrc: string,
  printSize: "8x10|11x14|16x20",
  price: number,
  quantity: number
}
```

## Recent Development Status

### ✅ Completed Features:
- Complete shopping cart system with localStorage persistence
- Stripe Elements integration (demo mode)
- Cart navigation and localStorage handling
- Add to cart button functionality
- Shipping address collection to payment form
- Admin panel for photo management with password protection

### 🆕 Latest Session Progress (Current):
- **Mobile UX Optimization**: Complete mobile lightbox redesign with proper scaling and scrolling
- **Dynamic Pricing System**: Removed hardcoded $50 prices, now uses print size selection (8x10-$25, 11x14-$35, 16x20-$50)
- **Navigation Improvements**: Clickable logo button across all pages with smooth scroll to home
- **Mobile Menu Fixes**: Properly centered cart button in hamburger menu
- **Branch Management**: Development work on `mobile-lightbox-fix` branch, main branch contains stable Node.js integration

### ✅ Previous Session Achievements:
- **Node.js Backend Server**: Complete Express.js server with Stripe integration  
- **Payment Processing**: Server-side payment intent creation endpoint
- **Environment Configuration**: Secure API key management with .env
- **Frontend Integration**: Updated JavaScript to connect to backend server
- **CORS Configuration**: Proper cross-origin setup for development and production
- **Custom Domain Setup**: Guidance for Netlify deployment with custom domain
- **Documentation**: Complete README with setup and deployment instructions

## Current Development Status

### 🚧 Active Development Branch: `mobile-lightbox-fix`
The project is currently on a development branch with the following improvements:

#### Mobile Responsiveness Enhancements:
- **Lightbox Mobile Fix**: Fixed scaling and scrolling issues on mobile devices
  - Changed from horizontal to vertical layout on mobile screens
  - Added proper image scaling with `max-height: 50vh`
  - Enabled touch-friendly scrolling with overflow handling
  
#### UI/UX Improvements:
- **Dynamic Pricing**: Removed all hardcoded "$50" price displays
  - Gallery items show only title and description
  - Pricing handled entirely through print size selection in lightbox
  - Clean, professional appearance without confusing price tags

- **Navigation Enhancements**: 
  - "Ismail Sahal" logo is now clickable on all pages
  - Smooth scroll to home section on index.html
  - Direct link to index.html from cart.html
  - Mobile hamburger menu cart button properly centered

#### Branch Status:
- ✅ **Main Branch**: Contains stable Node.js backend integration, ready for production
- 🚧 **mobile-lightbox-fix**: Contains latest mobile UX improvements, ready for testing/merge
- 📋 **Next**: Merge mobile improvements back to main after testing

## Technical Implementation

### Backend Architecture (`server.js`):
- **Express.js Server** on port 3001
- **Stripe Payment Intents API** for secure payment processing
- **CORS enabled** for frontend-backend communication
- **Environment variable security** for API keys
- **Health check endpoint** for monitoring
- **Webhook support** for payment event handling

### Payment Flow:
1. Frontend collects customer and payment information
2. Creates payment intent via `/create-payment-intent` endpoint
3. Stripe Elements handles secure card processing
4. Server confirms payment and handles success/failure

### Environment Variables:
```
STRIPE_SECRET_KEY=sk_test_... (from Stripe Dashboard)
STRIPE_PUBLISHABLE_KEY=pk_test_... (from Stripe Dashboard)
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:8080
```

## Development Workflow

### Local Development:
1. `npm install` - Install dependencies
2. Configure `.env` with Stripe test keys
3. `npm run dev` - Start development server
4. Open `index.html` in browser for frontend

### Testing:
- Use Stripe test card numbers (4242 4242 4242 4242)
- Server health check: `http://localhost:3001/health`
- Payment processing endpoint: `http://localhost:3001/create-payment-intent`

## Next Steps for Production

### Immediate (Ready to Deploy):
1. **Get Stripe Account**: Sign up and get test API keys
2. **Test Payment Flow**: Verify complete checkout process
3. **Custom Domain**: Already configured for Netlify deployment

### Production Deployment:
1. **Server Hosting**: Deploy Node.js server (Heroku, Railway, or Netlify Functions)
2. **Live Stripe Keys**: Switch from test to production keys
3. **Environment Variables**: Set production secrets in hosting platform
4. **CORS Update**: Add production domain to allowed origins
5. **SSL Certificate**: Ensure HTTPS for payment security

### Future Enhancements:
1. **Order Management**: Database for order tracking
2. **Email Notifications**: Automated confirmation emails
3. **Print Fulfillment**: Integration with printing service
4. **Inventory Management**: Stock tracking system
5. **Analytics**: Sales and performance tracking