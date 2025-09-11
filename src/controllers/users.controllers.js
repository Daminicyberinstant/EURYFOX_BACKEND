const usersService = require("../services/users.service");
const apiResponse = require("../utils/apiResponse");
const statusCode = require("../enums/statusCode");

exports.add = async (req, res) => {
  try {
    const result = await usersService.add(req.body);
    res.status(statusCode.CREATED).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.CREATED,
        result,
        message: "User added successfully",
      })
    );
  } catch (err) {
    console.error("Add User Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Something went wrong while adding user",
      })
    );
  }
};

exports.update = async (req, res) => {
  try {
    const result = await usersService.update(req.body);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        result,
        message: "User updated successfully",
      })
    );
  } catch (err) {
    console.error("Update User Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Something went wrong while updating user",
      })
    );
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await usersService.getById(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        result,
        message: "User retrieved successfully",
      })
    );
  } catch (err) {
    console.error("Get User By ID Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Failed to retrieve user",
      })
    );
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await usersService.getAll();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        result,
        message: "All users retrieved successfully",
      })
    );
  } catch (err) {
    console.error("Get All Users Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Failed to retrieve users",
      })
    );
  }
};

exports.remove = async (req, res) => {
  try {
    await usersService.remove(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "User deleted successfully",
      })
    );
  } catch (err) {
    console.error("Remove User Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Failed to delete user",
      })
    );
  }
};


exports.getByEmail = async (req, res) => {
  try {
    const result = await usersService.getByEmail(req.params.email);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        result,
        message: "User retrieved successfully by email",
      })
    );
  } catch (err) {
    console.error("Get User By Email Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Failed to retrieve user by email",
      })
    );
  }
};