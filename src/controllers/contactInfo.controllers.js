const contactInfoService = require("../services/contactInfo.service");
const apiResponse = require("../utils/apiResponse");
const statusCode = require("../enums/statusCode");

exports.add = async (req, res) => {
  try {
    const result = await contactInfoService.add(req.body);
    res.status(statusCode.CREATED).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.CREATED,
        result,
        message: "Contact info added successfully",
      })
    );
  } catch (err) {
    console.error("Add Contact Info Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Something went wrong while adding contact info",
      })
    );
  }
};

exports.update = async (req, res) => {
  try {
    const result = await contactInfoService.update(req.body);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        result,
        message: "Contact info updated successfully",
      })
    );
  } catch (err) {
    console.error("Update Contact Info Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Something went wrong while updating contact info",
      })
    );
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await contactInfoService.getById(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        result,
        message: "Contact info retrieved successfully",
      })
    );
  } catch (err) {
    console.error("Get Contact Info By ID Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Failed to retrieve contact info",
      })
    );
  }
};

exports.getActive = async (req, res) => {
  try {
    const result = await contactInfoService.getActive();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        result,
        message: "Active contact info retrieved successfully",
      })
    );
  } catch (err) {
    console.error("Get Active Contact Info Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Failed to retrieve active contact info",
      })
    );
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await contactInfoService.getAll();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        result,
        message: "All contact info retrieved successfully",
      })
    );
  } catch (err) {
    console.error("Get All Contact Info Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Failed to retrieve contact info",
      })
    );
  }
};

exports.remove = async (req, res) => {
  try {
    await contactInfoService.remove(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Contact info deleted successfully",
      })
    );
  } catch (err) {
    console.error("Remove Contact Info Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Failed to delete contact info",
      })
    );
  }
};
