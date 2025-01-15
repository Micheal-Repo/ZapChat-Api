import {io,server,app} from "./configs/socket.js"
import express from "express";
import { Response, Request } from "express";
import "express-async-errors";
import dotenv from "dotenv"
import User from "./models/user.js"
import cors from "cors"
import cookieParser from "cookie-parser"


//config
import mongodbConnect from "./configs/mongodbConnection.js";
import errHandler from "./middleware/errHandler.js";
import {corsOption} from "./configs/corsOptions.js"

//routes 
import authRoute from "./routes/auth.js"
import userRoute from "./routes/user.js"
import messageRoute from "./routes/message.js"

//config
dotenv.config()
mongodbConnect();

app.get("/",(req: Request,res: Response)=>{
  //throw new Error("error encountered")
  console.log("yeah")
  res.send("welcome")
})

//middleware
app.use(express.json())
app.use(cors(corsOption))
app.use(cookieParser())


//routes 
app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use("/api/message",messageRoute)


app.use(errHandler);

const PORT:any = process.env.PORT || 5000;

server.listen(PORT,'0.0.0.0',() => {
    console.log("server is listening to port ", PORT);
})
