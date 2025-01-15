import { Request, Response } from "express";
import generateError from "../configs/error.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../configs/generateToken.js"


async function signup(req: Request, res: Response) {
  const { username, fullname, gender, password, confirmPassword } = req.body;

  //verify data
  if (!username || !fullname || !gender || !password || !confirmPassword) {
    generateError(400, "All fields are required", "signup error");
  }

  if (password !== confirmPassword) {
    generateError(400, "password does not match", "signup error");
  }

  //duplicate user
  const duplicateUser = await User.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicateUser) {
    generateError(400, "username already exist", "signup error");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
 // const hashedPassword2 = await bcrypt.hash(password, 10);


  //profile pic
  const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

  //create new user
  const newUser = new User({
    username,
    fullname,
    password: hashedPassword,
    gender,
    profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
  });
  
  
  if (newUser) {
    await newUser.save()
    console.log("signup successfully")
    res.status(200).json({
      success: true,
      message: "signed up successfully",
    });
  } else {
    generateError(400, "invalid user data", "signup error");
  }
}




async function signin(req: Request, res: Response){
  const {username, password} = req.body 
  
  //verify
  if(!username || !password){
    generateError(400,"All fields are required","signin error")
  }
  
  
  const user:any = await User.findOne({username}).collation({locale:"en",strength:2}).lean().exec()
  
  
  if(!user){
    generateError(401,"Invalid username or password","signin error")
  }
  
  const match = await bcrypt.compare(password,user?.password)
  
  if(!match){
    generateError(401,"Invalid username or password","signin error")
  }
  
  //token
  await generateToken(user._id,res)
  
  console.log("signed in successfully")
  res.status(200).json({
    success:true,
    message:"Signed In successfully",
    user:{
      _id:user._id,
      username:user.username,
      fullname:user.fullname,
      profilePic:user.profilePic
    }
  })
  
}


async function logout(req: Request, res: Response){
   console.log("loging out ")
   res.cookie("jwt", "", { maxAge: 0 });
   
   console.log("logged out successfully")
   res.status(200).json({
     success:true,
     message:"Logged out successfully"
   })
}


export { signup , signin, logout};
