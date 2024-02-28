require('./db/dbinit.js');
require('dotenv').config();
const express = require('express');
const app = express();

//Middleware
app.use(express.json());



//Controllers
const signupController=require("./controllers/signupController.js")


//Port Details
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log("App is running at port " + port);
});
  

// Routes
app.post("/signup",signupController);
