const express = require('express');
const  validate = require("../middlewares/validation.middleware");

const {createCategory,updateCategory,getCategoryById,deleteCategory}=require("../validations/productCategories.validations")
const productCategoriesController=require("../controllers/productCategories.controllers");

 const {uploadProductCategories}=require("../middlewares/upload")


const router = express.Router();


router.post('/add',uploadProductCategories,validate(createCategory), productCategoriesController.create);
router.post('/update',uploadProductCategories,validate(updateCategory),productCategoriesController.update)
router.get("/getById/:id",validate(getCategoryById), productCategoriesController.getById);
router.get("/getAll",productCategoriesController.getAll);
router.delete("/:id",validate(deleteCategory),productCategoriesController.remove);

module.exports = router;

 