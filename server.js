require("./db/dbinit.js");
require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();

// Controllers
const signupController = require("./controllers/signupController.js");
const loginController = require("./controllers/loginController.js");
const saveNoteController = require("./controllers/saveNoteController.js");
const getNotesController = require("./controllers/getNotesController.js");
const logoutController = require("./controllers/logoutController.js");
const checkingAuthenticationController = require("./controllers/checkingAuthenticationController.js");
const getNoteByUserController = require("./controllers/getNoteByUserController.js");
const deleteNotesByIdController = require("./controllers/deleteNotesByIdController.js");
const updateNoteController = require("./controllers/updateNoteController.js");

// Middleware
const authMiddleware = require("./middleware/authMiddleware.js");

// CORS configuration
app.use(cors({
  origin: "https://diztaldiary.netlify.app",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Port Details
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("App is running at port " + port);
});

// Routes
app.post("/signup", signupController);
app.post("/login", loginController);
app.post("/addNote", authMiddleware, saveNoteController);
app.get("/getNotes", authMiddleware, getNotesController);
app.get("/logout", logoutController);
app.get("/checkAuth", authMiddleware, checkingAuthenticationController);
app.post("/viewNoteByUser", authMiddleware, getNoteByUserController);
app.post("/updateNote", authMiddleware, updateNoteController);
app.post("/deleteNotesById", authMiddleware, deleteNotesByIdController);
