
const productCategoriesServices=require("../services/productCategories.service")
const apiResponse=require("../utils/apiResponse")
const statusCode=require("../enums/statusCode");
exports.create = async (req, res) => {

     try {
    const result = await productCategoriesServices.add(req,res);
    res.status(201).json(apiResponse({
      success: true,
      isException: false,
      statusCode: 201,
      result,
          message: "Product category added successfully",
    }));
  } catch (err) {
    console.log("ERror message : ",err.message);
    res.status(500).json(apiResponse({
      success: false,
      isException: true,
      statusCode: 500,
      result: null,
         message: err.message || "Something went wrong while creating category",
    }));
  }

  };

exports.update = async (req, res) => {

     try {
    const result = await productCategoriesServices.update(req,res);
    res.status(200).json(apiResponse({
      success: true,
      isException: false,
      statusCode: 200,
      result,
          message: "Product category updated successfully",
    }));
  } catch (err) {
    console.log("ERror message : ",err.message);
    res.status(500).json(apiResponse({
      success: false,
      isException: true,
      statusCode: 500,
      result: null,
         message: err.message || "Something went wrong while creating category",
    }));
  }

  };



exports.getAll = async (req, res) => {
  try {
    const categories = await productCategoriesServices.getAll();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Categories retrieved successfully",
        result: categories,
      })
    );
  } catch (err) {
    console.error("GetAll Categories Error:", err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Failed to fetch categories",
      })
    );
  }
};



exports.getById = async (req, res) => {
  try {
    const category = await productCategoriesServices.getById(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Category retrieved successfully",
        result: category,
      })
    );
  } catch (err) {
    console.error("GetById Category Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Category not found",
      })
    );
  }
};




exports.remove = async (req, res) => {
  try {
    await productCategoriesServices.remove(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Category deleted successfully",
      })
    );
  } catch (err) {
    console.error("Remove Category Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        result: null,
        message: err.message || "Failed to delete category",
      })
    );
  }
};

