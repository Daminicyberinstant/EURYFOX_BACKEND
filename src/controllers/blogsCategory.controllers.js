const blogsCategoryService = require("../services/blogsCategory.service");
const apiResponse = require("../utils/apiResponse");
const statusCode = require("../enums/statusCode");


exports.add = async (req, res) => {
  try {
    const result = await blogsCategoryService.add(req.body);
    res.status(statusCode.CREATED).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.CREATED,
        result,
        message: "Blog category added successfully",
      })
    );
  } catch (err) {
    console.error("Add Blog Category Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Something went wrong while adding blog category",
      })
    );
  }
};

exports.update = async (req, res) => {
  try {
    const result = await blogsCategoryService.update(req.body);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        result,
        message: "Blog category updated successfully",
      })
    );
  } catch (err) {
    console.error("Update Blog Category Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Something went wrong while updating blog category",
      })
    );
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await blogsCategoryService.getById(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        result,
        message: "Blog category retrieved successfully",
      })
    );
  } catch (err) {
    console.error("Get Blog Category By ID Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Failed to retrieve blog category",
      })
    );
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await blogsCategoryService.getAll();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        result,
        message: "All blog categories retrieved successfully",
      })
    );
  } catch (err) {
    console.error("Get All Blog Categories Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Failed to retrieve blog categories",
      })
    );
  }
};

exports.remove = async (req, res) => {
  try {
    await blogsCategoryService.remove(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Blog category deleted successfully",
      })
    );
  } catch (err) {
    console.error("Remove Blog Category Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Failed to delete blog category",
      })
    );
  }
};

exports.getAllCategoryNames = async (req, res) => {
  try {
    const result = await blogsCategoryService.getAllCategory();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        result,
        message: "All category names retrieved successfully",
      })
    );
  } catch (err) {
    console.error("Get All Category Names Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Failed to retrieve category names",
      })
    );
  }
};
