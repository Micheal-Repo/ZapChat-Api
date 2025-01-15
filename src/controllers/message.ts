import Message from "../models/message.js";
import Conversation from "../models/conversation.js";
import { Request, Response } from "express";
import generateError from "../configs/error.js";
import {getReceiverSocketId,io} from "../configs/socket.js"




async function getMessages(req: any, res: Response) {
  console.log("getting messages");
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  if (!receiverId || !senderId) {
    generateError(400, "Invalid request", "getMessages error");
  }


  const conversation = await Conversation.findOne({
    participants: { $all: [receiverId, senderId] },
  }).populate("messages");

  console.log("conversations fetched");

  const messages = conversation ? conversation.messages : [];
  
 console.log("messages extracted")
 
 
  res.status(200).json({
    success: true,
    messages,
  });
}



async function sendMessage(req: any, res: Response) {
  console.log("sending messages");
  const { message } = req.body;
  
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  if (!message || !receiverId || !senderId) {
    generateError(400, "Invalid request", "sendMessage error");
  }

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    console.log("conversation not found");

    conversation = new Conversation({
      participants: [receiverId, senderId],
    });
  }
  
  
  const newMessage = new Message({
    receiverId,
    senderId,
    message
  })
  
  if(newMessage){
    conversation.messages.push(newMessage._id)
  }
  
  await Promise.all([conversation.save(),newMessage.save()])
  
  
  //getReceiverSocketId
  const receiverSocketId = getReceiverSocketId(receiverId)
  
  console.log("newMessage sent")
  
  
  io.to(receiverSocketId).emit("newMessage",newMessage)
  
  
  res.status(200).json({
    success:true,
    message:newMessage
  })
  
}

export { getMessages, sendMessage };
