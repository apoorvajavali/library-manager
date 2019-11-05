const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../mysqlConnection');

Router.post('/', function (req, res){
  var updateCheckinDate =  "UPDATE book_loan SET date_in = "
                  + "STR_TO_DATE('" + req.body.date_in + "', '%m/%d/%Y') "
                  + "WHERE loan_id = '" + req.body.loan_id + "'"
  mysqlConnection.query(updateCheckinDate, (err, fields)=>{
    if(!err){
      var updateAvailability = "UPDATE books SET available = 1 WHERE isbn = '" + req.body.isbn + "'"
      mysqlConnection.query(updateAvailability, (err, fields)=>{
        if(err){
          res.send(err);
        }else{
          res.send("success");
        }
      });
    }else{
      res.send(err);
    }
  });

});

module.exports = Router;
