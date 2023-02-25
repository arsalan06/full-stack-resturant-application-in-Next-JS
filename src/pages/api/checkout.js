const Stripe = require('stripe');
const stripe=Stripe((process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY))
console.log("process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY")
console.log("process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY")
console.log("process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY")
console.log(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price_data: {
                currency: "usd",
                product_data: {
                  name: "jjb",
                //   images: ,
                  description: "n b",
                  metadata: {
                    id: 6,
                  },
                },
                unit_amount: 200 * 100,
              },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `http://localhost:3000`,
        cancel_url: `http://localhost:3000`,
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}