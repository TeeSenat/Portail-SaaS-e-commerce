const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/create", productController.createProduct);
router.get("/:tenant_id", productController.getProductsByTenant);
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
