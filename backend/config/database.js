// config/database.js
// require("dotenv").config();
// const mongoose = require('mongoose');
// require('dotenv').config(); // Load environment variables

// const connectDatabase = async () => {
//     const dbUri= process.env.MONGODB_URI// Debug line to check the URI
//     try {
//         await mongoose.connect(dbUri, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('Database connected successfully');
//     } catch (error) {
//         console.error('Database connection failed:', error);
//         process.exit(1); // Exit if connection fails
//     }
// };

// // Export the connectDatabase function
// module.exports = connectDatabase;

require("dotenv").config();
const mongoose = require('mongoose');

const connectDatabase = async () => {
    const dbUri = process.env.MONGODB_URL;

    // Ensure the URI is present
    if (!dbUri) {
        console.error('MongoDB URI is not defined in environment variables.');
        process.exit(1); // Exit the process if URI is missing
    }

    try {
        await mongoose.connect(dbUri, {
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit if connection fails
    }
};

module.exports = connectDatabase;

