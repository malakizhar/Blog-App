"use client";

import EmailTable from "@/components/AdminComponenets/EmailTable";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const page = () => {
  const [emails, setEmails] = useState([]);

  const FetchEmail = async () => {
    try {
      const response = await axios.get("/api/email");
      setEmails(response.data.emails);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteEmail = async (mongoId) => {
    try {
      const response = await axios.delete("/api/email", {
        params: {
          id: mongoId,
        },

      });
      if(response.data.success){
        toast.success(response.data.message);
      }
      FetchEmail();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error deleting email");
    }
  };

  useEffect(() => {
    FetchEmail();
  }, []);
  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All subscriptions</h1>
      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 uppercase text-left bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email subscriptions
              </th>
              <th scope="col" className="px-6 py-3 hidden sm:block">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {emails.map((item, index) => {
              return (
                <EmailTable
                  key={index}
                  email={item.email}
                  mongoId={item._id}
                  date={item.date}
                  deleteEmail={deleteEmail}
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
