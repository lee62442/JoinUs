var express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extendded: true}));
app.use(express.static(__dirname + "/public"));


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'join_us'
});


// app.get("/", function(req, res){
// 	res.send("You've reached the home page");
// 	// console.log("requested")
// });

app.get("/", function(req, res){
	// Find Count of users in database
	var q = "SELECT COUNT(*) AS count FROM users";
	connection.query(q, function(err, results){
		if (err) throw err;
		// console.log(results[0]);
		var count = results[0].count;
		// res.send("We have " + count + " users in our DB");
		res.render("home", {data: count});
		});
	// Response with that count
	// res.send("We have " + count + " users in our DB");
});

app.post("/register", function(req, res){
	var person = {
		email: req.body.email
	};
	
	connection.query('INSERT INTO users SET ?', person, function(err, result){
		if (err) throw err;
		// console.log(result);
		res.send("Thanks for joining our wait list!");
	});
});



app.get("/joke", function(req, res){
	var joke = "<strong>Knock knock...</strong> <em>Yes</em>";
	res.send(joke);
	// console.log('Requested the joke route!')
});

app.get("/random_num", function(req, res){
	var num = Math.floor(Math.random()*10)+1;
	res.send("Your lucky number is " + num);
});

app.listen(3000, function(){
	console.log("Server running on 3000!")
});