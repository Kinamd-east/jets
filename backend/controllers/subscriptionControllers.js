const express = require("express");
const Flutterwave = require("flutterwave-node-v3");
const User = require("../models/User.js");

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY,
);

const subscribeAsSeller = async (req, res) => {
  const { userId } = req.session; // assuming session auth
  const user = await User.findById(userId);

  const payload = {
    tx_ref: `sub-${Date.now()}`,
    amount: 3000,
    currency: "NGN",
    redirect_url: `${process.env.BASE_URL}/payment-success`,
    customer: {
      email: user.email,
      name: user.username,
    },
    customizations: {
      title: "Monthly Subscription",
      description: "3000 NGN monthly plan",
    },
  };

  try {
    const response = await flw.Payment.initialize(payload);
    res.json({ paymentLink: response.data.link });
  } catch (error) {
    res.status(500).json({ message: "Error creating payment link" });
  }
};

module.exports = {
  subscribeAsSeller,
};
