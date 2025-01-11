import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String, // Use 'String' instead of 'string'
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  authorImag: {
    type: String, // Corrected to 'String'
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const BlogsModel = mongoose.models.blogs || mongoose.model("blogs", blogSchema);

export default BlogsModel;
