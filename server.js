require('./db/dbinit.js');
require('dotenv').config();
const express = require('express');
const expressSession = require("express-session");
const app = express();

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


//Port Details
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log("App is running at port " + port);
});
  

// Routes
app.post("/signup",signupController);
app.post("/login",loginController);
