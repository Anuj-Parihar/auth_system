"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { axios } from "axios";


export default function LoginPage(){
   const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const onLogin = async () => {};
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1> Login </h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />

      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      <button 
      onClick={onLogin}
      className=" p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>
      <Link href="/signup">Visit Sign-up page</Link>
    </div>
  );
}