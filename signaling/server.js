// signaling/server.js

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// Initialize Express app
const app = express();
app.use(cors());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust this in production to restrict origins
    methods: ["GET", "POST"],
  },
});

// Handle client connections
io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Handle joining a room
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  // Handle leaving a room
  socket.on("leave_room", (roomId) => {
    socket.leave(roomId);
    console.log(`Socket ${socket.id} left room ${roomId}`);
  });

  // Handle signaling data
  socket.on("signal", (data) => {
    const { roomId, payload } = data;
    // Broadcast the signaling data to other clients in the room
    socket.to(roomId).emit("signal", payload);
    console.log(`Signal sent to room ${roomId} from ${socket.id}`);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Start the server
const PORT = 5001;
server.listen(PORT, () => {
  console.log(`Signaling server is running on port ${PORT}`);
});
