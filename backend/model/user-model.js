import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true
    },
    email: {
        type: String,
        unique: [true, "enter unique email"],
        required:true,
    },
    password: {
        type: String,
        required:true,
    },
     isVerified: {
           type: Boolean,
          default:false,
    },
    isLoggedIn: {
        type: Boolean,
        default:false
    },
    token: {
        type: String,
        default:null
    },
    otp: {
        type: String,
        default:null
    },
    otpExpiry: {
        type: Date,
        default:null
    }
})

export const User=mongoose.model("User",userSchema)