const express = require('express');
const router = express.Router();
const path = require('path');
const hbs = require('express-handlebars');

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "dalzai",
  password: "mykhailnava1",
  database: "students"
});

router.use(express.urlencoded({
  extended: true
}));

router.get('/', (req,res)=>{
	res.render('home');
});

router.get('/new', (req, res, next)=>{
	res.render('create');
});

router.post('/new', (req, res)=>{
	var fname = req.body.fname;
	var sname = req.body.sname;
	var id = req.body.id;
	var residence = req.body.residence;
	con.connect(function(err) {
  		var sql = "INSERT INTO students (fname,sname,id,residence) VALUES ('"+fname+"','"+sname+"','"+id+"','"+residence+"')";
  		con.query(sql, function (err, result) {
    		if (err) throw err;
    		console.log("1 record inserted");
  		});
	});
	res.render('create');
});

router.get('/all', (req,res)=>{
	con.connect(function(err) {
  		con.query("SELECT * FROM students", function (err, result, fields) {
    		res.render('readall', {"students" : result});
  		});
	});
});

router.post('/student', (req,res)=>{
	var id = req.body['id'];
	con.connect(function(err) {
  		con.query("SELECT * FROM students where student_id ="+id, function (err, result, fields) {
    		res.render('readone', {"students" : result});
  		});
	});
});

router.post('/update', (req,res)=>{
	var student_id = req.body.student_id;
	var fname = req.body.fname;
	var sname = req.body.sname;
	var id = req.body.id;
	var residence = req.body.residence;
	con.connect(function(err) {
  		var sql = "	UPDATE students SET fname ='"+fname+"',sname='"+sname+"',id='"+id+"',residence='"+residence+
  		"' WHERE student_id = '"+student_id+"';";
  		con.query(sql, function (err, result) {
    		if (err) throw err;
    		console.log("1 record updated");
  		});
	});con.connect(function(err) {
  		con.query("SELECT * FROM students", function (err, result, fields) {
    		res.render('readall', {"students" : result});
  		});
	});
});

router.post('/delete/:id', (req,res)=>{
	var id = req.params.id;
	con.connect(function(err) {
  		var sql = "DELETE FROM students WHERE student_id = "+id+";";
  		con.query(sql, function (err, result) {
    		if (err) throw err;
    		console.log("1 record deleted");
  		});
	});
	con.connect(function(err) {
  		con.query("SELECT * FROM students", function (err, result, fields) {
    		res.render('readall', {"students" : result});
  		});
	});
});


module.exports = router;
