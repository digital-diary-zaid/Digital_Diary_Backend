const noteModel = require("../models/noteModel.js");
const userModel = require("../models/userModel.js");

const saveNoteController = async (req, res) => {

    try {
        const loggedInUserId = req.session.userId; // Assuming you have the user ID in the request object
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Months are zero-based, so January is 0
        const day = currentDate.getDate();
        
        const date = `${year}-${month}-${day}`;
        console.log(date);

        // Find the user
        const user = await userModel.findById(loggedInUserId);
        
        if (!user) {
            return res.json({ message: "User not found" });
        }

        // Check if the user already has notes
        let userNotes = await noteModel.findOne({ userId: loggedInUserId });

        // If the user does not have any notes, create a new note document
        if (!userNotes) {
            userNotes = new noteModel({
                userId: loggedInUserId,
                notes: [{
                    title: req.body.title,
                    description: req.body.description,
                    date:date
                }]
            });
            await userNotes.save();
        } else {
            // If the user already has notes, append the new note to the existing notes array
            userNotes.notes.push({
                title: req.body.title,
                description: req.body.description,
                date:date
            });
            await userNotes.save();
        }

        return res.json({ message: "Note saved successfully" });
    } catch (error) {
        console.error("Error saving note:", error);
        return res.status(500).json({ message: "Error saving note" });
    }
}

module.exports = saveNoteController;
