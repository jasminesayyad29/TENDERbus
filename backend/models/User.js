const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,  // Ensure email is unique
        trim: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address',
        ],
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],  // Define possible roles
        default: 'user',          // Set default role to 'user'
    }
}, { timestamps: true }); // Automatically add createdAt and updatedAt

// Export the model
module.exports = mongoose.model("User", userSchema);
