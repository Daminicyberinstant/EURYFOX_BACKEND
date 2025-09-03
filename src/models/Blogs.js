const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Blog name is required"],
    trim: true
  },
  slug: {
    type: String,
    required: [true, "Slug is required"],
    lowercase: true,
    trim: true
  },
  title: {
    type: String,
    required: [true, "Blog title is required"],
    trim: true
  },
  excerpt: {
    type: String,
    required: [true, "Excerpt is required"],
    trim: true
  },
  content: {
    type: [
      {
        heading: { type: String, required: true },
        para: { type: String, required: true }
      }
    ],
    validate: [arr => arr.length > 0, "Content must have at least one section"]
  },
  author: {
    type: String,
    required: [true, "Author name is required"],
    trim: true
  },
  authorRole: {
    type: String,
    default: null,
    trim: true
  },
  authorImage: {
    type: String,
    default: null,
    trim: true
  },
  date: {
    type: Date,
    default:Date.now,
    required: [true, "Date is required"]
  },
  publishedAt: {
    type: Date,
    default:Date.now,
    required: [true, "Publish date is required"]
  },
  readTime: {
    type: String,
    default: null,
    trim: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogsCategory", // reference to your category collection
    required: [true, "Category ID is required"]
  },
  tags: {
    type: [String],
    default: []
  },
  image: {
    type: String,
    default: null,
    trim: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    required: true
  },
  featured: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true,
  collection: "blogs", // exact collection name
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ✅ Index for unique constraint
BlogSchema.index({ name: 1, categoryId: 1 }, { unique: true });


module.exports = mongoose.model("Blogs", BlogSchema);
