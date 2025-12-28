import mongoose from "mongoose";
import { ENV } from "./env.js";

export const ConnectDB = async ()=>{
    console.log("ENV.DB_URL:",ENV.DB_URL);
    try {
        const conn =  await mongoose.connect(ENV.DB_URL);
        console.log("✅ MongoDB Connected successfully at: ",conn.connection.host);
    } catch (error) {
        console.log("❌ Error Connecting MongoDB: ",error.message);
    }
}