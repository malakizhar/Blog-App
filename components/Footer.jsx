import { assets } from "@/Assets/assets";
import React from "react";
import Image from "next/image";
const Footer = () => {
  return (
    <div className="flex justify-around flex-col  gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center">
      <Image src={assets.logo_light} alt="" width={120} />
      <p className="text-white text-sm">
        All rights reserved. &copy; 2025 Blogify
      </p>
      <div className="flex  ">
        <Image
          src={assets.facebook_icon}
          className="hover:scale-110 transition duration-300 ease-in-out"
          alt=""
          width={40}
        />
        <Image
          className="hover:scale-110 transition duration-300 ease-in-out"
          src={assets.twitter_icon}
          alt=""
          width={40}
        />
        <Image
          className="hover:scale-110 transition duration-300 ease-in-out"
          src={assets.googleplus_icon}
          alt=""
          width={40}
        />
      </div>
    </div>
  );
};

export default Footer;
