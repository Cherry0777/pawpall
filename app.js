const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const _ = require("lodash");
var path = require('path');
const { reset } = require("nodemon");
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'mysql',
    database : 'puparazzi'
})
db.connect(function(err) {
    if(err){
        throw err;
    }
    console.log('MySQL connected...');
        var pupid=100;
        var pupname = pName;
        var pupbreed = pbreed;
        var pupage = p_age;
        var location=loc;
        var username=usrname;
        var pwd=pswd;
        var ownername=own_name;
        var ownerage=own_age;
        var phone=phonenum;
        var sql="INSERT into profile values ("+pupid+",'"+pupname+"','"+ pupbreed +"', "+ pupage + ", '"+ location +"','"+username+"','" +pwd+"','"+ownername+"',"+ownerage+","+phone+")";
            db.query(sql,function(err,result){
              if(err) throw err;
              console.log("record created"); 
    });
}) ;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res){
    res.sendFile(__dirname + "/signup.html");
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