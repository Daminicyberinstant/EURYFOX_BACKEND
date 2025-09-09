// services/product.service.js
const fs = require("fs");
const path = require("path");
const statusCode = require("../enums/statusCode");
const Product = require("../models/Products");
const CustomError = require("../exceptions/CustomError");
const { UPLOADS_ROOT } = require("../middlewares/upload");
const ProductCategories = require("../models/ProductCategories"); 
const ProductUnits=require("../models/ProductUnits");
const mongoose = require("mongoose");


const add = async (req, res) => {
  const uploadedFiles = [];
  try {
    const data = req.body;
    const files = req.files;
console.log("Files : ",req.files);
    if (!files?.length) {
      throw new CustomError("Product images are required", statusCode.BAD_REQUEST);
    }


    if (!mongoose.Types.ObjectId.isValid(data.categoryId)) {
          throw new CustomError("Invalid product category ID format", statusCode.BAD_REQUEST);
        }

        const categoryExists = await ProductCategories.exists({ _id: data.categoryId });
    if (!categoryExists) {
      throw new CustomError("Selected product category does not exist", statusCode.BAD_REQUEST);
    }

    if (!mongoose.Types.ObjectId.isValid(data.unitId)) {
          throw new CustomError("Invalid product unit ID format", statusCode.BAD_REQUEST);
        }

        const productUnitExists=await ProductUnits.exists({_id: data.unitId});
        if(!productUnitExists)
        {
          throw new CustomError("Selected product unit does not exist", statusCode.BAD_REQUEST);
        }

    // Prepare image paths
    const imagePaths = files.map((file) => {
      const relPath = path.join("uploads", "products", file.filename);
      const fullPath = path.join(UPLOADS_ROOT, "products", file.filename);
      uploadedFiles.push(fullPath);
      return relPath;
    });
    data.images = imagePaths;

    // Optional: Check if product with same name + category exists
    const existingProduct = await Product.findOne({ name: data.name, categoryId: data.categoryId });
    if (existingProduct) {
      throw new CustomError("Product already exists in this category", statusCode.CONFLICT);
    }
// Convert base price to INR format
let price = parseFloat(data.price); // original price entered by user
if (isNaN(price)) {
  throw new CustomError("Invalid price value", statusCode.BAD_REQUEST);
}


data.originalPrice = `₹${price.toFixed(2)}`;


if (data.discount) {
  
  const discountValue = parseFloat(data.discount.replace('%', ''));

  if (!isNaN(discountValue) && discountValue > 0 && discountValue <= 100) {
    const discountedPrice = price - (price * (discountValue / 100));
    data.price = `₹${discountedPrice.toFixed(2)}`;
  } else {
    throw new CustomError("Invalid discount format", statusCode.BAD_REQUEST);
  }
} else {
  data.discount=0;
  data.price = `₹${price.toFixed(2)}`;
}


    return await Product.create(data);
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
          throw new CustomError("Invalid product ID format", statusCode.BAD_REQUEST);
        }
  const product = await Product.findById(id)
    .populate("categoryId", "title category")
    .populate("unitId", "name code type");
  if (!product) {
    throw new CustomError("Product not found", statusCode.NOT_FOUND);
  }
  return product;
};

const getAll = async () => {
  const products = await Product.find()
    .sort({ createdAt: -1 })
    .populate("categoryId", "title category")
    .populate("unitId", "name code type");
  return products;
};

const update = async (req, res) => {
  const { body, files } = req;
  const uploadedFiles = [];
  try {
      if (!mongoose.Types.ObjectId.isValid(body.id)) {
          throw new CustomError("Invalid product ID format", statusCode.BAD_REQUEST);
        }
         

  const product = await Product.findById(body.id);
    if (!product) {
      // Clean up any files already uploaded by middleware
      if (files?.length) {
        for (const file of files) {
          const tempPath = path.join(UPLOADS_ROOT, "products", file.filename);
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
      }
      throw new CustomError("Product not found", statusCode.NOT_FOUND);
    }

  if (body.categoryId && body.categoryId !== String(product.categoryId)) {
         if (!mongoose.Types.ObjectId.isValid(body.categoryId)) {
          throw new CustomError("Invalid product category ID format", statusCode.BAD_REQUEST);
        }
    const categoryExists = await ProductCategories.exists({ _id: body.categoryId });
      if (!categoryExists) {
        if (files?.length) {
          for (const file of files) {
            const tempPath = path.join(UPLOADS_ROOT, "products", file.filename);
            if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
          }
        }
        throw new CustomError("Selected category does not exist", statusCode.BAD_REQUEST);
      }
      product.categoryId = body.categoryId;
    }

if(body.unitId && body.unitId !== String(product.unitId) )
{
        if (!mongoose.Types.ObjectId.isValid(body.unitId)) {
          throw new CustomError("Invalid product unit ID format", statusCode.BAD_REQUEST);
        }

        const productUnitExists=await ProductUnits.exists({_id: body.unitId});
        if(!productUnitExists)
        { 
        if (files?.length) {
          for (const file of files) {
            const tempPath = path.join(UPLOADS_ROOT, "products", file.filename);
            if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
          }
        }
        throw new CustomError("Selected product unit does not exist", statusCode.BAD_REQUEST);
      }
      product.unitId=body.unitId;
        }


      
    
    if (body.name && body.name !== product.name) {
      const existing = await Product.findOne({
        name: body.name,
        categoryId: body.categoryId,
        _id: { $ne: body.id },
      });
      if (existing) throw new CustomError(
        "Product with this name already exists in this category",
        statusCode.CONFLICT
      );

      product.name = body.name;
    }


   if (body.price !== undefined) {
      let price = parseFloat(body.price);
      if (isNaN(price)) {
        throw new CustomError("Invalid price value", statusCode.BAD_REQUEST);
      }

     
      product.originalPrice = `₹${price.toFixed(2)}`;

      if (body.discount) {
        const discountValue = parseFloat(body.discount.replace("%", ""));
        if (!isNaN(discountValue) && discountValue > 0 && discountValue <= 100) {
          const discountedPrice = price - (price * (discountValue / 100));
          product.price = `₹${discountedPrice.toFixed(2)}`;
          product.discount = `${discountValue}`;
        } else {
          throw new CustomError("Invalid discount format", statusCode.BAD_REQUEST);
        }
      } else {
     
        product.price = `₹${price.toFixed(2)}`;
        product.discount = 0;
      }
    }

 if ((body.discount === null || body.discount === "") && body.price) {
  const parsedPrice = parseFloat(body.price);
  if (!isNaN(parsedPrice)) {
    product.discount = 0;
    product.price = `₹${parsedPrice.toFixed(2)}`;
    product.originalPrice = `₹${parsedPrice.toFixed(2)}`;
  } else {
    throw new CustomError("Invalid price format", statusCode.BAD_REQUEST);
  }
}


    
    const fields = [
      "rating",
      "reviews",
      "inStock",
      "stockCount",
      "discount",
      "description",
      "longDescription",
      "features",
      "benefits",
      "specifications",
    ];

    fields.forEach(f => {
      if (body[f] !== undefined) product[f] = body[f];
    });

    // Handle images array
    if (files?.length) {
      const newImagePaths = files
        .filter(f => f?.filename)
        .map(f => {
          const relPath = path.join("uploads", "products", f.filename);
          const fullPath = path.join(UPLOADS_ROOT, "products", f.filename);
          uploadedFiles.push(fullPath);
          return relPath;
        });

      if (newImagePaths.length && product.images?.length) {
        for (const oldImg of product.images) {
          if (!oldImg) continue;
          const oldFullPath = path.join(UPLOADS_ROOT, oldImg.replace(/^uploads[\\/]/, ""));
          if (fs.existsSync(oldFullPath)) fs.unlinkSync(oldFullPath);
        }
      }

      if (newImagePaths.length) product.images = newImagePaths;
    }

    // Save updated product
    const updatedProduct = await product.save();
    return updatedProduct;

  } catch (err) {
    // Cleanup uploaded files if error occurs
    for (const filePath of uploadedFiles) {
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (e) {
        console.error("Failed to delete file:", filePath, e);
      }
    }
    throw err;
  }
};


const remove = async (id) => {


    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new CustomError("Invalid product  ID format", statusCode.BAD_REQUEST);
      }

  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct) {
    throw new CustomError("Product not found", statusCode.NOT_FOUND);
  }

  // Delete associated images
  if (deletedProduct.images?.length) {
    for (const img of deletedProduct.images) {
      const imgFullPath = path.join(UPLOADS_ROOT, img.replace(/^uploads[\\/]/, ""));
      if (fs.existsSync(imgFullPath)) fs.unlinkSync(imgFullPath);
    }
  }

  return deletedProduct;
};





const getCategoriesWithProducts = async () => {
  const categories = await ProductCategories.find().sort({ createdAt: -1 });

  const result = await Promise.all(
    categories.map(async (cat) => {
      const products = await Product.find({ categoryId: cat._id })
        .populate("unitId", "name code type") // only bring these fields
        .sort({ createdAt: -1 })
        .select("name price originalPrice unitId images rating inStock description"); // only pick required fields

      if (!products.length) return null;

      return {
        id: cat._id.toString(),
        title: cat.title,
        category: cat.category,
        description: cat.description,
        icon: cat.icon,
        image: cat.image,
        products: products.map((p) => ({
          id: p._id.toString(),
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          unitId: {
            id: p.unitId._id.toString(),
            name: p.unitId.name,
            code: p.unitId.code,
            type: p.unitId.type,
          },
          images: p.images,
          rating: p.rating,
          inStock: p.inStock,
          description: p.description,
        })),
      };
    })
  );

  return result.filter(Boolean);
};


const addImages = async (productId, files) => {

    const uploadedFiles = [];

  try {

      if (!mongoose.Types.ObjectId.isValid(productId)) {
          throw new CustomError("Invalid product ID format", statusCode.BAD_REQUEST);
        }
      if (!files?.length) {
    
        throw new CustomError("No files provided", statusCode.BAD_REQUEST);

  }

  const product = await Product.findById(productId);
  if (!product) {
      for (const file of files) {
        const tempPath = path.join(UPLOADS_ROOT, "products", file.filename);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
    throw new CustomError("Product not found", statusCode.NOT_FOUND);
  }

  // Prepare new image paths
 const newImagePaths = files
      .filter(f => f?.filename)
      .map(f => {
        const relPath = path.join("uploads", "products", f.filename);
        const fullPath = path.join(UPLOADS_ROOT, "products", f.filename);
        uploadedFiles.push(fullPath); // track files to clean up on error
        return relPath;
      });

  if (!newImagePaths.length) {
    throw new CustomError("No valid files provided", statusCode.BAD_REQUEST);
  }

  // Initialize images array if not present
  product.images = product.images || [];

  // Append new images
  product.images.push(...newImagePaths);

  // Save updated product
  const updatedProduct = await product.save();

  return updatedProduct;
}catch (error) {
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



const getByCategoryId = async (categoryId) => {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      throw new CustomError("Invalid product ID format", statusCode.BAD_REQUEST);
    }
  // Check if category exists
  const categoryExists = await ProductCategories.exists({ _id: categoryId });
  if (!categoryExists) {
    throw new CustomError("Category not found", statusCode.NOT_FOUND);
  }

  // Fetch all products for this category
  const products = await Product.find({ categoryId })
    .populate("unitId", "name code type")
    .populate("categoryId", "title category") // optional, can remove if you already know category
    .sort({ createdAt: -1 });

  return products;
};



// Get all Thomps-enabled products
const getAllThomps = async () => {
  // Fetch products where thomps is true
  const thompsProducts = await Product.find({ thomps: true })
    .sort({ createdAt: -1 }) // optional: newest first
    .populate("categoryId", "title category")
    .populate("unitId", "name code type")
    .select(
      "name price originalPrice images rating inStock description bestSellingProducts signatureFlavorsProducts categoryId unitId"
    ); // only select required fields

  return thompsProducts;
};


module.exports = {
  add,
  getById,
  getAll,
  update,
  remove,
  getCategoriesWithProducts,
  addImages,getByCategoryId,getAllThomps
};
