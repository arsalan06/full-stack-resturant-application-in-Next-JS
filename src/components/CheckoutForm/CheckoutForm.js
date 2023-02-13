import React from "react";
import { loadStripe } from "@stripe/stripe-js";
export async function CheckoutForm({lineItems}) {
  console.log(lineItems);
  console.log(lineItems);
  console.log(lineItems);
  let stripePromise = null;
  const getStrip = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      );
    }
    return stripePromise;
  };
  const stripe = await getStrip();
    await stripe.redirectToCheckout({
      mode: "payment",
      lineItems,
      successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: window.location.origin,
    });
//   await stripe.confirmPayment({
//     //`Elements` instance that was used to create the Payment Element
//     lineItems,
//     confirmParams: {
//       return_url: "https://example.com/order/123/complete",
//     },
//   });
}
