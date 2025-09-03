const currenciesService = require("../services/currencies.service");
const apiResponse = require("../utils/apiResponse");
const statusCode = require("../enums/statusCode");

exports.add = async (req, res) => {
  try {
    const result = await currenciesService.add(req.body);
    res.status(statusCode.CREATED).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.CREATED,
        result,
        message: "Currency added successfully",
      })
    );
  } catch (err) {
    console.error("Add Currency Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Something went wrong while adding currency",
      })
    );
  }
};

exports.update = async (req, res) => {
  try {
    const result = await currenciesService.update(req.body);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        result,
        message: "Currency updated successfully",
      })
    );
  } catch (err) {
    console.error("Update Currency Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Something went wrong while updating currency",
      })
    );
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await currenciesService.getById(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        result,
        message: "Currency retrieved successfully",
      })
    );
  } catch (err) {
    console.error("Get Currency By ID Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Failed to retrieve currency",
      })
    );
  }
};
exports.getAll = async (req, res) => {
  try {
    const result = await currenciesService.getAll();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        result,
        message: "All currencies retrieved successfully",
      })
    );
  } catch (err) {
    console.error("Get All Currencies Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Failed to retrieve currencies",
      })
    );
  }
};

exports.remove = async (req, res) => {
  try {
    await currenciesService.remove(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Currency deleted successfully",
      })
    );
  } catch (err) {
    console.error("Remove Currency Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Failed to delete currency",
      })
    );
  }
};
