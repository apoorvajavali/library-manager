const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../mysqlConnection');

Router.get('/', function (req, res){
  res.render('add_borrower');
});

Router.post('/', function (req, res){
  var insertBorrower = "INSERT INTO borrower(ssn,fname,lname,street,city,state,phone) VALUES('"
  + req.body.ssn + "','" + req.body.fname + "','" + req.body.lname + "','" + req.body.street + "','"
  + req.body.city + "','" + req.body.state + "','" + req.body.phone + "')";
  mysqlConnection.query(insertBorrower, (err, fields)=>{
    if(!err){
      res.send("success");
    }else{
      res.send(err);
    }
  });
});

module.exports = Router;
