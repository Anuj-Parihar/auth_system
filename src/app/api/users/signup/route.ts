// import {connect} from "@/dbConfig/dbConfig";
// import User from "@/models/userModel";
// import { NextRequest,NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";

// await connect()

// export async function POST(request:NextRequest){
//     try {
//         const reqBody = await request.json();
//         const {userName, email, password} =reqBody;

//         console.log(reqBody);
//         //check if user already exists.
//         const user = await User.findOne({email}); //return query from db
//         if(user){
//             return NextResponse.json({error:"User is already exists"}, {status:400})
//         }
//         //hash password
//         const salt = await bcryptjs.genSalt(10); //10 times rounded bcrypted
//         const hashPassword = await bcryptjs.hash(password,salt);

//         const newUser = new User({
//             userName,
//             email,
//             password:hashPassword
//         })
//         const savedUser = await newUser.save();
//         console.log(savedUser);
        
//         return NextResponse.json({
//             message:"User created successfully",
//             success:true,
//             savedUser
//         })


//     } catch (error:any) { //Idle case of handling everything is "any"
//         return NextResponse.json({error: error.message},
//             {status:500}
//         )
//     }
// }

// app/api/users/signup/route.ts
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await connect(); // Await DB connection

    const reqBody = await request.json();
    let { userName, email, password } = reqBody;

    if (!userName || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    email = email.toLowerCase(); // Normalize email

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      user: {
        id: savedUser._id,
        email: savedUser.email,
        userName: savedUser.userName,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
