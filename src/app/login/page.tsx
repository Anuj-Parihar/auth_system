"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6 animate-fade-in">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-indigo-700">{loading ? "Processing..." : "Welcome Back"}</h1>
                    <p className="text-gray-500 mt-2">Sign in to your account</p>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                            id="email"
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({...user, email: e.target.value})}
                            placeholder="your@email.com"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                            id="password"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({...user, password: e.target.value})}
                            placeholder="••••••••"
                        />
                    </div>
                    
                    <div className="pt-2">
                        <button
                            onClick={onLogin}
                            disabled={buttonDisabled}
                            className={`w-full py-2 px-4 rounded-lg font-medium text-white transition duration-200 ${
                                buttonDisabled 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-indigo-600 hover:bg-indigo-700'
                            }`}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </div>
                    
                    <div className="text-center text-sm text-gray-600">
                        <Link href="/forgotpassword" className="text-indigo-600 hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                </div>
                
                <div className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-indigo-600 font-medium hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    )
}