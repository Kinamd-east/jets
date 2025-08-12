const mongoose = require("mongoose");

// 🔹 Notification Schema
const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["INFO", "ALERT", "TRANSACTION", "SECURITY", "PROMOTION"],
      default: "INFO",
    },
    status: {
      type: String,
      enum: ["UNREAD", "READ"],
      default: "UNREAD",
    },
  },
  { timestamps: true },
);

// 🔹 User Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    productsSold: { type: Number, default: 0 },
    productsBought: { type: Number, default: 0 },
    achievements: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Achievement",
      },
    ],
    wallet: { type: mongoose.Schema.Types.ObjectId, ref: "Wallet" },
    inventory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Inventory",
      },
    ],
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    notifications: [notificationSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
