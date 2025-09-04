const statusCode = require("../enums/statusCode");
const Blogs = require("../models/Blogs");
const BlogsCategory = require("../models/BlogsCategory");
const CustomError = require("../exceptions/CustomError");
const fs = require("fs");
const path = require("path");
const { UPLOADS_ROOT } = require("../middlewares/upload");
const mongoose = require("mongoose");


const add = async (req, res) => {
  const uploadedFiles = [];
  try {
    const data = req.body;
    const files = req.files;

    // Validate required fields
    if (!files?.image?.[0]) {
      throw new CustomError("Blog image is required", statusCode.BAD_REQUEST);
    }

    
    const imageRelativePath = path.join("uploads", "blogs", files.image[0].filename);
    const imageFullPath = path.join(UPLOADS_ROOT, "blogs", files.image[0].filename);
    uploadedFiles.push(imageFullPath);

 
    let authorImageRelativePath = null;
    if (files?.authorImage?.[0]) {
      authorImageRelativePath = path.join("uploads", "blogs", "authors", files.authorImage[0].filename);
      const authorImageFullPath = path.join(UPLOADS_ROOT, "blogs", "authors", files.authorImage[0].filename);
      uploadedFiles.push(authorImageFullPath);
    }

    if (!data.categoryId) {
      throw new CustomError("Blog category ID is required", statusCode.BAD_REQUEST);
    }
    if (!mongoose.Types.ObjectId.isValid(data.categoryId)) {
      throw new CustomError("Invalid category ID format", statusCode.BAD_REQUEST);
    }

    const categoryExists = await BlogsCategory.findById(data.categoryId);
    if (!categoryExists) {
      throw new CustomError("Referenced Blog Category does not exist", statusCode.NOT_FOUND);
    }

   

    
    if (data.name) {
      data.slug = data.name.trim().toLowerCase().replace(/\s+/g, "-");
    }

    
    // data.date = new Date(data.date);
    // data.publishedAt = new Date(data.publishedAt);

    
    if (typeof data.content === "string") {
      try { data.content = JSON.parse(data.content); } catch { /* ignore parse error */ }
    }

    data.image = imageRelativePath;
    data.authorImage = authorImageRelativePath;

    
    const nameConflict = await Blogs.findOne({ name: data.name, categoryId: data.categoryId });
    if (nameConflict) {
      throw new CustomError("Blog with this name already exists in the category", statusCode.CONFLICT);
    }

    
    const blog = await Blogs.create(data);
    return blog;
  } catch (error) {
    
    for (const filePath of uploadedFiles) {
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch {}
    }
    throw error;
  }
};


const getById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError("Invalid Blog ID format", statusCode.BAD_REQUEST);
  }

  const blog = await Blogs.findById(id).populate("categoryId", "name category");
  if (!blog) {
    throw new CustomError("Blog not found", statusCode.NOT_FOUND);
  }
  return blog;
};

const getAll = async () => {
  const blogs = await Blogs.find({})
    .populate("categoryId", "name category")
    .sort({ createdAt: -1 }); // Optional: newest first

  

  return blogs;
};

const getAllFiltered = async () => {
  const blogs = await Blogs.aggregate([
    {
      $lookup: {
        from: "blogs_category", // collection name in MongoDB
        localField: "categoryId",
        foreignField: "_id",
        as: "category"
      }
    },
    {
      $unwind: {
        path: "$category",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        _id: 0, // hide original _id
        id: "$_id",
        name: 1,
        slug: 1,
        title: 1,
        excerpt: 1,
        author: 1,
        date: 1,
        readTime: 1,
        image: 1,
        featured: 1,
        category: "$category.name"
      }
    },
    {
      $sort: { createdAt: -1 }
    }
  ]);

  return blogs;
};



const update = async (req, res) => {
  const { body, files } = req;
  const uploadedFiles = [];

  if (!mongoose.Types.ObjectId.isValid(body.id)) {
    
    if (files?.image?.[0]) {
      const tempImage = path.join(UPLOADS_ROOT, "blogs", files.image[0].filename);
      if (fs.existsSync(tempImage)) fs.unlinkSync(tempImage);
    }
    if (files?.authorImage?.[0]) {
      const tempAuthorImage = path.join(UPLOADS_ROOT, "blogs", "authors", files.authorImage[0].filename);
      if (fs.existsSync(tempAuthorImage)) fs.unlinkSync(tempAuthorImage);
    }
    throw new CustomError("Invalid Blog ID format", statusCode.BAD_REQUEST);
  }

  const blog = await Blogs.findById(body.id);
  if (!blog) {
    // cleanup newly uploaded temp files
    if (files?.image?.[0]) {
      const tempImage = path.join(UPLOADS_ROOT, "blogs", files.image[0].filename);
      if (fs.existsSync(tempImage)) fs.unlinkSync(tempImage);
    }
    if (files?.authorImage?.[0]) {
      const tempAuthorImage = path.join(UPLOADS_ROOT, "blogs", "authors", files.authorImage[0].filename);
      if (fs.existsSync(tempAuthorImage)) fs.unlinkSync(tempAuthorImage);
    }
    throw new CustomError("Blog not found", statusCode.NOT_FOUND);
  }

  try {
    // Handle name/slug & uniqueness in same category
    if (body.name && body.name.trim() !== blog.name) {
      const conflict = await Blogs.findOne({
        _id: { $ne: body.id },
        name: body.name.trim(),
        categoryId: blog.categoryId
      });
      if (conflict) {
        throw new CustomError("Another blog with this name exists in this category", statusCode.CONFLICT);
      }
      blog.name = body.name.trim();
      blog.slug = (body.name).trim().toLowerCase().replace(/\s+/g, "-");
    }

 

    
    if (body.title !== undefined) blog.title = body.title;
    if (body.excerpt !== undefined) blog.excerpt = body.excerpt;
    if (body.author !== undefined) blog.author = body.author;
    if (body.authorRole !== undefined) blog.authorRole = body.authorRole;
    if (body.readTime !== undefined) blog.readTime = body.readTime;
    if (body.isActive !== undefined) blog.isActive = body.isActive;
    if (body.featured !== undefined) blog.featured = body.featured;
    if (body.date !== undefined) blog.date = new Date(body.date);
    if (body.publishedAt !== undefined) blog.publishedAt = new Date(body.publishedAt);

    // Content may arrive stringified JSON
    if (body.content !== undefined) {
      blog.content = typeof body.content === "string" ? JSON.parse(body.content) : body.content;
    }

    // Category change (validate)
    if (body.categoryId && body.categoryId !== blog.categoryId.toString()) {
      if (!mongoose.Types.ObjectId.isValid(body.categoryId)) {
        throw new CustomError("Invalid category ID format", statusCode.BAD_REQUEST);
      }
      const categoryExists = await BlogsCategory.findById(body.categoryId);
      if (!categoryExists) {
        throw new CustomError("Referenced Blog Category does not exist", statusCode.NOT_FOUND);
      }

      // Also ensure (name, categoryId) uniqueness when moving categories
      const conflict = await Blogs.findOne({
        _id: { $ne: body.id },
        name: blog.name,
        categoryId: body.categoryId
      });
      if (conflict) {
        throw new CustomError("A blog with this name already exists in the target category", statusCode.CONFLICT);
      }

      blog.categoryId = body.categoryId;
    }

    // Handle main image update
    if (files?.image?.[0]) {
      const newImageRelPath = path.join("uploads", "blogs", files.image[0].filename);
      const newImageFullPath = path.join(UPLOADS_ROOT, "blogs", files.image[0].filename);
      uploadedFiles.push(newImageFullPath);

      if (blog.image) {
        const oldImageFullPath = path.resolve(path.join(UPLOADS_ROOT, blog.image.replace(/^uploads[\\/]/, "")));
        if (fs.existsSync(oldImageFullPath)) fs.unlinkSync(oldImageFullPath);
      }
      blog.image = newImageRelPath;
    }

    // Handle author image update
    if (files?.authorImage?.[0]) {
      const newAuthorRelPath = path.join("uploads", "blogs", "authors", files.authorImage[0].filename);
      const newAuthorFullPath = path.join(UPLOADS_ROOT, "blogs", "authors", files.authorImage[0].filename);
      uploadedFiles.push(newAuthorFullPath);

      if (blog.authorImage) {
        const oldAuthorFullPath = path.resolve(path.join(UPLOADS_ROOT, blog.authorImage.replace(/^uploads[\\/]/, "")));
        if (fs.existsSync(oldAuthorFullPath)) fs.unlinkSync(oldAuthorFullPath);
      }
      blog.authorImage = newAuthorRelPath;
    }

    const updatedBlog = await blog.save();
    return updatedBlog;
  } catch (error) {
    // Cleanup any newly uploaded files on error
    for (const filePath of uploadedFiles) {
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch {}
    }
    throw error;
  }
};


const remove = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError("Invalid Blog ID format", statusCode.BAD_REQUEST);
  }

  const blog = await Blogs.findById(id);
  if (!blog) {
    throw new CustomError("Blog not found", statusCode.NOT_FOUND);
  }

  
  if (blog.image) {
    const relativePath = blog.image.replace(/^uploads[\\/]/, "");
    const imageFullPath = path.resolve(path.join(UPLOADS_ROOT, relativePath));
    try {
      if (fs.existsSync(imageFullPath)) fs.unlinkSync(imageFullPath);
    } catch (err) {
      console.error("Failed to delete image:", imageFullPath, err);
    }
  }

  // Delete author image
  if (blog.authorImage) {
    const relativePath = blog.authorImage.replace(/^uploads[\\/]/, "");
    const authorImageFullPath = path.resolve(path.join(UPLOADS_ROOT, relativePath));
    try {
      if (fs.existsSync(authorImageFullPath)) fs.unlinkSync(authorImageFullPath);
    } catch (err) {
      console.error("Failed to delete author image:", authorImageFullPath, err);
    }
  }

  const deletedBlog = await Blogs.findByIdAndDelete(id);
  return deletedBlog;
};


const getActive = async () => {
  const blogs = await Blogs.find({ isActive: true })
    .populate("categoryId", "name category")
    .sort({ createdAt: -1 });

  return blogs;
};


const getByBlogsCategory = async (categoryId) => {
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    throw new CustomError("Invalid Category ID format", statusCode.BAD_REQUEST);
  }

  const categoryExists = await BlogsCategory.findById(categoryId);
  if (!categoryExists) {
    throw new CustomError("Blog Category not found", statusCode.NOT_FOUND);
  }

  const blogs = await Blogs.find({ categoryId })
    .populate("categoryId", "name category")
    .sort({ createdAt: -1 });

  return blogs;
};


const getFeaturedBlogs = async () => {
  const blogs = await Blogs.find({ featured: true, isActive: true })
    .populate("categoryId", "name category")
    .sort({ createdAt: -1 });

  return blogs;
};


const getByName = async (name) => {
  if (!name || typeof name !== "string") {
    throw new CustomError("Invalid blog name", statusCode.BAD_REQUEST);
  }

  // Find the blog by name and populate its category
  const blog = await Blogs.findOne({ slug:name }).populate("categoryId", "name category");

  if (!blog) {
    throw new CustomError("Blog not found", statusCode.NOT_FOUND);
  }

  return blog;
};




module.exports = {
  add,
  getById,
  getAll,
  update,
  remove,
  getActive,
  getByBlogsCategory,
  getFeaturedBlogs,
  getByName,
  getAllFiltered,
};
