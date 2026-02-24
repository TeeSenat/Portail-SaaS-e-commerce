const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/clear", cartController.clearCart);
router.post("/add", cartController.addToCart);
router.get("/:user_id", cartController.getCart);
router.delete("/remove/:id", cartController.removeFromCart);
router.post("/update", cartController.updateCart);
module.exports = router;
