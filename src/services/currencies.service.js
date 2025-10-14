const statusCode = require("../enums/statusCode");
const CustomError = require("../exceptions/CustomError");
const Currencies = require("../models/Currencies");
const mongoose = require("mongoose");

const add = async (data) => {
  try {

      data.currency = data.currency?.toUpperCase();
    data.code = data.currency; 
    data.flag = data.flag?.toUpperCase();
    data.name = data.name?.trim(); 


console.log("Data code : ",data.code);
    const existing = await Currencies.findOne({
      $or: [
        { currency: data.currency },
        { name: data.name },
        { flag: data.flag },
      ],
    });
    

    if (existing) {
      throw new CustomError(
        "Currency, name, or flag already exists",
        statusCode.BAD_REQUEST
      );
    }


    const currency = await Currencies.create(data);
    return currency;
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to add currency",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
};

const update = async (data) => {
  try {
    const id = data.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid currency ID format", statusCode.BAD_REQUEST);
    }

    const currency = await Currencies.findById(id);
    if (!currency) {
      throw new CustomError("Currency not found", statusCode.NOT_FOUND);
    }

   if (data.currency) {
      data.currency = data.currency.toUpperCase();
      data.code = data.currency;
    }
    if (data.flag) data.flag = data.flag.toUpperCase();
    if (data.name) data.name = data.name.trim();

    // Check if the updated currency, name, or flag already exists in other records
    const conflict = await Currencies.findOne({
      _id: { $ne: id },
      $or: [
        { currency: data.currency },
        { name: data.name },
        { flag: data.flag },
      ],
    });
    if (conflict) {
      throw new CustomError(
        "Currency, name, or flag already exists in another record",
        statusCode.BAD_REQUEST
      );
    }

    Object.keys(data).forEach((key) => {
      if (key !== "id") currency[key] = data[key];
    });
  
    
    const updatedCurrency = await currency.save();
    return updatedCurrency;
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to update currency",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
};

const remove = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid currency ID format", statusCode.BAD_REQUEST);
    }

    const currency = await Currencies.findByIdAndDelete(id);
    if (!currency) {
      throw new CustomError("Currency not found", statusCode.NOT_FOUND);
    }

    return currency;
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to delete currency",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
};

const getById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid currency ID format", statusCode.BAD_REQUEST);
    }

    const currency = await Currencies.findById(id);
    if (!currency) {
      throw new CustomError("Currency not found", statusCode.NOT_FOUND);
    }

    return currency;
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to fetch currency",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
};

const getAll = async () => {
  try {
    const currencies = await Currencies.find().sort({ createdAt: -1 });
    return currencies;
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to fetch currencies",
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
