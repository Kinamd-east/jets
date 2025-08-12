require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ethers = require("ethers");
const cors = require("cors");
// const User = require("./models/User");
// const axios = require("axios");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
// const notisRoutes = require("./routes/notisRoutes");
// const walletRoutes = require("./routes/walletRoutes");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // your React app's address
    credentials: true, // allow cookies/session
  }),
);
app.use(express.json());
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      secure: false,
      sameSite: "lax", // Set to true if using HTTPS
    },
  }),
);

connectDB();

app.use("/auth", authRoutes);
// app.use("/notifications", notisRoutes);
// app.use("/wallet", walletRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
