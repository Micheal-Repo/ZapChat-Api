Here's a step-by-step guide to building a chat application with Next.js for the frontend, Express.js for the backend, and Socket.IO for real-time features. This app will include features like an online user indicator, real-time messaging, and a typing indicator.


---

Step 1: Initialize the Project

1. Create the Next.js app:

npx create-next-app@latest chat-app
cd chat-app


2. Set up the Express.js backend: Inside the project folder, create a server directory for the backend.

mkdir server
cd server
npm init -y
npm install express socket.io cors


3. Install dependencies for the frontend: Back in the root folder:

npm install socket.io-client




---

Step 2: Build the Express.js Backend

1. Create the server file: Inside the server folder, create an index.js file:

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Update with your frontend URL
    methods: ["GET", "POST"],
  },
});

let onlineUsers = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Add user to online users
  socket.on('user_connected', (username) => {
    onlineUsers[socket.id] = username;
    io.emit('online_users', Object.values(onlineUsers));
  });

  // Handle real-time messages
  socket.on('send_message', (data) => {
    io.emit('receive_message', data);
  });

  // Handle typing indicator
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    delete onlineUsers[socket.id];
    io.emit('online_users', Object.values(onlineUsers));
    console.log('A user disconnected:', socket.id);
  });
});

app.use(cors());
app.use(express.json());

server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});


2. Start the backend:

node index.js




---

Step 3: Build the Next.js Frontend

1. Set up a Socket.IO connection: Create a utils/socket.js file:

import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default socket;


2. Create the main chat page: Modify the pages/index.js file:

import { useEffect, useState } from "react";
import socket from "../utils/socket";

export default function Chat() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("online_users", (users) => {
      setOnlineUsers(users);
    });

    socket.on("typing", (data) => {
      setIsTyping(data);
    });

    return () => {
      socket.off("receive_message");
      socket.off("online_users");
      socket.off("typing");
    };
  }, []);

  const handleJoin = () => {
    socket.emit("user_connected", username);
  };

  const handleSendMessage = () => {
    const data = { username, message };
    socket.emit("send_message", data);
    setMessages((prev) => [...prev, data]);
    setMessage("");
  };

  const handleTyping = () => {
    socket.emit("typing", `${username} is typing...`);
  };

  return (
    <div style={{ padding: "20px" }}>
      {!username ? (
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleJoin}>Join Chat</button>
        </div>
      ) : (
        <div>
          <div>
            <h3>Online Users:</h3>
            <ul>
              {onlineUsers.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Chat:</h3>
            <div>
              {messages.map((msg, index) => (
                <div key={index}>
                  <strong>{msg.username}:</strong> {msg.message}
                </div>
              ))}
            </div>
            {isTyping && <p>{isTyping}</p>}
          </div>

          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleTyping}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      )}
    </div>
  );
}




---

Step 4: Run the Application

1. Start the frontend:

npm run dev


2. Access the app:

Frontend: http://localhost:3000

Backend: http://localhost:4000





---

Step 5: Test Features

1. Open multiple browser tabs or devices.


2. Join the chat with different usernames.


3. Test:

Real-time messaging.

Online user updates.

Typing indicator.





---

This is a basic implementation. You can enhance it by adding:

Authentication (e.g., JWT).

Chat history (store messages in a database like MongoDB).

Private messaging or chat rooms.

UI improvements using libraries like Tailwind CSS or Material-UI.


