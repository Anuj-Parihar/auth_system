

import nodemailer from 'nodemailer';
import User from "@/models/userModel"
import brcyptjs from 'bcryptjs';

export const sendEmail = async ({email, emailType, userId}:any) =>{
    try {
        //create a hased token
        const hashToken = await brcyptjs.hash(userId.toString(), 10);

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashToken, 
                verifyTokenExpiry: Date.now() + 3600000
            });
        } else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashToken, 
                forgotPasswordTokenExpiry: Date.now() + 3600000
            });
        }

        const transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        const mailOptions = {
            from: process.env.SMTP_FROM,
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `
                <p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashToken}">
                    here
                </a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
                or copy and paste the link below in your browser. <br> 
                ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashToken}
                </p>
            `
        };

        const mailResponse = await transport.sendMail(mailOptions);   
        return mailResponse;
        
    } catch (error:any) {
        throw new Error(error.message);
    }
}