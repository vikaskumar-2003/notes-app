import { User } from "../model/user-model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { verifyMail } from "../emailVerify/verifyMail.js";


export const registerUser = async (req, res) => {
    
    try {
         
        const { username, email, password } = req.body
        
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message:"enter all field"
            })
        }

        let existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message:"user already existed"
            })
        }
         
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        let newUser = await User.create({ username, password:hashPassword, email })
        
        if (!newUser) {
            return res.status(400).json({
                success: false,
                message:"user is not create"
            })
        }

        //verify
        const token=jwt.sign({id:newUser._id},process.env.JWT_KEY,{expiresIn:"10m"})
        verifyMail(token, email)    
        
        newUser.token = token
        await newUser.save()
        

        res.status(201).json({
            success: false,
            message:"user created "
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:error.message
        })
        
    }

}