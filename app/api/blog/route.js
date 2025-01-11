import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path"; // Import path module for resolving directory paths
import connectDB from "@/lib/config/db";
import BlogsModel from "@/lib/models/BlogsModel";
const fs = require("fs");
import { unlink } from "fs/promises";
// Connect to the database
const LoadDB = async () => {
  await connectDB();
};

LoadDB();

// API endpoint to get all blogs
export async function GET(req) {
  try {
    const blogId = req.nextUrl.searchParams.get("id");
    if (blogId) {
      const blog = await BlogsModel.findById(blogId);
      return NextResponse.json({ blog });
    } else {
      const blogs = await BlogsModel.find({});
      return NextResponse.json({ blogs });
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching blogs" },
      { status: 500 }
    );
  }
}

// API endpoint to add a new blog
export async function POST(req) {
  try {
    const formData = await req.formData();
    const timeStamp = Date.now();

    // Ensure image is being received as a file
    const image = formData.get("image");

    if (!image) {
      return NextResponse.json(
        { success: false, message: "Image is required" },
        { status: 400 }
      );
    }

    // Convert the image to a buffer
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);

    // Ensure the public/images directory exists (use absolute path)
    const publicImagesDir = path.join(process.cwd(), "public", "images"); // Create 'images' folder inside public
    await mkdir(publicImagesDir, { recursive: true });

    // Generate a safe filename
    const fileName = `${timeStamp}_${image.name}`;
    const filePath = path.join(publicImagesDir, fileName);

    // Write the file to disk
    await writeFile(filePath, buffer);

    // Set the image URL to be accessed from the public/images directory
    const imageUrl = `/images/${fileName}`; // Reference to the image inside /images/ folder

    // Prepare the blog data
    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      image: imageUrl,
      authorImag: formData.get("authorImag"),
      category: formData.get("category"),
      author: formData.get("author"),
      author_img: formData.get("author_img"),
    };

    // Save the blog to the database
    await BlogsModel.create(blogData);
    console.log("Blog saved");

    return NextResponse.json({ success: true, message: "Blog Added" });
  } catch (error) {
    console.error("Error saving blog:", error);
    return NextResponse.json(
      { success: false, message: "Error saving blog" },
      { status: 500 }
    );
  }
}


//creating api endpoint to delete Blog

// API endpoint to delete a blog
export async function DELETE(req) {
  try {
    // Get the blog ID from query params
    const id = req.nextUrl.searchParams.get("id");

    // Find the blog by its ID
    const blog = await BlogsModel.findById(id);

  
    // Get the image URL from the blog document
    const imageUrl = blog.image;
    const imagePath = path.join(process.cwd(), "public", imageUrl);

    // Delete the blog document from the database
    await BlogsModel.findByIdAndDelete(id);

    // Check if the image file exists and delete it
    try {
      await unlink(imagePath);
      console.log(`Image deleted: ${imagePath}`);
    } catch (error) {
      console.error("Error deleting image:", error);
    }

    // Return a successful response
    return NextResponse.json({ success: true, message: "Blog Deleted" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting blog" },
      { status: 500 }
    );
  }
}