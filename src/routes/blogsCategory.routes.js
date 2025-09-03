const express = require('express');
const validate = require("../middlewares/validation.middleware");
const blogsCategoryController = require("../controllers/blogsCategory.controllers");
const { 
  addBlogsCategory, 
  updateBlogsCategory, 
  getBlogsCategoryById, 
  deleteBlogsCategory 
} = require("../validations/blogsCategory.validations.js");

const router = express.Router();


router.post('/add', validate(addBlogsCategory), blogsCategoryController.add);


router.post('/update', validate(updateBlogsCategory), blogsCategoryController.update);


router.get('/getById/:id', validate(getBlogsCategoryById), blogsCategoryController.getById);

router.get("/getAllCategory",blogsCategoryController.getAllCategoryNames);
router.get('/getAll', blogsCategoryController.getAll);


router.delete('/:id', validate(deleteBlogsCategory), blogsCategoryController.remove);


module.exports = router;
