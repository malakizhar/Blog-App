"use client";

import { assets } from "@/Assets/assets";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Page = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      if (!isLogin) {
        // Handle user registration
        const response = await axios.post("/api/users/register", {
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });

        if (response.data?.success) {
          toast.success("Registration successful! Please log in.");
          setFormData({ email: "", password: "", confirmPassword: "" });
          setIsLogin(true); // Automatically switch to login view
        } else {
          toast.error(response.data?.message || "Error registering user.");
        }
      } else {
        // Handle user login
        const response = await axios.post("/api/user/login", {
          email: formData.email,
          password: formData.password,
        });

        if (response.data?.success) {
          localStorage.setItem("token", response.data.token);
          if (response.data.admin) {
            router.push("/admin/addProduct"); // Redirect to admin dashboard
          } else {
            router.push("/"); // Redirect to homepage
          }
        } else {
          toast.error(response.data?.message || "Incorrect credentials.");
        }
      }
    } catch (error) {
      console.error("Request error:", error);
      toast.error(error.response?.data?.message || "Error processing request.");
    }
  };

  return (
    <>
      <div className="flex mt-10 ml-8 mb-5">
        <Link href="/">
          <Image src={assets.logo} alt="logo" className="w-[130px]" />
        </Link>
      </div>

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full sm:w-1/2 lg:w-1/4 p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-center">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>

            {!isLogin && (
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="mt-4">
            <button
              type="button"
              className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
              onClick={() => {
                // Implement Google Sign-In logic
                console.log("Google Sign-In Clicked");
              }}
            >
              Sign in with Google
            </button>
          </div>

          <p className="mt-4 text-sm text-center text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin((prev) => !prev)}
              className="ml-1 font-medium text-blue-500 hover:underline focus:outline-none"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;
