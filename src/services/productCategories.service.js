const statusCode=require("../enums/statusCode");
const ProductCategories=require("../models/ProductCategories")
const CustomError  = require('../exceptions/CustomError');
const fs = require("fs");
const path = require("path");
const {UPLOADS_ROOT}=require("../middlewares/upload");
const Product = require("../models/Products"); // make sure to import Product model
const mongoose = require("mongoose");
const add = async (req, res) => {
  const uploadedFiles = [];
  try {
    const data = req.body;
    const files = req.files;

    if (!files?.image?.[0]) {
      throw new CustomError("Category image is required", statusCode.BAD_REQUEST);
    }

    // Prepare paths
    const imageRelativePath = path.join("uploads", "productCategories", files.image[0].filename);
    const imageFullPath = path.join(UPLOADS_ROOT, "productCategories", files.image[0].filename);
    uploadedFiles.push(imageFullPath);

    let iconRelativePath = null;
    if (files?.icon?.[0]) {
      iconRelativePath = path.join("uploads", "productCategories", "icons", files.icon[0].filename);
      const iconFullPath = path.join(UPLOADS_ROOT, "productCategories", "icons", files.icon[0].filename);
      uploadedFiles.push(iconFullPath);
    }

    // Check if category title exists
    const existingCategory = await ProductCategories.findOne({ title: data.title });
    if (existingCategory) {
      throw new CustomError("Product category already exists", statusCode.BAD_REQUEST);
    }

    // Set data
    const categorySlug = data.title.trim().toLowerCase().replace(/\s+/g, "-");
    data.image = imageRelativePath;
    data.icon = iconRelativePath;
    data.category = categorySlug;

    return await ProductCategories.create(data);

  } catch (error) {
    // Cleanup uploaded files on error
    for (const filePath of uploadedFiles) {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    console.error("Caught error:", error.message);
    throw error;
  }
};

const getById = async (id) => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new CustomError("Invalid product category ID format", statusCode.BAD_REQUEST);
        }
  const category = await ProductCategories.findById(id);
  if (!category) {
    throw new CustomError("Product Category not found", statusCode.NOT_FOUND);
  }
  return category;
};

const getAll = async () => {
  const categories = await ProductCategories.find().sort({ createdAt: -1 });
  return categories;
};


const update = async (req, res) => {
  const { body, files } = req;
  const uploadedFiles = [];
      if (!mongoose.Types.ObjectId.isValid(body.id)) {
          throw new CustomError("Invalid product category ID format", statusCode.BAD_REQUEST);
        }
  const category = await ProductCategories.findById(body.id);
   if (!category) {
    // Cleanup any uploaded files if they exist
    if (files?.image?.length) {
      for (const file of files.image) {
        const tempPath = path.join(UPLOADS_ROOT, "productCategories", file.filename);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
    }
    if (files?.icon?.length) {
      for (const file of files.icon) {
        const tempPath = path.join(UPLOADS_ROOT, "productCategories", "icons", file.filename);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
    }
    throw new CustomError("Product category not found", statusCode.NOT_FOUND);
  }

  try {
    // Check for duplicate title
    if (body.title && body.title !== category.title) {
      const existing = await ProductCategories.findOne({
        title: body.title.trim(),
        _id: { $ne: body.id }
      });
      if (existing) {
        throw new CustomError("Product category already exists", statusCode.CONFLICT);
      }
      category.title = body.title.trim();
      category.category = body.title.trim().toLowerCase().replace(/\s+/g, "-");
    }

    // Update description if provided
    if (body.description !== undefined) {
      category.description = body.description;
    }

    // Handle new image
    if (files?.image?.[0]) {
      const newImageRelPath = path.join("uploads", "productCategories", files.image[0].filename);
      const newImageFullPath = path.join(UPLOADS_ROOT, "productCategories", files.image[0].filename);
      uploadedFiles.push(newImageFullPath);

      // Delete old image
      if (category.image) {
        const oldImageFullPath = path.join(UPLOADS_ROOT, category.image.replace(/^uploads[\\/]/, ""));
        if (fs.existsSync(oldImageFullPath)) fs.unlinkSync(oldImageFullPath);
      }

      category.image = newImageRelPath;
    }

    // Handle new icon
    if (files?.icon?.[0]) {
      const newIconRelPath = path.join("uploads", "productCategories", "icons", files.icon[0].filename);
      const newIconFullPath = path.join(UPLOADS_ROOT, "productCategories", "icons", files.icon[0].filename);
      uploadedFiles.push(newIconFullPath);

      // Delete old icon
      if (category.icon) {
        const oldIconFullPath = path.join(UPLOADS_ROOT, category.icon.replace(/^uploads[\\/]/, ""));
        if (fs.existsSync(oldIconFullPath)) fs.unlinkSync(oldIconFullPath);
      }

      category.icon = newIconRelPath;
    }

    // Save updated category
    const updatedCategory = await category.save();
    return updatedCategory;

  } catch (error) {
    // Cleanup newly uploaded files if error occurs
    for (const filePath of uploadedFiles) {
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (err) {
        console.error("Failed to delete file:", filePath, err);
      }
    }
    throw error;
  }
};



const remove = async (id) => {
  const category = await ProductCategories.findById(id);
  if (!category) {
    throw new CustomError("Category not found", statusCode.NOT_FOUND);
  }


    const productsUsingCategory = await Product.exists({ categoryId: id });
  if (productsUsingCategory) {
    throw new CustomError(
      "Cannot delete category: some products are using this category",
      statusCode.CONFLICT
    );
  }


  
  // Delete image file
  if (category.image) {

 const relativePath = category.image.replace(/^uploads[\\/]/, "");
  
  // Construct absolute normalized path
  const imageFullPath = path.resolve(path.join(UPLOADS_ROOT, relativePath));
  console.log("ImageFullPath:", imageFullPath);

    try {
      if (fs.existsSync(imageFullPath)) fs.unlinkSync(imageFullPath);
    } catch (err) {
      console.error("Failed to delete image:", imageFullPath, err);
    }
  }

  // Delete icon file
  if (category.icon) {
    const iconFullPath = path.join(UPLOADS_ROOT, category.icon);
    try {
      if (fs.existsSync(iconFullPath)) fs.unlinkSync(iconFullPath);
    } catch (err) {
      console.error("Failed to delete icon:", iconFullPath, err);
    }
  }

  // Delete category document from DB
  const deletedCategory = await ProductCategories.findByIdAndDelete(id);
  return deletedCategory;
};


module.exports = { 
  add,
  getById, 
  getAll, 
  update, 
  remove 
};







