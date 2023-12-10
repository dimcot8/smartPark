const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { resolve } = require("path");
const env = require("dotenv").config({ path: "../../.env" });
// require("dotenv").config();

console.log(process.env.STRIPE_PUBLISHABLE_KEY);

const skipStaticForRoutes = (req, res, next) => {
  if (req.url === "http://localhost:3000/payment") {
    return next();
  }
  express.static(process.env.STATIC_DIR)(req, res, next);
};

router.use(skipStaticForRoutes);

router.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

router.get("/", (req, res) => {
  const path = resolve(
    process.env.STATIC_DIR + "/src/components/paymentPage.js"
  );
  res.sendFile(path);
});

router.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "USD",
      amount: 100,
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
    // console.log("PaymentIntent:", paymentIntent);
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

module.exports = router;
