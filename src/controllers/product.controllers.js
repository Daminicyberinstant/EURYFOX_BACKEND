const productService = require("../services/product.service");
const statusCode = require("../enums/statusCode");

const apiResponse = require("../utils/apiResponse");


const add = async (req, res) => {
  try {
    const product = await productService.add(req, res);
    return res.status(statusCode.CREATED).json(apiResponse({
      success: true,
      isException: false,
      statusCode: statusCode.CREATED,
      result: product,
      message: "Product added successfully",
    }));
  } catch (error) {
    return res.status(500).json(apiResponse({
      success: false,
      isException: true,
      statusCode: 500,
      result: null,
      message: error.message || "Something went wrong while adding product",
    }));
  }
};


const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getById(id);
    return res.status(statusCode.OK).json(apiResponse({
      success: true,
      isException: false,
      statusCode: statusCode.OK,
      result: product,
      message: "Product fetched successfully",
    }));
  } catch (error) {
    return res.status(500).json(apiResponse({
      success: false,
      isException: true,
      statusCode: 500,
      result: null,
      message: error.message || "Something went wrong while fetching product",
    }));
  }
};

const getAll = async (req, res) => {
  try {
    const products = await productService.getAll();
    return res.status(statusCode.OK).json(apiResponse({
      success: true,
      isException: false,
      statusCode: statusCode.OK,
      result: products,
      message: "Products fetched successfully",
    }));
  } catch (error) {
    return res.status(500).json(apiResponse({
      success: false,
      isException: true,
      statusCode: 500,
      result: null,
      message: error.message || "Something went wrong while fetching products",
    }));
  }
};
const update = async (req, res) => {
  try {
    const updatedProduct = await productService.update(req, res);
    return res.status(statusCode.OK).json(apiResponse({
      success: true,
      isException: false,
      statusCode: statusCode.OK,
      result: updatedProduct,
      message: "Product updated successfully",
    }));
  } catch (error) {
    return res.status(500).json(apiResponse({
      success: false,
      isException: true,
      statusCode: 500,
      result: null,
      message: error.message || "Something went wrong while updating product",
    }));
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productService.remove(id);
    return res.status(statusCode.OK).json(apiResponse({
      success: true,
      isException: false,
      statusCode: statusCode.OK,
      result: deletedProduct,
      message: "Product deleted successfully",
    }));
  } catch (error) {
    return res.status(500).json(apiResponse({
      success: false,
      isException: true,
      statusCode: 500,
      result: null,
      message: error.message || "Something went wrong while deleting product",
    }));
  }
};



const getAllProductsWithCategories = async (req, res) => {
  try {
    const products = await productService.getCategoriesWithProducts();
    return res.status(statusCode.OK).json(apiResponse({
      success: true,
      isException: false,
      statusCode: statusCode.OK,
      result: products,
      message: "Products fetched successfully",
    }));
  } catch (error) {
    return res.status(500).json(apiResponse({
      success: false,
      isException: true,
      statusCode: 500,
      result: null,
      message: error.message || "Something went wrong while fetching products",
    }));
  }
};


const addProductImages = async (req, res) => {
  try {
    const productId = req.body.id;
    console.log("Name : ",req.body.name);
    const files = req.files; // array of uploaded files
    const updatedProduct = await productService.addImages(productId, files);
    return res.status(statusCode.OK).json(apiResponse({
      success: true,
      isException: false,
      statusCode: statusCode.OK,
      result: updatedProduct,
      message: "Images Added successfully",
    }));
  } catch (error) {
    return res.status(500).json(apiResponse({
      success: false,
      isException: true,
      statusCode: 500,
      result: null,
      message: error.message || "Something went wrong while updating product",
    }));
  }
};




const getByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getByCategoryId(id);
    return res.status(statusCode.OK).json(apiResponse({
      success: true,
      isException: false,
      statusCode: statusCode.OK,
      result: product,
      message: "Product fetched successfully",
    }));
  } catch (error) {
    return res.status(500).json(apiResponse({
      success: false,
      isException: true,
      statusCode: 500,
      result: null,
      message: error.message || "Something went wrong while fetching product",
    }));
  }
};





module.exports = {
  add,
  getById,
  getAll,
  update,
  remove,
  getAllProductsWithCategories,
  addProductImages,
  getByCategory
};
