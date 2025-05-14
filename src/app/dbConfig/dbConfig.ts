import mongoose  from "mongoose";
export  async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URI!); //extrematly(!) sign used in TS beacuse these is not guarantee to correct this URL but we know this is correct.
        const connection = mongoose.connection;


        connection.on("connected", ()=>{
                console.log("MongoDB connected successfully");
                
        })
        connection.on("error",(err)=>{
                console.log("connection is not properly connected"+err);
                process.exit();
        })
    } catch (error) {
        console.log("Something wants wrongs");
        console.log(error);
    }
}