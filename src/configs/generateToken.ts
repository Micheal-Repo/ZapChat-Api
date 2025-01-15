import jwt from "jsonwebtoken"
import {Response} from "express"

export default async function Token(userId:string,res:Response){
  
  const secret:any = process.env.JWT_SECRET
 
  const token = await jwt.sign({userId},secret,{
     expiresIn:"15d"
   })
  
  res.cookie("jwt",token,{
    maxAge: 15 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: 'None', // CSRF attacks cross-site request forgery attacks
  	secure: process.env.NODE_ENV !== "development",
  })
  
  console.log("token generated and cookie passed")
}