const blogsService = require("../services/blogs.service");
const apiResponse = require("../utils/apiResponse");
const statusCode = require("../enums/statusCode");

exports.add = async (req, res) => {
  try {
    const result = await blogsService.add(req, res);
    res.status(statusCode.CREATED).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.CREATED,
        message: "Blog created successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Create Blog Error:", err.message);
    res.status(500).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: 500,
        result: null,
        message: err.message || "Something went wrong while creating blog",
      })
    );
  }
};

exports.update = async (req, res) => {
  try {
    const result = await blogsService.update(req, res);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Blog updated successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Update Blog Error:", err.message);
    res.status(500).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: 500,
        result: null,
        message: err.message || "Something went wrong while updating blog",
      })
    );
  }
};

exports.getAll = async (req, res) => {
  try {
    const blogs = await blogsService.getAll();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Blogs retrieved successfully",
        result: blogs,
      })
    );
  } catch (err) {
    console.error("GetAll Blogs Error:", err);
    res.status(500).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: 500,
        result: null,
        message: err.message || "Failed to fetch blogs",
      })
    );
  }
};



exports.getAllFiltered = async (req, res) => {
  try {
    const blogs = await blogsService.getAllFiltered();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Blogs retrieved successfully",
        result: blogs,
      })
    );
  } catch (err) {
    console.error("GetAll Blogs Error:", err);
    res.status(500).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: 500,
        result: null,
        message: err.message || "Failed to fetch blogs",
      })
    );
  }
};


exports.getById = async (req, res) => {
  try {
    const blog = await blogsService.getById(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Blog retrieved successfully",
        result: blog,
      })
    );
  } catch (err) {
    console.error("GetById Blog Error:", err);
    res.status(err.statusCode || 500).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || 500,
        result: null,
        message: err.message || "Blog not found",
      })
    );
  }
};

exports.remove = async (req, res) => {
  try {
    await blogsService.remove(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Blog deleted successfully",
      })
    );
  } catch (err) {
    console.error("Remove Blog Error:", err);
    res.status(err.statusCode || 500).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || 500,
        result: null,
        message: err.message || "Failed to delete blog",
      })
    );
  }
};


exports.getAllActive = async (req, res) => {
  try {
    const blogs = await blogsService.getActive();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Active blogs retrieved successfully",
        result: blogs,
      })
    );
  } catch (err) {
    console.error("GetAllActive Blogs Error:", err);
    res.status(500).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: 500,
        result: null,
        message: err.message || "Failed to fetch active blogs",
      })
    );
  }
};






exports.getByCategory = async (req, res) => {
  try {
    const blogs = await blogsService.getByBlogsCategory(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Blogs retrieved successfully by category",
        result: blogs,
      })
    );
  } catch (err) {
    console.error("Get Blogs By Category Error:", err);
    res.status(500).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: 500,
        result: null,
        message: err.message || "Failed to fetch blogs by category",
      })
    );
  }
};



exports.getFeatured = async (req, res) => {
  try {
    const blogs = await blogsService.getFeaturedBlogs();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Featured blogs retrieved successfully",
        result: blogs,
      })
    );
  } catch (err) {
    console.error("Get Featured Blogs Error:", err);
    res.status(500).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: 500,
        result: null,
        message: err.message || "Failed to fetch featured blogs",
      })
    );
  }
};


exports.getByName = async (req, res) => {
  try {
    const blog = await blogsService.getByName(req.params.name);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Blog retrieved successfully",
        result: blog,
      })
    );
  } catch (err) {
    console.error("GetById Blog Error:", err);
    res.status(err.statusCode || 500).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || 500,
        result: null,
        message: err.message || "Blog not found",
      })
    );
  }
};
