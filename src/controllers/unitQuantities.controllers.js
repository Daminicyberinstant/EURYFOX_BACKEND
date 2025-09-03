const unitQuantitiesService = require("../services/unitQuantities.service");
const apiResponse = require("../utils/apiResponse");
const statusCode = require("../enums/statusCode");

exports.add = async (req, res) => {
  try {
    const result = await unitQuantitiesService.add(req.body);
    res.status(statusCode.CREATED).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.CREATED,
        result,
        message: "Unit quantities added successfully",
      })
    );
  } catch (err) {
    console.error("Add Unit Quantities Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message:
          err.message || "Something went wrong while adding unit quantities",
      })
    );
  }
};

exports.update = async (req, res) => {
  try {
    const result = await unitQuantitiesService.update(req.body);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        result,
        message: "Unit quantities updated successfully",
      })
    );
  } catch (err) {
    console.error("Update Unit Quantities Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message:
          err.message || "Something went wrong while updating unit quantities",
      })
    );
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await unitQuantitiesService.getById(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        result,
        message: "Unit quantities retrieved successfully",
      })
    );
  } catch (err) {
    console.error("Get Unit Quantities By ID Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Failed to retrieve unit quantities",
      })
    );
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await unitQuantitiesService.getAll();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        result,
        message: "All unit quantities retrieved successfully",
      })
    );
  } catch (err) {
    console.error("Get All Unit Quantities Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Failed to retrieve unit quantities",
      })
    );
  }
};


exports.remove = async (req, res) => {
  try {
    await unitQuantitiesService.remove(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Unit quantities deleted successfully",
      })
    );
  } catch (err) {
    console.error("Remove Unit Quantities Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Failed to delete unit quantities",
      })
    );
  }
};

