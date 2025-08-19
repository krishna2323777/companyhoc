# Stripe Payment Backend Setup

This backend provides dynamic Stripe checkout sessions for the House of Companies frontend.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Stripe Keys
Edit `config.env` and replace the placeholder keys with your actual Stripe keys:

```env
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
```

### 3. Start the Server
```bash
npm run dev
```

The server will start on `http://localhost:4242`

## 🔧 Stripe Dashboard Setup

### 1. Create a Stripe Account
- Go to [stripe.com](https://stripe.com) and create an account
- Complete your business profile

### 2. Get Your API Keys
1. Go to **Developers > API keys** in your Stripe Dashboard
2. Copy your **Publishable key** and **Secret key**
3. Update `config.env` with these keys

### 3. Configure Webhooks (Optional but Recommended)
1. Go to **Developers > Webhooks** in your Stripe Dashboard
2. Click **Add endpoint**
3. Set the endpoint URL to: `http://localhost:4242/webhook` (for development)
4. Select these events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
5. Copy the webhook signing secret and add it to `config.env`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

### 4. Test Mode vs Live Mode
- **Test Mode**: Use test card numbers (e.g., `4242 4242 4242 4242`)
- **Live Mode**: Switch to live keys when ready for production

## 🧪 Testing

### Test Card Numbers
Use these test card numbers in Stripe Checkout:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Requires Authentication**: `4000 0025 0000 3155`

### Test the Integration
1. Start your frontend: `npm start` (runs on port 3000)
2. Start your backend: `npm run dev` (runs on port 4242)
3. Add items to cart and click "Proceed to Payment"
4. Complete payment with test card

## 📁 File Structure
```
backend/
├── server.js          # Main Express server
├── package.json       # Dependencies
├── config.env         # Environment variables
└── README.md          # This file
```

## 🔌 API Endpoints

### POST /create-checkout-session
Creates a Stripe checkout session with dynamic amount.

**Request Body:**
```json
{
  "amount": 99.99,
  "currency": "eur",
  "description": "House of Companies Services",
  "items": [
    {
      "name": "Branch Registration",
      "price": 295,
      "quantity": 1,
      "description": "Branch Registration service for Netherlands"
    }
  ],
  "customerEmail": "customer@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/pay/cs_test_..."
}
```

### GET /session/:sessionId
Retrieves session details for success page.

### POST /webhook
Handles Stripe webhook events (optional).

## 🚀 Production Deployment

### 1. Environment Variables
Update `config.env` for production:
```env
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
FRONTEND_URL=https://yourdomain.com
SUCCESS_URL=https://yourdomain.com/payment-success
CANCEL_URL=https://yourdomain.com/payment-cancelled
```

### 2. Webhook URL
Update your webhook endpoint URL in Stripe Dashboard to your production domain.

### 3. Deploy
Deploy to your preferred hosting service (Heroku, Vercel, AWS, etc.).

## 🔒 Security Notes

- Never expose your Stripe secret key in frontend code
- Always use HTTPS in production
- Validate amounts on the backend
- Use webhooks to handle payment confirmations
- Implement proper error handling

## 🐛 Troubleshooting

### Common Issues

1. **CORS Error**: Make sure frontend URL is correct in `config.env`
2. **Invalid API Key**: Check your Stripe keys are correct
3. **Amount Validation**: Ensure amount is greater than 0
4. **Webhook Errors**: Check webhook secret and endpoint URL

### Debug Mode
Add this to see detailed logs:
```javascript
// In server.js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});
```

## 📞 Support

For Stripe-specific issues, check the [Stripe Documentation](https://stripe.com/docs). 

## 🔧 **How to Fix**

### 1. **Use `node` Instead of `nodemon` in Production**

- `nodemon` is for local development only.  
- In production, you should use `node server.js`.

**Update your `package.json` scripts:**

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

- Most deployment platforms use `npm start` by default.

---

### 2. **Deploy Using the `start` Script**

- Make sure your deployment platform is running `npm start` (not `npm run dev`).

---

### 3. **If You Need to Use `dev` for Some Reason**

- Ensure `nodemon` is installed as a dependency (not just devDependency), but this is not recommended for production.

---

## ** 