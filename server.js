require('./db/dbinit.js');
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 7000

app.get("/api",(req,res)=>{
    res.json({"users" : ["Zaid","Alam"]});
});
app.listen(port, () => {
    console.log("App is running at port " + port);
});