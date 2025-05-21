"use client"; // decorator
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";
import {useState} from "react";

export default function UserProfile(){

    const router = useRouter();
    const [data, setData] = React.useState("nothing");

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            // Redirect to login page
            router.push("/login"); //router. push is used to redirect to another page
        } catch (error:any) {
            console.error("Logout failed", error.message);
            toast.error("Logout failed");
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/meuser');
        console.log(res.data);
        setData(res.data.data._id);
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2
            className="text-2xl font-bold mt-4 p-1 rounded bg-amber-300"
            > {data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <button
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-700 mt-4 text-white px-4 py-2  font-bold rounded"
            >Logout</button>
            <button
            onClick={getUserDetails}
            className="bg-green-500 hover:bg-green-700 mt-4 text-white px-4 py-2  font-bold rounded"
            >Get User Details</button>
        </div>
    );
}