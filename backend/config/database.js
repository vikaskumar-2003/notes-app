import mongoose from "mongoose"

export async function connectionDB(params) {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connected to database");
        
    } catch (error) {
        console.log("not connected");
        
    }
}