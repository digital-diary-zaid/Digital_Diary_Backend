const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel' }, 
    notes: [{ // Array to store multiple notes
        title: { type: String },
        description: { type: String },
        date:{type: String}
    }],
  
});

const noteModel = mongoose.model("Notes", noteSchema);
module.exports = noteModel;
