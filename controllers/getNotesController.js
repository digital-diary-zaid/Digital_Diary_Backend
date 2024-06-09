const noteModel = require("../models/noteModel.js");
const userModel = require("../models/userModel.js");
const {sessionModel,createSession} = require('../models/session.js');

const getNotesController = async (req, res) => {
  try {
    // Retrieve session data from MongoDB session collection
    const loggedInUserId = await sessionModel.find();

    if (!loggedInUserId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if the user has notes
    let userNotes = await noteModel.findOne({ userId: loggedInUserId });

    // If the user does not have any notes
    if (!userNotes?.notes || userNotes?.notes?.length <= 0) {
      return res.json({ message: "No notes" });
    } else {
      return res.json({ message: "Successfully retrieved notes", userNotes });
    }
  } catch (error) {
    console.error("Error getting notes:", error);
    return res.status(500).json({ message: "Error getting notes" });
  }
};

module.exports = getNotesController;
