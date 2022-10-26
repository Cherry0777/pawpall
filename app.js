const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const _ = require("lodash");
var path = require('path');
const { reset } = require("nodemon");


/* const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'nodemysql'
}) */

/* db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySQL connected...')
}) */

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res){
    res.sendFile(__dirname + "/playmates.html");
});

app.get("/:pagename", function (req, res){
    const pgname = _.capitalize(req.params.pagename);
    console.log(req.params);
    if(pgname == "Home"){
        res.sendFile(__dirname + "/home.html");
    }
    if(pgname == "Sign"){
        res.sendFile(__dirname + "/sign.html");
    }
    if(pgname == "Signup"){
        res.sendFile(__dirname + "/signup.html");
    }
})

app.listen("3000", function(){
    console.log("Server started at port 3000");
})