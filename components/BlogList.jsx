import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";
import { toast } from "react-toastify";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      setBlogs(response.data.blogs);
      console.log(response.data.blogs);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error fetching blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter logic
  const filteredBlogs =
    menu === "All"
      ? blogs
      : blogs.filter(
          (item) =>
            item.category && item.category.toLowerCase() === menu.toLowerCase()
        );

  return (
    <div>
      <div className="flex justify-center gap-3 my-10 mx-3 p-3 ">
        <button
          onClick={() => setMenu("All")}
          className={
            menu === "All"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : "py-1 px-4 rounded-sm"
          }
        >
          All
        </button>
        <button
          onClick={() => setMenu("lifestyle")}
          className={
            menu === "lifestyle"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : "py-1 px-4 rounded-sm"
          }
        >
          Lifestyle
        </button>
        <button
          onClick={() => setMenu("startup")}
          className={
            menu === "startup"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : "py-1 px-4 rounded-sm"
          }
        >
          Startup
        </button>
        <button
          onClick={() => setMenu("technology")}
          className={
            menu === "technology"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : "py-1 px-4 rounded-sm"
          }
        >
          Technology
        </button>
      </div>
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 cursor-pointer xl:mx-24">
        {filteredBlogs.map((item, index) => (
          <BlogItem
            key={index}
            title={item.title}
            description={item.description}
            category={item.category}
            image={item.image}
            id={item._id}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
