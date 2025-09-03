const productUnitsService = require("../services/productUnits.service");
const apiResponse = require("../utils/apiResponse");
const statusCode = require("../enums/statusCode");


exports.add = async (req, res) => {
  try {
    const result = await productUnitsService.add(req.body);
    res.status(statusCode.CREATED).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.CREATED,
        result,
        message: "Product unit added successfully",
      })
    );
  } catch (err) {
    console.error("Add Product Unit Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Something went wrong while adding product unit",
      })
    );
  }
};

exports.update = async (req, res) => {
  try {
    const result = await productUnitsService.update(req.body);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        result,
        message: "Product unit updated successfully",
      })
    );
  } catch (err) {
    console.error("Update Product Unit Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Something went wrong while updating product unit",
      })
    );
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await productUnitsService.getById(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        result,
        message: "Product unit retrieved successfully",
      })
    );
  } catch (err) {
    console.error("Get Product Unit By ID Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Failed to retrieve product unit",
      })
    );
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await productUnitsService.getAll();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        result,
        message: "All product units retrieved successfully",
      })
    );
  } catch (err) {
    console.error("Get All Product Units Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Failed to retrieve product units",
      })
    );
  }
};

exports.remove = async (req, res) => {
  try {
    await productUnitsService.remove(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Product unit deleted successfully",
      })
    );
  } catch (err) {
    console.error("Remove Product Unit Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Failed to delete product unit",
      })
    );
  }
};
