// // index.js

// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv"); // Import dotenv for environment variables
// const userRoutes = require("./api/Auth"); // Import your user routes
// const connectDatabase = require("./config/database"); // Import your database connection


// // Initialize dotenv to access environment variables
// dotenv.config();

// // Create an instance of Express
// const app = express();



// // Set the PORT from environment variables or default to 3000
// const PORT = process.env.PORT || 3000;

// // Middleware for JSON parsing
// app.use(express.json());

// // CORS configuration
// app.use(cors({
//     origin: 'http://localhost:3000', // Allow requests from this origin (frontend)
//     credentials: true, // Enable if you are using cookies or authorization headers
// }));

// // Connect to the database
// connectDatabase(); // Call the correct function

// // Set up routes
// app.use("/api/v1", userRoutes);

// // Start the server
// app.listen(PORT, () => {
//     console.log(`App is listening at http://localhost:${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require('http');
const socketIO = require('socket.io');

const connectDatabase = require("./config/database");
const userRoutes = require("./api/Auth");
const tenderRoutes = require("./api/tenderRoutes");
const bidRoutes = require('./routes/bid');
const notificationRoutes = require('./routes/notification');
// Initialize dotenv for environment variables
dotenv.config();

// Create an instance of Express
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',    // Allow any IP address or domain to connect
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
  },
});

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

// Set up routes
app.use("/api", userRoutes); // Routes from api/Auth.js
app.use("/api/tenders", tenderRoutes);
app.use('/api', bidRoutes);
app.use('/api/notifications', notificationRoutes);

io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
// Start the server
server.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`);
});

