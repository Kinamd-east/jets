const express = require("express");
const router = express.Router();
const { subscribeAsSeller } = require("../controllers/subscriptionControllers");

router.post("/subscribe", subscribeAsSeller);

module.exports = router;
