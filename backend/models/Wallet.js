const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["debit", "credit"], default: "debit" },
  amount: { type: Number, required: true, min: 0 },
  from: { type: String, trim: true },
  status: {
    type: String,
    enum: ["PENDING", "SUCCESS", "FAILED"],
    default: "PENDING",
  },
  timestamp: { type: Date, default: Date.now },
});

const walletSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Wallet", trim: true },
    balance: { type: Number, default: 0, min: 0 },
    accountNumber: { type: String, unique: true, required: true },
    transactions: [transactionSchema],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Wallet", walletSchema);
