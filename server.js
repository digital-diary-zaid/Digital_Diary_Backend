require('./db/dbinit.js');
require('dotenv').config();
const express = require('express');
const expressSession = require("express-session");
const app = express();
const authMiddleware = require("./middleware/authMiddleware");
const cors=require('cors');

// Define the frontend URL (origin) allowed to access the backend
const allowedOrigins = ['https://your-frontend-url.netlify.app'];

// Configure CORS with options
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error('Not allowed by CORS')); // Reject the request
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
};

// Use the CORS middleware with the configured options
app.use(cors(corsOptions));


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
app.post("/api/login",loginController);
app.post("/addNote",authMiddleware,saveNoteController);
app.get("/api/getNotes",authMiddleware,getNotesController);
app.get("/logout",logoutController);
app.get("/checkAuth",authMiddleware,checkingAuthenticationController);
app.post("/viewNoteByUser",authMiddleware,getNoteByUserController);
app.post("/updateNote",authMiddleware,updateNoteController);
app.post("/deleteNotesById",authMiddleware,deleteNotesByIdController);