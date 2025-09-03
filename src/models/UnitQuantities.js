const mongoose = require("mongoose");

const QuantitySchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: [true, "Quantity value is required"], // e.g., "kg", "10kg"
      trim: true,
    },
    label: {
      type: String,
      required: [true, "Quantity label is required"], // e.g., "1 kg"
      trim: true,
    },
    multiplier: {
      type: Number,
      required: [true, "Quantity multiplier is required"], // relative multiplier to base unit
    },
  },
  { _id: false } // we don’t need a separate _id for sub-docs
);

const UnitQuantitiesSchema = new mongoose.Schema(
  {
    unitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductUnits", // Reference to product_units collection
      required: [true, "Unit ID is required"],
      
    },
    quantities: {
      type: [QuantitySchema],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one quantity must be provided",
      },
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, 
    collection: "unit_quantities",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


UnitQuantitiesSchema.index({ unitId: 1 }, { unique: true });

module.exports = mongoose.model("UnitQuantities", UnitQuantitiesSchema);
