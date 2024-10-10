const express = require('express');
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create a new router instance
const router = express.Router();

// Signup route handler
router.post('/signup', async (req, res) => {
    try {
        // Get data
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }

        // Secure the password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: 'Error in hashing password',
            });
        }

        // Create a new user
        const user = await User.create({
            name, email, password: hashedPassword, role
        });

        return res.status(200).json({
            success: true,
            message: 'User created successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'User cannot be registered, please try again',
        });
    }
});

// Login route handler
router.post('/login', async (req, res) => {
    try {
        // Fetch data
        const { email, password } = req.body;

        // Validate email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the details carefully',
            });
        }

        // Check if user is registered
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User is not registered',
            });
        }

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        };

        // Verify password and generate JWT token
        if (await bcrypt.compare(password, user.password)) {
            // Password matches, generate token
            let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: 'User logged in successfully',
            });
        } else {
            // Password doesn't match
            return res.status(403).json({
                success: false,
                message: 'Incorrect Password',
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Login unsuccessful',
        });
    }
});

// Export the router to use it in index.js
module.exports = router;
