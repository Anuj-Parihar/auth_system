// import { connect } from "@/dbConfig/dbConfig";
// import User from "@/models/userModel";
// import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";

// await connect();

// export async function POST(request: NextRequest) {
//     try {
//         const redBody =await request.json()
//         const { email, password } = await redBody;
//         console.log(redBody);
//         //check if user already exists
//         const user = await User.findOne({ email });
//         if (!user) {
//             return NextResponse.json({ error: "User not found" }, { status: 400 });
//         }

//         //check if password is correct
//         const isPasswordCorrect = await bcryptjs.compare(password, user.password);
//         if (!isPasswordCorrect) {
//             return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
//         }
//         //create token data
//         const tokenData = {
//             id: user._id,
//             email: user.email,
//             username: user.username,
//         };
//         //create token
//         const token = await jwt.sign(tokenData,process.env.TOKEN_SECRE!,{ expiresIn: "1d" });
//         //send token in cookie
//         const response = NextResponse.json({
//             message: "Login successful",
//             success: true,
//             // user: tokenData,
//         });
//         response.cookies.set("token", token, {
//             httpOnly: true,
            
//         });
//         return response;

//     } catch (error: any) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
        
//     }
// }

import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest){
    try {

        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody);

        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        console.log("user exists");
        
        
        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }
        console.log(user);
        
        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
            
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}