import {Server} from "socket.io"
import http from "http"
import  express from "express"

const app = express()
const server = http.createServer(app)
const io = new Server(server,{
  cors:{
    origin:"https://zap-chat-api.vercel.app/",
    methods:["POST","GET"]
  }
})


const onlineUsers:any = {}


io.on("connection",(socket)=>{
  console.log("user is connected",socket.id)
  
  
  const userId: any = socket.handshake.query.userId;
  
  console.log("user ID:",userId)
  console.log("initial onlineUsers", onlineUsers)
  
  //online users
  if(userId){
    onlineUsers[userId] = socket.id
  }
  
  console.log("onlineUsers after connection", onlineUsers)
  
  io.emit("getOnlineUsers",Object.keys(onlineUsers))
  
  socket.on("disconnect",()=>{
    console.log("user is disconnected")
    
    delete onlineUsers[userId]
    
    console.log("onlineUsers after disconnection", onlineUsers)
    io.emit("getOnlineUsers",Object.keys(onlineUsers))
  })
  
})



function getReceiverSocketId(receiverId:string){
  return onlineUsers[receiverId]
}

export {io,server,app,getReceiverSocketId}