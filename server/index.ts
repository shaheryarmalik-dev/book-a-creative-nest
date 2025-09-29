import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const stripeSecretKey = process.env.STRIPE_SECRET_KEY as string;
if (!stripeSecretKey) {
  console.error("Missing STRIPE_SECRET_KEY in environment");
  process.exit(1);
}

const stripe = new Stripe(stripeSecretKey, { apiVersion: "2024-06-20" });

// Util: convert dollars to cents safely
function dollarsToCents(amountUsd: number): number {
  return Math.round(amountUsd * 100);
}

app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { locationId, locationTitle, hourlyRateUsd, hours, date, startTime, customer } = req.body as {
      locationId: string;
      locationTitle: string;
      hourlyRateUsd: number;
      hours: number;
      date: string;
      startTime: string;
      customer: { name: string; email: string; phone?: string };
    };

    if (!locationId || !hourlyRateUsd || !hours || !customer?.email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // In real app: validate availability and price here
    const totalUsd = hourlyRateUsd * hours;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customer.email,
      currency: "usd",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: locationTitle || `Booking for ${locationId}`,
            },
            unit_amount: dollarsToCents(totalUsd),
          },
          quantity: 1,
        },
      ],
      metadata: {
        locationId,
        locationTitle,
        date,
        startTime,
        hours: String(hours),
        customerName: customer.name,
        customerPhone: customer.phone || "",
      },
      success_url: `${process.env.SUCCESS_URL || "http://localhost:8080"}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CANCEL_URL || "http://localhost:8080"}/booking/cancel`,
    });

    return res.json({ url: session.url });
  } catch (error: any) {
    console.error("Error creating checkout session", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

// Webhook endpoint
app.post("/api/stripe-webhook", express.raw({ type: "application/json" }), (req, res) => {
  const signature = req.headers["stripe-signature"] as string | undefined;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string | undefined;

  let event: Stripe.Event;
  try {
    event = webhookSecret
      ? stripe.webhooks.constructEvent(req.body, signature!, webhookSecret)
      : (JSON.parse(req.body as unknown as string) as Stripe.Event);
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      // TODO: persist booking as confirmed using session.metadata
      break;
    }
    default:
      break;
  }

  return res.sendStatus(200);
});

const port = Number(process.env.PORT || 5174);
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});


