import mongoose, { trusted } from "mongoose";
import {ENV} from "./env.js";

export const connectDB=async()=>{
    try{
        if(!ENV.DB_URL){
            throw new error("DB_URL is not defined in environment variables");
        }
        const conn=await mongoose.connect(ENV.DB_URL);
        console.log("connected to mongodb: ",conn.connection.host)
    }
    catch(error){
        console.error("Error connecting to mondodb",error)
        process.exit(1);
    }
}