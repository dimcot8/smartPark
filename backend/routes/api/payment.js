const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY || "sk_test_51OCnqAFRD4FoFC1yUNeiBpo8pO51yPdHPbcuXwmPJAvfHd1NfOXTgZmBjshBqEwCFFwJU2a0cdYbIRkQAl1c711900P9rQOJGZ");
const { resolve } = require("path");
const env = require("dotenv").config({ path: "../../.env" });
// require("dotenv").config();

console.log(process.env.STRIPE_PUBLISHABLE_KEY);
const pubkey = "pk_test_51OCnqAFRD4FoFC1yrfUr2wd9daV7AwQCmEtlOr2kU5X2cFO4UlyHDm756rKQoo0YXCKSGH1ZBwvV2VkUDj8ilofd00pITdSwOA";
const skipStaticForRoutes = (req, res, next) => {
  if (req.url === "https://smart-park-dimas-projects-53bcc0c4.vercel.app/payment") {
    return next();
  }
  express.static(process.env.STATIC_DIR)(req, res, next);
};

router.use(skipStaticForRoutes);

router.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || pubkey,
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
