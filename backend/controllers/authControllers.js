const User = require("../models/User");
const Wallet = require("../models/Wallet");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ error: "Email already in use" });

    const existingUsername = await User.findOne({ username });
    if (existingUsername)
      return res.status(400).json({
        message: "Username exists. I guess great minds think alike...",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email: email.toLowerCase(),
      passwordHash: hashedPassword,
      inventory: [],
      achievements: [],
      productsBought: 0,
      productsSold: 0,
      products: [],
      notifications: [],
    });
    const newNotis = {
      title: `From JETS`,
      message: `Hello!!! ${user.username} Welcome to JETS, you go to shop app where you can sell and purchase things here on campus. Enjoy!!!`,
      type: "INFO",
      status: "UNREAD",
    };
    const accountNumber = await generateUniqueAccountNumber();
    user.notifications.push(newNotis);
    await user.save();
    const wallet = new Wallet({
      name: `${user.username}'s wallet`,
      balance: 0,
      accountNumber,
      transactions: [],
      owner: user._id,
    });
    await wallet.save();

    user.wallet = wallet._id;
    await user.save();
    req.session.userId = user._id;
    console.log(user);
    console.log(wallet);

    res.status(201).json({ message: "Registration Successful", user: user });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    req.session.userId = user._id;
    res
      .status(200)
      .json({ message: "Logged in successfully", userId: user._id });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out" });
  });
};

const getMe = async (req, res) => {
  console.dir(req, { depth: null });
  console.dir(req.sessions, { depth: null });
  console.dir(req.sessions, { depth: null });
  if (!req.session.userId)
    return res.status(401).json({ message: "Not logged in" });

  const user = await User.findById(req.session.userId).select("-passwordHash");
  console.log(req.session.userId);
  res.status(200).json({ user });
};

const generateUniqueAccountNumber = async () => {
  let accountNumber;
  let exists = true;

  while (exists) {
    accountNumber = Math.floor(
      1000000000 + Math.random() * 9000000000,
    ).toString(); // 10-digit account number

    // This checks Wallet collection, not User
    exists = await Wallet.findOne({ accountNumber });
  }

  return accountNumber;
};

module.exports = { registerUser, getMe, login, logout };
