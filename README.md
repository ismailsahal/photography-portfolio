# Photography Portfolio with E-commerce

A modern photography portfolio website with a complete e-commerce shopping cart system and Stripe payment integration.

## Features

- 📸 **Photo Gallery** with filtering and lightbox
- 🛒 **Shopping Cart** with localStorage persistence
- 💳 **Stripe Payment Processing** (test mode ready)
- 📱 **Responsive Design** for all devices
- 🔐 **Admin Panel** for photo management
- 🚀 **Deployable** to Netlify with custom domain

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Stripe
1. Create a [Stripe account](https://dashboard.stripe.com/register)
2. Get your test API keys from [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
3. Copy `.env` file and add your keys:
```bash
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open Your Site
- **Frontend**: Open `index.html` in your browser
- **Server**: Runs on http://localhost:3001
- **Health Check**: http://localhost:3001/health

## Project Structure

```
├── index.html              # Main gallery page
├── cart.html              # Shopping cart and checkout
├── admin.html             # Photo management panel
├── server.js              # Node.js backend for payments
├── package.json           # Dependencies and scripts
├── assets/
│   ├── css/               # Stylesheets
│   ├── js/                # Frontend JavaScript
│   └── images/            # Photo assets
└── .env                   # Environment variables (not in git)
```

## Admin Panel

Access the admin panel at `admin.html`:
- **Password**: `photo2025`
- **Features**: Edit photo titles, descriptions, prices
- **Export**: Generate updated JavaScript code

## Deployment

### Netlify Deployment
1. Deploy your site to Netlify
2. Set up custom domain in Domain Management
3. Set environment variables in Netlify dashboard
4. Update CORS origins in `server.js`

### Environment Variables for Production
```
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
```

## Testing Payments

Use Stripe test card numbers:
- **Success**: `4242 4242 4242 4242`
- **Declined**: `4000 0000 0000 0002`
- **Requires Authentication**: `4000 0025 0000 3155`

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload
- `npm test` - Run tests (not implemented yet)

## Photo Management

When adding new photos:
1. Resize images to 1200px width using the provided scripts
2. Organize into `assets/images/landscape/` or `assets/images/street/`
3. Use `admin.html` locally to update photo data
4. Copy the generated JavaScript code to `assets/js/script.js`
5. Deploy the updated files

## Support

For issues or questions, check the Stripe documentation or create an issue in this repository.

## License

MIT License - feel free to use for your own photography portfolio!