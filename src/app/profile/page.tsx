

"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, {useState} from "react";

export default function UserProfile() {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");
  const [loading, setLoading] = React.useState(false);

  const logout = async () => {
    try {
      setLoading(true);
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.error("Logout failed", error.message);
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/meuser");
      setData(res.data.data._id);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6 animate-fade-in">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-indigo-700">User Profile</h1>
          <p className="text-gray-500">Manage your account</p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">
              {data === "nothing" ? "Guest" : `User ID: ${data}`}
            </h2>
          </div>

          <div className="space-y-3">
            <button
              onClick={getUserDetails}
              disabled={loading}
              className={`w-full py-2 px-4 rounded-lg font-medium text-white transition duration-200 ${
                loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Loading..." : "Get User Details"}
            </button>

            {data !== "nothing" && (
              <Link
                href={`/profile/${data}`}
                className="block w-full py-2 px-4 text-center rounded-lg font-medium text-indigo-600 border border-indigo-600 hover:bg-indigo-50 transition duration-200"
              >
                View Profile
              </Link>
            )}

            <button
              onClick={logout}
              disabled={loading}
              className={`w-full py-2 px-4 rounded-lg font-medium text-white transition duration-200 ${
                loading ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
              }`}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}