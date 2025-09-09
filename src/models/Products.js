const mongoose = require("mongoose");
const ProductCategories=require("./ProductCategories");
const ProductUnits = require("./ProductUnits");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "Price is required"],
    },
    originalPrice: {
      type: String,
      default: null,
    },
    unitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductUnits", // Reference your units collection
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategories", // Reference your categories collection
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 0.0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    inStock: {
      type: Boolean,
      required: true,
      default: true,
    },
    stockCount: {
      type: Number,
      default: 0,
    },
    discount: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    longDescription: {
      type: String,
      default: null,
    },
    features: {
      type: [String],
      default: [],
    },
    specifications: {
  type: Object,
  default: {},
  description: "Technical specifications in key-value format"
},
    benefits: {
      type: [String],
      default: [],
    },
    currencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Currency",
    },
     thomps: {
      type: Boolean,
      default: false,
    },
    bestSellingProducts: {
      type: Boolean,
      default: false,
    },
    signatureFlavorsProducts: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true,
     collection: "products", // enforce exact collection name
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
   },
   
);

// Compound unique index on name + categoryId
productSchema.index({ name: 1, categoryId: 1 }, { unique: true });

const Product = mongoose.model("Products", productSchema);

module.exports = Product;
