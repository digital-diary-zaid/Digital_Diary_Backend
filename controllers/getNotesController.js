const noteModel = require("../models/noteModel.js");
const userModel = require("../models/userModel.js");

const getNotesController = async (req, res) => {
    console.log("Get Note");

    try {
        const loggedInUserId = req.session.userId; // Assuming you have the user ID in the request object
        
        // Check if the user has notes
        let userNotes = await noteModel.findOne({ userId: loggedInUserId });

        // If the user does not have any notes
        if (!userNotes) {
            return res.json({ message: "No notes" });
        } else {
            console.log(userNotes);
            return res.json({ message: "Successfull", userNotes });
        }

    } catch (error) {
        console.error("Error saving note:", error);
        return res.status(500).json({ message: "Error saving note" });
    }
}

module.exports = getNotesController;
