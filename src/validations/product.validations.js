// validations/product.validations.js
const Joi = require("joi");

const idParam = Joi.string().hex().length(24).label("MongoId");

// --------------------- Add Product ---------------------
const createProduct = Joi.object({
  name: Joi.string()
    .required()
    .min(2)
    .max(100)
    .trim()
    .messages({
      "string.empty": "Product name is required",
      "string.min": "Product name must be at least 2 characters long",
      "string.max": "Product name cannot exceed 100 characters",
      "any.required": "Product name is required",
    }),
  price: Joi.string()
    .required()
    .trim()
    .messages({
      "string.empty": "Price is required",
      "any.required": "Price is required",
    }),
  originalPrice: Joi.string().allow(null, "").optional(),
  unitId: idParam.required().messages({
    "any.required": "unitId is required",
    "string.length": "unitId must be a valid Mongo ID",
  }),
  categoryId: idParam.required().messages({
    "any.required": "categoryId is required",
    "string.length": "categoryId must be a valid Mongo ID",
  }),
  images: Joi.any(), // handle file separately
  inStock: Joi.boolean().required().messages({
    "any.required": "inStock is required",
  }),
  stockCount: Joi.number().integer().min(0).optional(),
  description: Joi.string().optional().allow(null, "").max(500),
  longDescription: Joi.string().optional().allow(null, "").max(2000),
  features: Joi.array().items(Joi.string()).optional(),
  specifications: Joi.object().optional(),
  benefits: Joi.array().items(Joi.string()).optional(),
  currencyId: idParam.optional(),
  discount: Joi.string().optional().allow(null, ""),
  rating: Joi.number().min(0).max(5).optional(),
  reviews: Joi.number().integer().min(0).optional(),
  thomps: Joi.boolean().optional(),
bestSellingProducts: Joi.boolean().optional(),
signatureFlavorsProducts: Joi.boolean().optional(),
});

// --------------------- Update Product ---------------------
const updateProduct = Joi.object({
  id: idParam.required().messages({
    "any.required": "Product ID is required",
    "string.length": "Product ID must be a valid Mongo ID",
  }),
  name: Joi.string().optional().min(2).max(100).trim(),
  price: Joi.string().optional().trim(),
  originalPrice: Joi.string().optional().allow(null, ""),
  unitId: idParam.optional(),
  categoryId: idParam.optional(),
  images: Joi.any(), // handle file separately
  inStock: Joi.boolean().optional(),
  stockCount: Joi.number().integer().min(0).optional(),
  description: Joi.string().optional().allow(null, "").max(500),
  longDescription: Joi.string().optional().allow(null, "").max(2000),
  features: Joi.array().items(Joi.string()).optional(),
  specifications: Joi.object().optional(),
  benefits: Joi.array().items(Joi.string()).optional(),
  currencyId: idParam.optional(),
  discount: Joi.string().optional().allow(null, ""),
  rating: Joi.number().min(0).max(5).optional(),
  reviews: Joi.number().integer().min(0).optional(),
  thomps: Joi.boolean().optional(),
bestSellingProducts: Joi.boolean().optional(),
signatureFlavorsProducts: Joi.boolean().optional(),

});

// --------------------- Get Product by ID ---------------------
const getProductById = Joi.object({
  params: Joi.object({
    id: idParam.required().messages({
      "any.required": "Product ID is required",
      "string.length": "Invalid Product ID format",
    }),
  }),
});

// --------------------- Delete Product by ID ---------------------
const deleteProduct = Joi.object({
  params: Joi.object({
    id: idParam.required().messages({
      "any.required": "Product ID is required",
      "string.length": "Invalid Product ID format",
    }),
  }),
});

module.exports = {
  createProduct,
  updateProduct,
  getProductById,
  deleteProduct,
};
