const express = require("express");
const {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const router = express.Router();

router.get("/getproducts", getProduct);

router.post("/addproducts", addProduct);

router.put("/updateproducts", updateProduct);

// Use DELETE method and include the product ID in the URL
router.delete("/deleteproducts/:id", deleteProduct);

module.exports = router;
