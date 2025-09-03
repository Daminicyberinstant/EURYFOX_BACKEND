const CustomError = require("../exceptions/CustomError");
const UnitQuantities = require("../models/UnitQuantities");
const ProductUnits=require("../models/ProductUnits");
const mongoose = require("mongoose");


const add = async (data) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(data.unitId)) {
      throw new CustomError("Invalid unit Id ID format", 400);
    }


    const existing = await UnitQuantities.findOne({ unitId: data.unitId });
    if (existing) {
      throw new CustomError(
        "Quantities for this product unit already exist",
        400
      );
    }


const productExists = await ProductUnits.exists({ _id: data.unitId });
if (!productExists) {
  throw new CustomError(
    "Selected Product Unit does not exist",
    400
  );
}


    const unitQuantities = await UnitQuantities.create(data);
    return unitQuantities;
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to add unit quantities",
      error.statusCode || 500
    );
  }
};


const update = async (data) => {
  try {
    const id = data.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid unit quantities ID format", 400);
    }

    const unitQuantities = await UnitQuantities.findById(id);
    if (!unitQuantities) {
      throw new CustomError("Unit quantities not found", 404);
    }
if(data.unitId)
  { 
    if (!mongoose.Types.ObjectId.isValid(data.unitId)) {
        throw new CustomError("Invalid unit ID format", 400);
      }


const productExists = await ProductUnits.exists({ _id: data.unitId });
if (!productExists) {
  throw new CustomError(
    "Selected Product Unit does not exist",
    400
  );
}

  }
    
    if (data.unitId) {
      const conflict = await UnitQuantities.findOne({
        _id: { $ne: id },
        unitId: data.unitId,
      });

      if (conflict) {
        throw new CustomError(
          "Quantities for this unit already exist in another record",
          400
        );
      }
    }


    Object.keys(data).forEach((key) => {
      if (key !== "id") unitQuantities[key] = data[key];
    });

    const updatedUnitQuantities = await unitQuantities.save();
    return updatedUnitQuantities;
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to update unit quantities",
      error.statusCode || 500
    );
  }
};

const remove = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid unit quantities ID format", 400);
    }

    const unitQuantities = await UnitQuantities.findByIdAndDelete(id);
    if (!unitQuantities) {
      throw new CustomError("Unit quantities not found", 404);
    }

    return unitQuantities;
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to delete unit quantities",
      error.statusCode || 500
    );
  }
};

const getById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid unit quantities ID format", 400);
    }

    const unitQuantities = await UnitQuantities.findById(id).populate("unitId");
    if (!unitQuantities) {
      throw new CustomError("Unit quantities not found", 404);
    }

    return unitQuantities;
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to fetch unit quantities",
      error.statusCode || 500
    );
  }
};

const getAll = async () => {
  try {
    const unitQuantitiesList = await UnitQuantities.find()
      .populate("unitId")
      .sort({ createdAt: -1 });

    return unitQuantitiesList;
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to fetch unit quantities",
      error.statusCode || 500
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
