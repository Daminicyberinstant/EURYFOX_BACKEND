const mongoose = require("mongoose");

const CurrenciesSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Currency name is required"],
      trim: true,
      
    },
    flag: {
      type: String,
      required: [true, "Country flag code is required"],
      trim: true,
      
    },
    currency: {
      type: String,
      required: [true, "Currency code is required"],
      trim: true,
      
    },
    rate: {
      type: String,
      required: [true, "Currency rate is required"],
    },
    symbol: {
      type: String,
      required: [true, "Currency symbol is required"],
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
    collection: "currencies",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ✅ Optional: Add indexes (though unique fields already have implicit indexes)
CurrenciesSchema.index({ name: 1 }, { unique: true });
CurrenciesSchema.index({ flag: 1 }, { unique: true });
CurrenciesSchema.index({ currency: 1 }, { unique: true });

module.exports = mongoose.model("Currencies", CurrenciesSchema);
