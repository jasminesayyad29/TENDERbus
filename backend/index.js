

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require('http');
const path = require('path');
const { Server } = require("socket.io");

const connectDatabase = require("./config/database");
// const userRoutes = require("./api/Auth");
const userRoutes = require("./routes/user");
const tenderRoutes = require("./api/tenderRoutes");
const bidRoutes = require('./routes/bid');
const notificationRoutes = require('./routes/notification');
// Initialize dotenv for environment variables
dotenv.config();

// Create an instance of Express
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',    // Allow any IP address or domain to connect
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
  },
});

app.use(cors());


const PORT = process.env.PORT || 3000;

app.set('io', io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your frontend
  credentials: true, // Allow credentials like cookies or auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));

// Connect to the database
connectDatabase(); // Call the function to connect to MongoDB

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up routes
app.use("/api", userRoutes); // Routes from routes/user.js
app.use("/api/tenders", tenderRoutes);
app.use('/api', bidRoutes);
app.use('/api/notifications', notificationRoutes);

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
// Start the server
server.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`);
});

