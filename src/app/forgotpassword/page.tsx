"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotpassword", { email });
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6 animate-fade-in">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-indigo-700">Forgot Password</h1>
          <p className="text-gray-500 mt-2">
            Enter your email to receive a password reset link
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-lg font-medium text-white transition duration-200 ${
                loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link href="/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}