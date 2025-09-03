const statusCode = require("../enums/statusCode");
const CustomError = require("../exceptions/CustomError");
const ProductUnit = require("../models/ProductUnits");
const mongoose = require("mongoose");


const add = async (data) => {
  try {
    // Check if code or name already exists
    const existing = await ProductUnit.findOne({
      $or: [{ code: data.code }, { name: data.name }],
    });

    if (existing) {
      throw new CustomError(
        "Product unit with this code or name already exists",
        statusCode.BAD_REQUEST
      );
    }

    const unit = await ProductUnit.create(data);
    return unit;
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to add product unit",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
};


const update = async (data) => {
  try {
    const id = data.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid product unit ID format", statusCode.BAD_REQUEST);
    }

    const unit = await ProductUnit.findById(id);
    if (!unit) {
      throw new CustomError("Product unit not found", statusCode.NOT_FOUND);
    }

    // Check conflicts with other documents
    const conflict = await ProductUnit.findOne({
      _id: { $ne: id },
      $or: [{ code: data.code }, { name: data.name }],
    });

    if (conflict) {
      throw new CustomError(
        "Product unit with this code or name already exists in another record",
        statusCode.BAD_REQUEST
      );
    }

    // Update allowed fields dynamically
    Object.keys(data).forEach((key) => {
      if (key !== "id") unit[key] = data[key];
    });

    const updatedUnit = await unit.save();
    return updatedUnit;
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to update product unit",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
};


const remove = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid product unit ID format", statusCode.BAD_REQUEST);
    }

    const unit = await ProductUnit.findByIdAndDelete(id);
    if (!unit) {
      throw new CustomError("Product unit not found", statusCode.NOT_FOUND);
    }

    return unit;
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to delete product unit",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
};


const getById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid product unit ID format", statusCode.BAD_REQUEST);
    }

    const unit = await ProductUnit.findById(id);
    if (!unit) {
      throw new CustomError("Product unit not found", statusCode.NOT_FOUND);
    }

    return unit;
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to fetch product unit",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
};


const getAll = async () => {
  try {
    const units = await ProductUnit.find().sort({ createdAt: -1 });
    return units;
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to fetch product units",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  add,
  update,
  remove,
  getById,
  getAll,
};
