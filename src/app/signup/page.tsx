"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    userName: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast.success("Signup successful");
      router.push("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.userName));
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-5 text-2xl font-bold">
        {loading ? "Processing..." : "Sign Up"}
      </h1>

      <label htmlFor="username">Username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 w-72 focus:outline-none focus:border-gray-600"
        type="text"
        id="username"
        value={user.userName}
        onChange={(e) => setUser({ ...user, userName: e.target.value })}
        placeholder="Username"
      />

      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 w-72 focus:outline-none focus:border-gray-600"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />

      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 w-72 focus:outline-none focus:border-gray-600"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />

      <button
        onClick={onSignup}
        disabled={buttonDisabled}
        className="p-2 w-72 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 disabled:opacity-50"
      >
        {buttonDisabled ? "Fill all fields" : "Sign Up"}
      </button>

      <Link href="/login" className="text-blue-500 hover:underline">
        Already have an account? Login
      </Link>
    </div>
  );
}

