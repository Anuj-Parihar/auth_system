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
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onSignup = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/signup", user);
        console.log("Signup success", response.data);
        router.push("/login"); //router.push helps to  navigate to another page.
        
      } catch (error: any) {
        console.log("Signup failed", error.message);

        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      if (
        user.email.length > 0 &&
        user.password.length &&
        user.userName.length > 0
      ) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }, [user]);

    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="mb-5"> {loading ? "Processing" : "SignUp"}</h1>
        <hr />
        <label htmlFor="username">Username</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          type="text"
          id="username"
          value={user.userName}
          onChange={(e) => setUser({ ...user, userName: e.target.value })}
          placeholder="username"
        />

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
          onClick={onSignup}
          className=" p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          {buttonDisabled ? "No sign-Up" : "Sign-up"}
        </button>
        <Link href="/login">Visit login page</Link>
      </div>
    );
  }


//   "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import toast from "react-hot-toast";
// import Link from "next/link";

// export default function SignupPage() {
//   const router = useRouter();
//   const [user, setUser] = useState({
//     email: "",
//     password: "",
//     username: "",
//   });

//   const [buttonDisabled, setButtonDisabled] = useState(true);
//   const [loading, setLoading] = useState(false);

//   const onSignup = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.post("/api/users/signup", user);
//       console.log("Signup success", response.data);
//       toast.success("Signup successful");
//       router.push("/login");
//     } catch (error: any) {
//       console.error("Signup failed", error);
//       toast.error(error?.response?.data?.error || "Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     setButtonDisabled(!(user.email && user.password && user.username));
//   }, [user]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <h1 className="text-2xl mb-5">{loading ? "Processing..." : "Sign Up"}</h1>

//       <input
//         className="p-2 border rounded mb-4 w-64"
//         type="text"
//         placeholder="Username"
//         value={user.username}
//         onChange={(e) => setUser({ ...user, username: e.target.value })}
//       />
//       <input
//         className="p-2 border rounded mb-4 w-64"
//         type="email"
//         placeholder="Email"
//         value={user.email}
//         onChange={(e) => setUser({ ...user, email: e.target.value })}
//       />
//       <input
//         className="p-2 border rounded mb-4 w-64"
//         type="password"
//         placeholder="Password"
//         value={user.password}
//         onChange={(e) => setUser({ ...user, password: e.target.value })}
//       />

//       <button
//         onClick={onSignup}
//         disabled={buttonDisabled}
//         className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
//       >
//         {buttonDisabled ? "Fill all fields" : "Sign Up"}
//       </button>

//       <Link href="/login" className="mt-4 text-blue-600 underline">
//         Visit login page
//       </Link>
//     </div>
//   );
// }
