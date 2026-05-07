import { config } from "dotenv"
// dotenv.config({quiet:true})
config({quiet:true})

import express from "express"
import { connectionDB } from "./config/database.js"
import userRouter from "./routes/user-routes.js"

const app = express()

let PORT=process.env.PORT||9000

connectionDB()

app.use("/v1/api",userRouter)

app.listen(PORT, (error) => {
    if (error) {
        console.log("unable to establish the server");
        
    }
    console.log("server establish");
    
} )