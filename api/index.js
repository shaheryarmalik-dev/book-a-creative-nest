// Vercel Serverless Function for API routes
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Route: Create Checkout Session
  if (req.url === '/api/create-checkout-session' && req.method === 'POST') {
    try {
      const { locationId, locationTitle, hourlyRateUsd, hours, date, startTime, customer } = req.body;

      if (!locationId || !hourlyRateUsd || !hours || !customer?.email) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const totalUsd = hourlyRateUsd * hours;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: locationTitle || `Booking for ${locationId}`,
                description: `${hours} hours on ${date} at ${startTime}`,
              },
              unit_amount: Math.round(totalUsd * 100),
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        customer_email: customer.email,
        success_url: `${process.env.SUCCESS_URL || req.headers.origin}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CANCEL_URL || req.headers.origin}/booking/cancel`,
      });

      return res.status(200).json({ url: session.url });
    } catch (error) {
      console.error('Stripe error:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  res.status(404).json({ error: 'Not found' });
}

