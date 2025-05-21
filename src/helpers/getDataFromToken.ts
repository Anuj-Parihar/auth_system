import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || ""; //token is stored in cookies in encrypted format
       const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!); // verify the token using the secret key
        return decodedToken.id;
        
        
    } catch (error:any) {
        throw new Error(error.message);

    }
}