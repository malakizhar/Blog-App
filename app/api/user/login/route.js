import connectDB from "@/lib/config/db";
import { NextResponse } from "next/server";
import UsersModel from "@/lib/models/UsersModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const LoadDB = async () => {
  await connectDB();
};

LoadDB();
export async function POST(req) {
    try {
      const body = await req.json();
      const { email, password } = body;
  
      if (!email || !password) {
        return NextResponse.json({
          success: false,
          message: "All fields are required",
        });
      }
  
      const user = await UsersModel.findOne({ email });
      if (!user) {
        return NextResponse.json({
          success: false,
          message: "User does not exist",
        });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return NextResponse.json({
          success: false,
          message: "Invalid credentials",
        });
      }
  
      const token = jwt.sign({ id: user._id, admin: user.admin }, "SECRET_KEY", {
        expiresIn: "1d",
      });
  
      return NextResponse.json({
        success: true,
        message: "Login successful",
        token,
        admin: user.admin, // Return admin status to the client
      });
    } catch (error) {
      return NextResponse.json({
        success: false,
        message: error.message,
      });
    }
  }
  