import { assets } from "@/Assets/assets";
import Sidebar from "@/components/AdminComponenets/Sidebar";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Layout({ children }) {
  return (
    <>
      <div className="flex">
        <ToastContainer theme="dark" />
        <Sidebar />
        <div className="w-full flex flex-col">
          <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
            <h2 className="font-bold">Admin Panel</h2>
            <Image src={assets.profile_icon} alt="" width={40} />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
