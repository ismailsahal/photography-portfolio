const express = require('express');
const cors = require('cors');
const stripe = require('stripe');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Initialize Stripe with secret key
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

// Middleware
app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://127.0.0.1:8080',
    'https://your-domain.com', // Replace with your actual domain
    'https://your-netlify-app.netlify.app' // Replace with your Netlify URL
  ]
}));
app.use(express.json());

// Serve static files (for local development)
app.use(express.static('.'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Create payment intent endpoint
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd', customer_email, metadata } = req.body;

    // Validate required fields
    if (!amount || amount < 50) { // Minimum $0.50
      return res.status(400).json({ 
        error: 'Invalid amount. Minimum charge is $0.50' 
      });
    }

    if (!customer_email) {
      return res.status(400).json({ 
        error: 'Customer email is required' 
      });
    }

    // Create payment intent
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: Math.round(amount), // Ensure integer (cents)
      currency: currency,
      receipt_email: customer_email,
      metadata: {
        customer_email: customer_email,
        ...metadata
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Log the transaction for debugging
    console.log(`Payment Intent created: ${paymentIntent.id} for $${amount/100} to ${customer_email}`);

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ 
      error: error.message || 'An error occurred processing the payment' 
    });
  }
});

// Webhook endpoint for Stripe events (optional but recommended)
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // You'll need to set this webhook secret in your .env file
    // event = stripeInstance.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    
    // For now, just parse the event
    event = JSON.parse(req.body);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`Payment succeeded: ${paymentIntent.id}`);
      // Here you would typically:
      // - Send confirmation email
      // - Update database
      // - Trigger order fulfillment
      break;
    case 'payment_intent.payment_failed':
      console.log(`Payment failed: ${event.data.object.id}`);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({received: true});
});

// Get Stripe publishable key (for frontend)
app.get('/config', (req, res) => {
  res.json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Photography Portfolio Server running on port ${port}`);
  console.log(`📧 Health check: http://localhost:${port}/health`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  if (!process.env.STRIPE_SECRET_KEY) {
    console.warn('⚠️  Warning: STRIPE_SECRET_KEY not found in environment variables');
  }
});

module.exports = app;