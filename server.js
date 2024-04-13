require('./db/dbinit.js');
require('dotenv').config();
const express = require('express');
const expressSession = require("express-session");
const cors = require("cors");
const app = express();
const authMiddleware = require("./middleware/authMiddleware");

app.use(cors({
  origin: "https://digital-diary-ui.vercel.app/",
  credentials:"true"
}))

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({
  secret:"secret"
}));
global.loggedIn = null;

app.use("*",(req,res,next)=>{
  loggedIn = req.session.userId;
  next();
});



//Controllers
const signupController=require("./controllers/signupController.js")
const loginController=require("./controllers/loginController.js")
const saveNoteController=require("./controllers/saveNoteController.js")
const getNotesController=require("./controllers/getNotesController.js")
const logoutController=require("./controllers/logoutController.js")
const checkingAuthenticationController=require("./controllers/checkingAuthenticationController.js");
const getNoteByUserController=require("./controllers/getNoteByUserController.js");
const deleteNotesByIdController=require("./controllers/deleteNotesByIdController.js")
const updateNoteController=require("./controllers/updateNoteController.js")

//Port Details
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log("App is running at port " + port);
});
  

// Routes
app.post("/signup",signupController);
app.post("/login",loginController);
app.post("/addNote",authMiddleware,saveNoteController);
app.get("/getNotes",authMiddleware,getNotesController);
app.get("/logout",logoutController);
app.get("/checkAuth",authMiddleware,checkingAuthenticationController);
app.post("/viewNoteByUser",authMiddleware,getNoteByUserController);
app.post("/updateNote",authMiddleware,updateNoteController);
app.post("/deleteNotesById",authMiddleware,deleteNotesByIdController);