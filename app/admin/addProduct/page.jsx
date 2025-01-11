'use client';
import { assets } from "@/Assets/assets";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";

const page = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "startup", // Default category set here
    author: "Alex Bennett",
    authorImg: "/author_img.png", // Updated field
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image); // Thumbnail image
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category); // Ensuring correct category is submitted
    formData.append("author", data.author);
    formData.append("authorImag", data.authorImag); // Author image field

    try {
      const response = await axios.post("/api/blog", formData);
      console.log(response);

      if (response.data.success) {
        toast.success(response.data.message);
        setImage(false)
        setData({
          title: "",
          description: "",
          category: "Lifestyle", // Reset category to default
          author: "Alex Bennett",
          authorImag: "/author_img.png",
        })
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(
          error.response.data.message || "Something went wrong on the server."
        );
      } else {
        toast.error("An error occurred.");
      }
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="pt-5 px-5 sm:pt-12 sm:pl-16 mb-9"
      >
        <p className="text-md font-bold">Upload Thumbnail</p>
        <label htmlFor="image" className="cursor-pointer">
          <Image
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            width={140}
            height={70}
            alt="Thumbnail"
            className="mt-4 cursor-pointer"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            name="image"
            hidden
            required
          />
        </label>

        <p className="text-md font-bold mt-4">Blog Title</p>
        <input
          className="w-full sm:w-[500px] mt-4 py-3 px-4 outline-none border"
          type="text"
          placeholder="Enter blog title"
          required
          value={data.title}
          name="title"
          onChange={onChangeHandler}
        />

        <p className="text-md font-bold mt-4">Blog Description</p>
        <textarea
          className="w-full sm:w-[500px] mt-4 py-3 px-4 outline-none border"
          rows="6"
          placeholder="Write blog description"
          required
          value={data.description}
          name="description"
          onChange={onChangeHandler}
        />

        <p className="text-md font-bold mt-4">Blog Category</p>
        <select
          onChange={onChangeHandler}
          value={data.category} // Ensure this value is correct
          name="category"
          className="border w-40 mt-4 py-3 px-4 text-gray-500"
        >
          <option value="Lifestyle">Lifestyle</option>
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
        </select>

        <br />
        <button
          type="submit"
          className="mt-8 py-3 px-4 w-40 h-12 bg-black text-white"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default page;
