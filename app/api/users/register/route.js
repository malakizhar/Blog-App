import connectDB from "@/lib/config/db";
import { NextResponse } from "next/server";
import UsersModel from "@/lib/models/UsersModel";
import bcrypt from "bcryptjs";

const LoadDB = async () => {
  await connectDB();
};
LoadDB();

const ADMIN_EMAIL = "admin@example.com";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, confirmPassword } = body;

    // Validate required fields
    if (!email || !password || !confirmPassword) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      return NextResponse.json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Check if user already exists
    const existingUser = await UsersModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the email matches the predefined admin email
    const isAdmin = email === ADMIN_EMAIL;

    // Save the new user, excluding confirmPassword
    const newUser = new UsersModel({
      email,
      password: hashedPassword,
      admin: isAdmin,
    });

    await newUser.save();

    return NextResponse.json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
