// models/ProductUnit.js
const mongoose = require("mongoose");

const ProductUnitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      
      trim: true,
    },
    code: {
      type: String,
      required: true,
      
      trim: true,
    },
    type: {
      type: String,
      default: "other", // default type if not provided
      trim: true,
    },
    description: {
      type: String,
      default: null,
      trim: true,
    },
  },
  { timestamps: true,
     collection: "product_units", // enforce exact collection name
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
   } // adds createdAt and updatedAt
);

// Optional: create indexes (Mongoose usually does this automatically for `unique`)
ProductUnitSchema.index({ code: 1 }, { unique: true });
ProductUnitSchema.index({ name: 1 }, { unique: true });


module.exports = mongoose.model("ProductUnits", ProductUnitSchema);
