"use client";
import { useEffect, useState } from "react";
import BlogTableItem from "@/components/AdminComponenets/BlogTableItem";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const page = () => {
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      setBlogs(response.data.blogs);
    } catch (error) {
      toast.error();
    }
  };

  const deleteBlogs = async (mongoId) => {
    try {
      const response = await axios.delete("/api/blog", {
        params: {
          id: mongoId,
        },
      });
      toast.success(response.data.message);
      fetchBlogs();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting blog");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Blogs</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 bg-gray-50 text-left uppercase">
            <tr>
              <th scope="col" className="hidden sm:table-cell px-6 py-3">
                Author Name
              </th>
              <th scope="col" className="hidden sm:table-cell px-6 py-3">
                Blog Title
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item, index) => {
              return (
                <BlogTableItem
                  key={index}
                  mongoId={item._id}
                  authorImg={item.authorImg}
                  title={item.title}
                  author={item.author}
                  date={item.date}
                  deleteBlogs={deleteBlogs}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
