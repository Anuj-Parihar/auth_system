"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post("/api/users/resetpassword", {
                token,
                password,
            });
            toast.success(response.data.message);
            router.push("/login");
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
                    <h1 className="text-3xl font-bold text-indigo-700">Reset Password</h1>
                    <p className="text-gray-500 mt-2">Enter your new password</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                        </label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError("");
                            }}
                            placeholder="••••••••"
                            required
                            minLength={6}
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setError("");
                            }}
                            placeholder="••••••••"
                            required
                            minLength={6}
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading || !token}
                            className={`w-full py-2 px-4 rounded-lg font-medium text-white transition duration-200 ${
                                loading || !token ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
                            }`}
                        >
                            {loading ? "Processing..." : "Reset Password"}
                        </button>
                    </div>
                </form>

                <div className="text-center text-sm text-gray-600">
                    <Link href="/login" className="text-indigo-600 font-medium hover:underline">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}