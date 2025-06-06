// server.js
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { registerSocketHandlers } from "./sockets/socketHandler.js";
import "./config/db.js"; // Connect to DB

dotenv.config();

const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = createServer(app);

// Attach socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // Change this in prod
  },
});

// Register WebSocket handlers
registerSocketHandlers(io);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
