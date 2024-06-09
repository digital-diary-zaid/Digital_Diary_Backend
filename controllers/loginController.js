const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");

const loginController = async (req, res) => {
    const userCredentials = {
        email: req.body.email,
        password: req.body.password,
    };

    try {
        const user = await userModel.findOne({ email: userCredentials.email });
        
        if (!user) {
            return res.json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(userCredentials.password, user.password);
        
        if (passwordMatch) {
            // Create a custom session object and store it in MongoDB session collection
            const sessionData = {
                _id: user._id,
                userId: user._id, // Store user ID
                expires: Date.now() + (30 * 24 * 60 * 60 * 1000), // Set expiration time (30 days)
            };

            await req.sessionStore.set(req.sessionID, sessionData); // Store session data
            const userData = {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
            };
            return res.json({ message: "Login successful", userData });
        } else {
            return res.json({ message: "Incorrect password" });
        }
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Error logging in" });
    }
};

module.exports = loginController;
