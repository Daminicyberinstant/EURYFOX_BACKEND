const statusCode = require("../enums/statusCode");
const CustomError = require("../exceptions/CustomError");
const BlogsCategory = require("../models/BlogsCategory");
const mongoose = require("mongoose");


const add = async (data) => {
  try {
    
    const existing = await BlogsCategory.findOne({ name: data.name });
    if (existing) {
      throw new CustomError("Category name already exists", statusCode.BAD_REQUEST);
    }
data.category=data.name;

    const category = await BlogsCategory.create(data);
    return category;
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to add blog category",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
};

const update = async (data) => {
  try {
    const id = data.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid category ID format", statusCode.BAD_REQUEST);
    }

    const category = await BlogsCategory.findById(id);
    if (!category) {
      throw new CustomError("Blog category not found", statusCode.NOT_FOUND);
    }


    if (data.name) {
      const conflict = await BlogsCategory.findOne({
        _id: { $ne: id },
        name: data.name,
      });
      if (conflict) {
        throw new CustomError(
          "Category name already exists in another record",
          statusCode.BAD_REQUEST
        );
      }
    }
if(data.name) category.category=data.name;

    Object.keys(data).forEach((key) => {
      if (key !== "id") category[key] = data[key];
    });

    const updatedCategory = await category.save();
    return updatedCategory;
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to update blog category",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
};


const remove = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid category ID format", statusCode.BAD_REQUEST);
    }

    const category = await BlogsCategory.findByIdAndDelete(id);
    if (!category) {
      throw new CustomError("Blog category not found", statusCode.NOT_FOUND);
    }

    return category;
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to delete blog category",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
};

const getById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid category ID format", statusCode.BAD_REQUEST);
    }

    const category = await BlogsCategory.findById(id);
    if (!category) {
      throw new CustomError("Blog category not found", statusCode.NOT_FOUND);
    }

    return category;
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to fetch blog category",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
};

const getAll = async () => {
  try {
    const categories = await BlogsCategory.find().sort({ createdAt: -1 });
    return categories;
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to fetch blog categories",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
};
const getAllCategory = async () => {
  try {
    const categories = await BlogsCategory.find({}, { category: 1, _id: 0 }).sort({ createdAt: -1 });
    return categories.map((item) => item.category);
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to fetch category names",
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
  getAllCategory
};
