require("./db/dbinit.js");
require("dotenv").config();
const express = require("express");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");

const app = express();
const authMiddleware = require("./middleware/authMiddleware");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: 'https://diztaldiary.netlify.app/', // Replace with your Netlify URL
  credentials: true,
}));

// Session configuration
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI || "mongodb+srv://zaidalam0731:zaid@cluster0.s71ckpw.mongodb.net/Digital_Diary?retryWrites=true&w=majority",
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

global.loggedIn = null;

app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

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
