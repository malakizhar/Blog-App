import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/Assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

const Headers = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post("/api/email", formData);
    if (response.data.success) {
      toast.success(response.data.message);
      setEmail("");
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Image src={assets.logo} alt="logo" className="w-[130px] " />
        <Link href="/Login">
          <button
            className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border 
              border-soiled border-black shadow-[-7px_7px_0px_#000000]"
          >
            Get Started
            <Image src={assets.arrow} alt="add_icon" className="" />
          </button>
        </Link>
      </div>

      <div className="text-center my-8">
        <h1 className="text-3xl font-bold sm:text-5xl">Latest Blogs</h1>
        <p className="max-w-[740px] m-auto mt-10 text-xs sm:text-base">
          Find the latest blogs and articles from the best writers in the world.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border
            border-black shadow-[-7px_7px_0px_#000000]"
          action=""
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email address"
            className="py-2 px-4 pl-4 outline-none"
            value={email}
          />
          <button
            type="submit"
            className="border-black border-l   py-4 px-2 sm:px-10 active:bg-gray-600 active:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Headers;
