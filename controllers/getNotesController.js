const noteModel = require("../models/noteModel.js");
const userModel = require("../models/userModel.js");

const getNotesController = async (req, res) => {
  try {
    const loggedInUserId = req.session.userId; // Assuming you have the user ID in the request object
    console.log("loggedInUserId in getNotes", loggedInUserId);
    // Check if the user has notes
    let userNotes = await noteModel.findOne({ userId: loggedInUserId });

    // If the user does not have any notes
    if (!userNotes?.notes || userNotes?.notes?.length <= 0) {
      return res.json({ message: "No notes" });
    } else {
      return res.json({ message: "Successfull", userNotes });
    }
  } catch (error) {
    console.error("Error getting note:", error);
    return res.status(500).json({ message: "Error getting note" });
  }
};

module.exports = getNotesController;
