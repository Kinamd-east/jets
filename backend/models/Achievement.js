const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    icon: {
      type: String,
    },
    amount: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Achievement", achievementSchema);
