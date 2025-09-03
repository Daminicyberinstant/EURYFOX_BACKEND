// routes/product.routes.js
const express = require("express");

const  validate = require("../middlewares/validation.middleware");

const productController = require("../controllers/product.controllers.js");
const {createProduct,updateProduct,getProductById,deleteProduct}=require("../validations/product.validations.js")
const { uploadProduct } = require("../middlewares/upload.js");
const { getById } = require("../services/product.service.js");

const router = express.Router();


router.post(
  "/add",
  uploadProduct, 
  validate(createProduct),
  productController.add
);

router.post(
  "/update",
  uploadProduct,
  validate(updateProduct),
  productController.update
);

router.get(
  "/getById/:id",
  validate(getProductById),
  productController.getById
);

router.get("/getAll", productController.getAll);
router.get("/getAllProductsWithCategories", productController.getAllProductsWithCategories);

router.delete(
  "/:id",
  validate(deleteProduct),
  productController.remove
);

router.post(
  "/addImages",
  uploadProduct,
  productController.addProductImages
);
router.get(
  "/getByCategory/:id",
  productController.getByCategory
);


module.exports = router;
