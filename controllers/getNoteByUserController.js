// It is  not used as I am drctly showing tha note data while passing it to viewpage ; instaed of making a backend call

const noteModel = require("../models/noteModel.js");

const getNoteByUserController = async (req, res) => {

    try {
        const loggedInUserId = req.session.userId; // Assuming you have the user ID in the request object
        
        // Check if the user has notes
        let userNotes = await noteModel.findOne({ userId: loggedInUserId });
        console.log("Note Id")
        let noteId=req.body.noteId;
        console.log(userNotes.notes);

        
        if (!userNotes) {
            return res.json({ message: "No notes" });
        } else {
            let notes=[];
            for(let i=0;i<userNotes.notes.length;i++){
                if(userNotes.notes[i]._id == noteId){
                    notes.push(userNotes.notes[i]);
                }
            }
            console.log("AFter loop");
            console.log(notes);
            if(notes.length>0){
                return res.json({ message: "Successfull", notes });
            }
            else{
                return res.json({ message: "Not Found" });
            } 
        }

    } catch (error) {
        console.error("Error saving note:", error);
        return res.status(500).json({ message: "Error saving note" });
    }
}

module.exports = getNoteByUserController;
