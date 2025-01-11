"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { assets } from "@/Assets/assets";
import Footer from "@/components/Footer";
import Link from "next/link";
import axios from "axios";
const Page = ({ params }) => {
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    const response = await axios.get("/api/blog", {
      params: { id: params.id },
    });

    setData(response.data.blog);
  };

  useEffect(() => {
    fetchBlogData();
  }, []);
  return data ? (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={assets.logo}
              alt="logo"
              className="w-[130px]"
            />
          </Link>
          <button
            className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3  sm:px-6 
                 border  border-black  shadow-[-7px_7px_0px_#000000]"
          >
            Get Started
            <Image src={assets.arrow} alt="add_icon" className="" />
          </button>
        </div>

        <div className="text-center my-24">
          <h1 className="text-2xl font-semibold  max-w-[700px] m-auto  sm:text-5xl">
            {data.title}
          </h1>
          <Image
            src={data.authorImg || "/author_img.png"}
            alt="Author Image"
            width={60}
            height={60}
            className="mx-auto mt-6 border border-white rounded-full"
          />
          <p className="mt-1 pb-2 text-lg max-w-[700px] m-auto ] sm:text-base">
            {data.author}
          </p>
        </div>
      </div>
      <div className="mx-5 md:mx-auto max-w-[800px] mt-[-100px] mb-10">
        <Image
          src={data.image}
          alt=""
          width={1280}
          height={720}
          className="border-4 border-white"
        />
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        <div className="my-24">
          <p className="text-black text-2xl font-semibold my-4">
            Share this artical on social media
          </p>
          <div className="flex ">
            <Image src={assets.facebook_icon} alt="" width={50} />
            <Image src={assets.twitter_icon} alt="" width={50} />
            <Image src={assets.googleplus_icon} alt="" width={50} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <></>
  );
};

export default Page;
