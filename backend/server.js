const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
require('dotenv').config({ path: './config.env' });

const app = express();

// Check if we have valid Stripe keys
const hasValidStripeKeys = process.env.STRIPE_SECRET_KEY && 
  process.env.STRIPE_SECRET_KEY.startsWith('sk_test_') && 
  process.env.STRIPE_SECRET_KEY !== 'sk_test_your_stripe_test_secret_key_here';

let stripe = null;
if (hasValidStripeKeys) {
  stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  console.log('✅ Stripe initialized with test keys');
} else {
  console.log('⚠️  No valid Stripe test keys found. Running in demo mode.');
}

// Middleware
app.use(cors({
  origin: [
    'https://service.houseofcompanies.co.in',
    'http://localhost:5173',
    'http://localhost:3000',
    'https://houseofcompanies.co.in',
    'https://www.houseofcompanies.co.in'
  ],
  credentials: true
}));
app.use(express.json());

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Stripe backend is running',
    mode: hasValidStripeKeys ? 'stripe' : 'demo',
    frontendUrl: process.env.FRONTEND_URL
  });
});

// Test GET endpoint for debugging
app.get('/create-checkout-session', (req, res) => {
  res.json({ 
    error: 'This endpoint requires POST method',
    message: 'Use POST /create-checkout-session with amount in request body',
    example: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { amount: 10.00, currency: 'eur' }
    }
  });
});

// Create Stripe Checkout Session
app.post('/create-checkout-session', async (req, res) => {
  try {
    console.log('Received checkout request:', req.body);
    
    const { 
      amount, 
      currency = 'eur', 
      description = 'House of Companies Services',
      items = [],
      customerEmail = null 
    } = req.body;

    // Validate amount
    if (!amount || amount <= 0) {
      console.log('Invalid amount:', amount);
      return res.status(400).json({ 
        error: 'Invalid amount. Amount must be greater than 0.' 
      });
    }

    // If no valid Stripe keys, return demo response
    if (!hasValidStripeKeys) {
      console.log('Demo mode: Returning mock checkout session');
      return res.json({
        success: true,
        sessionId: 'cs_demo_' + Date.now(),
        url: 'https://demo.stripe.com/checkout?session_id=demo_' + Date.now(),
        demo: true,
        message: 'This is a demo. Please add your Stripe test keys to enable real payments.'
      });
    }

    // Convert amount to cents (Stripe expects amounts in smallest currency unit)
    const amountInCents = Math.round(amount * 100);
    console.log('Amount in cents:', amountInCents);

    // Prepare line items
    let lineItems = [];
    
    if (items && items.length > 0) {
      // Use provided items
      lineItems = items.map(item => ({
        price_data: {
          currency: currency,
          product_data: {
            name: item.name,
            description: item.description || `${item.name} service`,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity || 1,
      }));
    } else {
      // Use single item with total amount
      lineItems = [{
        price_data: {
          currency: currency,
          product_data: {
            name: description,
            description: 'House of Companies business services',
          },
          unit_amount: amountInCents,
        },
        quantity: 1,
      }];
    }

    console.log('Line items:', lineItems);

    // Determine base URL for success/cancel URLs based on request origin
    const origin = req.headers.origin || req.headers.referer || process.env.FRONTEND_URL;
    let baseUrl = process.env.FRONTEND_URL; // default fallback
    
    if (origin && origin.includes('localhost')) {
      baseUrl = 'http://localhost:5173';
    } else if (origin && origin.includes('service.houseofcompanies.co.in')) {
      baseUrl = 'https://service.houseofcompanies.co.in';
    } else if (origin && origin.includes('houseofcompanies.co.in')) {
      baseUrl = 'https://service.houseofcompanies.co.in';
    }

    console.log('Using base URL for redirects:', baseUrl);

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/payment-cancelled`,
      customer_email: customerEmail,
      metadata: {
        description: description,
        total_amount: amount.toString(),
        currency: currency,
      },
    });

    console.log('Created session:', session.id);

    res.json({ 
      success: true,
      sessionId: session.id,
      url: session.url 
    });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ 
      error: 'Failed to create checkout session',
      message: error.message,
      details: error
    });
  }
});

// Webhook endpoint for handling Stripe events (optional but recommended)
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  if (!hasValidStripeKeys) {
    console.log('Demo mode: Webhook received but no Stripe keys');
    return res.json({ received: true, demo: true });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET || 'whsec_your_webhook_secret'
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Payment successful for session:', session.id);
      // Here you can add logic to update your database, send confirmation emails, etc.
      break;
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

// Get session details (for success page)
app.get('/session/:sessionId', async (req, res) => {
  try {
    if (!hasValidStripeKeys) {
      // Return demo session data
      return res.json({ 
        session: {
          id: req.params.sessionId,
          amount_total: 1000, // 10.00 in cents
          payment_status: 'paid',
          created: Math.floor(Date.now() / 1000),
          demo: true
        }
      });
    }

    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    res.json({ session });
  } catch (error) {
    console.error('Error retrieving session:', error);
    res.status(500).json({ error: 'Failed to retrieve session' });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`🚀 Stripe backend server running on port ${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/health`);
  console.log(`💳 Create checkout: http://localhost:${PORT}/create-checkout-session`);
  if (!hasValidStripeKeys) {
    console.log(`⚠️  DEMO MODE: Add your Stripe test keys to config.env for real payments`);
  }
}); 