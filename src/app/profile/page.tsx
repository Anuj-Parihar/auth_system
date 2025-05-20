"use client"; // decorator
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function UserProfile(){
    
    const router = useRouter();
    
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            // Redirect to login page
            router.push("/login");
        } catch (error:any) {
            console.error("Logout failed", error.message);
            toast.error("Logout failed");
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <button
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-700 mt-4 text-white px-4 py-2  font-bold rounded"
            >Logout</button>
        </div>
    );
}