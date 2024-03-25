const noteModel = require("../models/noteModel.js");
const deleteNotesByIdController = async (req, res) => {
    try {
        const loggedInUserId = req.session.userId; // Assuming you have the user ID in the request object
        
        // Retrieve the note ID from the request body
        const noteId = req.body.noteId;

        // Delete the note from the database
            //this code finds a document in the noteModel collection where the userId matches the loggedInUserId, 
        //removes an element from the notes array where the _id matches the noteId, and returns the updated document.
        const result = await noteModel.findOneAndUpdate(
            { userId: loggedInUserId },
            { $pull: { notes: { _id: noteId } } },
            { new: true }
        );

        // Check if the note was found and deleted
    
        if (!result) {
            return res.status(404).json({ message: "Note not found" });
        }

        return res.json({ message: "Notes Deleted" });

    } catch (error) {
        console.error("Error deleting note:", error);
        return res.status(500).json({ message: "Error deleting note" });
    }
}

module.exports = deleteNotesByIdController;
