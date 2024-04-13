require('./db/dbinit.js');
require('dotenv').config();
const express = require('express');
const expressSession = require("express-session");
const MongoStore = require('connect-mongo')(expressSession);
const cors = require("cors");
const app = express();
const authMiddleware = require("./middleware/authMiddleware");
const mongooseConnection = require('./dbinit'); 

app.use(cors({
  origin: 'https://digital-diary-ui.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the methods you want to allow
  credentials: true // Allow credentials if needed
}));
//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key', // Use a secure secret key
  resave: false, // Avoid resaving sessions if not modified
  saveUninitialized: false, // Avoid saving uninitialized sessions
  cookie: {
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      httpOnly: true, // Prevents client-side JavaScript from accessing the session cookie
      sameSite: 'strict' // Sets the cookie's same-site attribute
  },
  store: new MongoStore({
      mongooseConnection, // Pass the Mongoose connection from dbinit.js
      collection: 'sessions' // Specify the name of the collection for session data
  })
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