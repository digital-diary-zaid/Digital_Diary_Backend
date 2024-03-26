const noteModel = require("../models/noteModel.js");
const userModel = require("../models/userModel.js");

const updateNoteController = async (req, res) => {

    try {
        const loggedInUserId = req.session.userId; // Assuming you have the user ID in the request object
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Months are zero-based, so January is 0
        const day = currentDate.getDate();
        const date = `${year}-${month}-${day}`;
        
        // Retrieve the note ID from the request body
        const noteId = req.body.id;

       // Update the note in the database
       const result = await noteModel.findOneAndUpdate(
        { "userId": loggedInUserId, "notes._id": noteId }, // Match the note by user ID and note ID
        { 
            $set: { // Use $set operator to update specific fields
                "notes.$.title": req.body.title,
                "notes.$.description": req.body.description,
                "notes.$.date": date
            }
        },
        { new: true }
    );

    // Check if the note was found and updated
    if (!result) {
        return res.status(404).json({ message: "Note not found" });
    }

    return res.json({ message: "Note updated successfully" });

    } catch (error) {
        console.error("Error saving note:", error);
        return res.status(500).json({ message: "Error saving note" });
    }
}

module.exports = updateNoteController;
