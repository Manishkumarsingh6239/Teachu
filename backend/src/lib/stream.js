import {StreamChat} from "stream-chat"
import {ENV} from './env.js'

const api_key = ENV.STREAM_API_KEY
const api_secret =  ENV.STREAM_API_SECRET

if(!api_key || !api_secret){
    console.log("STREAM_API_KEY or STREAM_API_SECRET is missing");
}

export const chatClient = StreamChat.getInstance(api_key, api_secret)

export const upsertUser = async (userData)=>{
    try {
        await chatClient.upsertUser(userData);
        console.log("Stream user upserted succesfuly: ",userData);
    } catch (error) {
        console.error("Error upserting user on stream:",error)
    }
}

export const deleteStreamUser = async (userId)=>{
    try {
        await chatClient.deleteUser(userId);
        console.log("Stream user deleted succesfuly: ",userId);
    } catch (error) {
        console.error("Error deleting user on stream:",error);
    }
}