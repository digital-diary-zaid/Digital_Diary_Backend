const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const { createSession } = require('../models/session.js');
const { v4: uuidv4 } = require('uuid');

const loginController = async (req, res) => {
    const userCredentials = {
        email: req.body.email,
        password: req.body.password,
    };

    try {
        const user = await userModel.findOne({ email: userCredentials.email });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(userCredentials.password, user.password);
        
        if (passwordMatch) {
            const token = uuidv4(); // Generate a unique token
            await createSession(user._id, token);

            const userData = {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
            };

            return res.json({ message: "Login successful", userData, token });
        } else {
            return res.status(401).json({ message: "Incorrect password" });
        }
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Error logging in" });
    }
};

module.exports = loginController;
