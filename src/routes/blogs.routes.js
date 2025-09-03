const express = require('express');
const validate = require("../middlewares/validation.middleware.js");
const blogsController = require("../controllers/blogs.controllers");
const { 
  createBlog,
  updateBlog,
  getBlogById,
  deleteBlog,getByNameBlog
} = require("../validations/blogs.validations.js");
const {uploadBlog} =require('../middlewares/upload.js');
const router = express.Router();


router.post('/add',uploadBlog, validate(createBlog), blogsController.add);


router.post('/update',uploadBlog, validate(updateBlog), blogsController.update);


router.get('/getById/:id', validate(getBlogById), blogsController.getById);


router.get('/getAll', blogsController.getAll);
router.get('/getAllFiltered', blogsController.getAllFiltered);

router.get('/getAllActive', blogsController.getAllActive);
router.get("/getByCategory/:id",blogsController.getByCategory);
router.get("/getFeatured",blogsController.getFeatured);

router.delete('/:id', validate(deleteBlog), blogsController.remove);
router.get("/getByName/:name",validate(getByNameBlog),blogsController.getByName);

module.exports = router;
