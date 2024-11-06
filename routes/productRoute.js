const router = require("express").Router();
const upload = require("../config/upload.js");
const {
  getProducts,
  getProductByID,
  postProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/productController.js");

router.get("/products", getProducts);
router.get("/products/:id", getProductByID);
router.post("/products", upload.single("file"), postProduct);
router.put("/products/:id", upload.single("file"), editProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;
