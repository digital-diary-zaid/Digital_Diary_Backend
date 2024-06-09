const noteModel = require("../models/noteModel.js");

const getNotesController = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userNotes = await noteModel.find({ userId });

        if (userNotes.length === 0) {
            return res.json({ message: "No notes" });
        } else {
            return res.json({ message: "Successfully retrieved notes", notes: userNotes });
        }
    } catch (error) {
        console.error("Error getting notes:", error);
        return res.status(500).json({ message: "Error getting notes" });
    }
};

module.exports = getNotesController;
