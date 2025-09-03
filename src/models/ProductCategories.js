const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Category title is required"],
    trim: true,

  },
  icon: {
    type: String,
    required: [true, "Category icon is required"],
    trim: true
  },
  category: {
    type: String,
    required: [true, "Category slug is required"],
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, "Category description is required"],
    trim: true
  },
  image: {
    type: String,
    required: [true, "Category image path is required"],
    trim: true
  }
}, {
  timestamps: true, // adds createdAt, updatedAt
  collection: "product_categories", // enforce exact collection name
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ✅ Indexes
CategorySchema.index({ title: 1 }, { unique: true }); // matches db.product_categories.createIndex
CategorySchema.index({ category: 1 }); // useful for fast lookups by slug/category

// Export model
module.exports = mongoose.model("ProductCategories", CategorySchema);
