import {allowedOrigin} from "./allowedOrigin.js"


export const corsOption={
  origin:(origin:any,callback:any)=>{
    if(allowedOrigin.indexOf(origin) !== -1 || !origin){
      callback(null,true) 
    }else{
      console.log(origin)
      callback(new Error("Not allowed by cors"))
    }
  },
  credentials:true,
  optionsSuccessStatus:200
}