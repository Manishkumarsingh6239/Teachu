import mongoose from "mongoose";
import { ENV } from "./env.js";

export const ConnectDB = async ()=>{
    
    try {
        const conn =  await mongoose.connect(ENV.DB_URL);
        console.log("✅ MongoDB Connected successfully at: ",conn.connection.host);
    } catch (error) {
        console.log("❌ Error Connecting MongoDB");
    }
}