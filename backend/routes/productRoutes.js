const express = require("express");
const router = express.Router();
const { getAllProducts } = require("../controllers/productControllers");

router.get("/list", getAllProducts);

module.exports = router;
