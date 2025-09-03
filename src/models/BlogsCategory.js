const mongoose = require("mongoose");

const BlogsCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "blogs_category",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


BlogsCategorySchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model("BlogsCategory", BlogsCategorySchema);
