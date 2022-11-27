const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const session = require('express-session');
const _ = require("lodash");
var bcrypt = require("bcrypt");
const saltRounds = 10;
var path = require('path');
const { reset } = require("nodemon");
var username_const="";
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'admin',
    database : 'puparazzi'
})

const app = express();
app.set("view engine", "ejs");
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// if (typeof window !== 'undefined') {
//     console.log('You are on the browser')
//   } else {
//     console.log('You are on the server')
//   }

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

db.connect(function(err) {
    if(err){
        throw err;
    }
    //console.log("Connected to the databse");
    //playmates:
   /* var pet1id=1, pet2id=2, R="F";
    var sql="INSERT into relation values ("+pet1id+","+pet2id+",'"+R+"')";
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log("record created in relation"); 
    });
    if(R=="F")
    var sql1="UPDATE relation SET status='F' where Pet2="+pet2id;
    if(R=="D")
    var sql1="Delete from relation where Pet2="+pet2id;
    db.query(sql1,function(err,result){
        if(err) throw err;
        console.log("record updated in relation"); 
    });
    //petcare:
    var petid1=1, petid2=2, Req="A"
    var sql="INSERT into petcare values ("+petid1+","+petid2+",'"+Req+"')";
    db.query(sql,function(err,result){
        if(err) throw err;
        console.log("record created in relation"); 
    });
    if(Req=="A")
    var sql1="UPDATE request SET status='A' where Pet2="+petid2;
    if(Req=="D")
    var sql1="Delete from request where Pet2="+petid2;
    db.query(sql1,function(err,result){
        if(err) throw err;
        console.log("record updated in relation"); 
    }); */

}) ;
var pupid;  
app.post('/add', async (req, res, next)=>{
    // var pupid=req.body.pID;var 
    username_const=username;
     var pupname = req.body.pName;
     var pupbreed = req.body.pbreed;
     var pupage = req.body.p_age;
     var location= req.body.loc;
     var username=req.body.usrname;
     var pwd=req.body.pswd;
     var ownername=req.body.own_name;
     var ownerage=req.body.own_age;
     var phone=req.body.phonenum;
     var encryptpassword = await bcrypt.hash(pwd, saltRounds)
    //console.log(encryptpassword);
     var sql = "INSERT INTO " + "profile" + "(Pup_name,Breed,Age,Location,Username,Password,Owner_name,Owner_age,Phone_number) VALUES ('"+pupname+"','"+pupbreed+"', '"+pupage+"', '"+location+"','"+username+"','"+encryptpassword+"','"+ownername+"','"+ownerage+"','"+phone+"');"
     db.query(sql,function(err,result, fields){
     if(err) throw err
     //console.log("record created in profile"); 
     res.render('home', {usrnme : username});
     //console.log(pwd);
 })    
})


app.get('/playmates', function(req, res){
    var s=1;
var obj = {};
    db.query("update temp set curuser ="+"'"+username_const+"'where sno=1;",function(err,result, fields){
        if(err) throw err
        console.log("HIII");
    })    ;
    db.query('SELECT * FROM profile', function(err, result) {
        if(err){
            throw err;
        } else {
            obj = {playmate: result};
            res.render('playmate', obj);                
        }
    });
});
app.post('/frens',function(req,res){
    var curusername=username_const;
var obj = {};
    db.query("select * from relation where status = 'F' and username1 ='"+curusername+"';",function(err,result){
        //select Username2 from relation where status = 'F' and username1 ='"+curusername+"';
        if(err) throw err
        else{
           obj = {frens: result};
           res.render('frens', obj);
        }
        console.log("Hello"); 
    })    ;
});

app.post('/pending',function(req,res){
    var curusername=username_const;
    var obj = {};
    db.query("select * from relation where status = 'P' and username1 ='"+curusername+"';",function(err,result){
        if(err) throw err
        else{
           obj = {pending: result};
           res.render('pending', obj);
        }
        console.log(result); 
    })    ;
});

app.post('/SENDREQ', (req, res, next)=>{
    var selectedusername = req.body.popname;
    var status = "P";
    console.log(selectedusername)
    var sql="INSERT into relation(username1,username2,status) values ('"+username_const+"','"+ selectedusername +"','"+ status +"') ";
    db.query(sql,function(err,result){
    if(err) throw err
    {console.log("request added in relation"); }
    res.sendFile(__dirname + "/accept.html");    
})    
});
app.post('/REQ', (req, res, next)=>{
    var s="F";
    var curusername = username_const;
    var selectedusername = "golu";
    var sql="UPDATE relation SET status = 'F' where  username1 ='"+curusername+"' AND username2 ='"+selectedusername+"';"
    db.query(sql,function(err,result){
    if(err) throw err
    console.log("request updated in relation"); 
    res.send("request updated");    
})    
});

app.post('/DELETEREQ', (req, res, next)=>{
     var curusername = username_const;
     var selectedusername = "ghost";     
     var sql="DELETE FROM relation where username1 ='"+curusername+"' AND username2 ='"+selectedusername+"';"
     db.query(sql,function(err,result){
     if(err) throw err
     console.log("request deleted in relation"); 
     res.sendFile(__dirname + "/reject.html");    
 })    
});

 //var nameofuser = document.getElementById("navbar");
//  let text = document.getElementById("navbar").textContent;
//  console.log(text);

// if (typeof window !== 'undefined') {
//     console.log('You are on the browser')
//   } else {
//     console.log('You are on the server')
//   }

// update temp set curuser=username where sno=1;
app.post('/check', async function(request, response) {
	// Capture the input fields
	let username = request.body.UName;
    //username_const = request.body.UName;
    //console.log(username_const);
    username_const=username;
    
	let password = request.body.Password;
	// Ensure the input fields exists and are not empty
	if(username && password){
        // Execute SQL query that'll select the account from the database based on the specified username and password;
        var sql="SELECT * from profile where username ='"+username+"';"
        //console.log(password);
        db.query(sql, async function (error, results, fields) {      
            if (error) throw error 
           // console.log("Logged In Successfully");

            if(results.length >0){      
            //retrieving password    
            const comparison = await bcrypt.compare(password, results[0].Password)     
                 
            if(comparison){              
                request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.render('home', {usrnme : username}); 
            }
        }
            else{            
                response.send('Incorrect Username and/or Password!');  
            }
            response.end();        
                      
            });
    } else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

// app.get('/home', function(request, response) {
// 	// If the user is loggedin
// 	if (request.session.loggedin) {
// 		// Output username
// 		response.send('Welcome back, ' + request.session.username + '!');
// 	} else {
// 		// Not logged in
// 		response.send('Please login to view this page!');
// 	}
// 	response.end();
// });

app.get("/", function (req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.get("/:pagename", function (req, res){
    console.log(username_const);
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
    // if(pgname == "Playmates"){
    //     res.sendFile(__dirname + "/playmates.html");
    // }
    if(pgname=="Vets"){
        res.sendFile(__dirname + "/vets.html");
    }
    if(pgname=="Volunteers"){
        res.sendFile(__dirname + "/volunteers.html");
    }
    if(pgname=="Vol"){
        res.sendFile(__dirname + "/vol.html");
    }
})

console.log(username_const);
app.listen("3000", function(){
    //console.log("Server started at port 3000");
})
    