import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/payment/config")
      .then(async (r) => {
        const { publishableKey } = await r.json();
        setStripePromise(loadStripe(publishableKey));
        console.log("Publishable Key:", publishableKey); // Log the publishable key
        console.log(r);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/api/payment/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    })
      .then(async (result) => {
        if (!result.ok) {
          throw new Error(
            `Failed to create payment intent, status: ${result.status}`
          );
        }
        return result.json();
      })
      .then(({ clientSecret }) => {
        console.log("Client Secret:", clientSecret);
        setClientSecret(clientSecret);
      })
      .catch((err) => {
        console.error("Error creating payment intent:", err);
      });
  }, []);

  return (
    <>
      <h1>Payment Gateway</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
