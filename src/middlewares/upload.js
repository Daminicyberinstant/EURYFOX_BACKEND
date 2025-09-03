const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Generate unique filename with random 6-digit number
const generateUniqueFilename = (originalName, prefix, index = null) => {
  const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
  const ext = path.extname(originalName).toLowerCase();
  const baseName = prefix.toLowerCase().replace(/[^a-z0-9]/g, "-");

  // if (index !== null) {
  //   const ordinals = [
  //     "first",
  //     "second",
  //     "third",
  //     "fourth",
  //     "fifth",
  //     "sixth",
  //     "seventh",
  //     "eighth",
  //     "ninth",
  //     "tenth",
  //   ];
  //   const ordinal = ordinals[index] || `${index + 1}th`;
  //   return `${baseName}_${ordinal}_${randomNum}${ext}`;
  // }

  return `${baseName}_${randomNum}${ext}`;
};

// ✅ Custom image filter: only jpg, jpeg, png
const imageFilter = (req, file, cb) => {
  const allowedExt = [".jpg", ".jpeg", ".png","webp","gif"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedExt.includes(ext)) {
    return cb(new Error("Only .jpg, .jpeg, .png  , webp, and , gif. image formats are allowed!"), false);
  }
  cb(null, true);
};

// ✅ Create folder if not exists
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};


// -------------------- Dynamic Root Path --------------------
// Root of project is where server.js is run
const PROJECT_ROOT = process.cwd();

// Upload folder outside project (same level)
//const UPLOADS_ROOT = path.join(PROJECT_ROOT, "..", "uploads"); for local  for server use this second one
const UPLOADS_ROOT = path.join(PROJECT_ROOT, "uploads");





// ---------------------- Storages ----------------------

// Storage configuration for categories
const ProductCategoriesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = file.fieldname === "icon"
      ? path.join(UPLOADS_ROOT, "productCategories", "icons")
      : path.join(UPLOADS_ROOT, "productCategories");
    ensureDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const prefix = file.fieldname === "icon"
      ? `${req.body.title || "category"}_icon`
      : req.body.title || "category";
    cb(null, generateUniqueFilename(file.originalname, prefix));
  }
});

// Storage configuration for products
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
 const uploadPath = path.join(UPLOADS_ROOT, "products");
    ensureDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    
    const productName = req.body.name || "product";
    const files = req.files || [];
    const currentIndex = files.indexOf(file);
    cb(null, generateUniqueFilename(file.originalname, productName, currentIndex));
  },
});

// Storage configuration for blog categories
const blogCategoryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(UPLOADS_ROOT, "blog-categories");
    ensureDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const prefix = req.body.name || "blog-category";
    cb(null, generateUniqueFilename(file.originalname, prefix));
  }
});


const blogStorage = multer.diskStorage({

  destination: (req, file, cb) => {
console.log("File : ",file.fieldname);

    const uploadPath = file.fieldname=="authorImage"
    ? path.join(UPLOADS_ROOT, "blogs","authors")  
    : path.join(UPLOADS_ROOT, "blogs");
    ensureDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {

    const prefix =file.fieldname=="authorImage" ? 
     `${req.body.author || "blogs"}_author`
    : req.body.name ||"blogs";
    cb(null, generateUniqueFilename(file.originalname, prefix));
  }
});


// Storage configuration for team members
const teamMemberStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(UPLOADS_ROOT, "teamMembers");
    ensureDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const prefix = req.body.name || "team-member";
    cb(null, generateUniqueFilename(file.originalname, prefix));
  }
});

// ---------------------- Uploaders ----------------------

// ✅ Categories: one image + one icon
const uploadProductCategories = multer({
  storage: ProductCategoriesStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
}).fields([
  { name: "image", maxCount: 1 },
  { name: "icon", maxCount: 1 },
]);

// ✅ Products: multiple images
const uploadProduct = multer({
  storage: productStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).array("images", 100);

// ✅ Blog category
const uploadBlogCategory = multer({
  storage: blogCategoryStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("image");

// ✅ Blog
const uploadBlog = multer({
  storage: blogStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).fields([
  { name: "image", maxCount: 1 },
  { name: "authorImage", maxCount: 1 },
]);

// ✅ Team members
const uploadTeamMember = multer({
  storage: teamMemberStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("image");

module.exports = {
  uploadProductCategories,
  uploadProduct,
  uploadBlogCategory,
  uploadBlog,
  uploadTeamMember,
    UPLOADS_ROOT,
};
