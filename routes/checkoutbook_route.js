const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../mysqlConnection');

Router.post('/', function (req, res){
  var getCount =  "SELECT COUNT(card_id) AS count FROM book_loan WHERE card_id ='"
                  + req.body.card_id + "' AND date_in IS NULL"
  mysqlConnection.query(getCount, (err, rows, fields)=>{
    if(!err){
      if(rows[0].count < 3){
        var insertBookloan =
                    "INSERT INTO book_loan(isbn,card_id,date_out,due_date) " +
                    "VALUES('" + req.body.isbn + "','" + req.body.card_id + "'," +
                    "STR_TO_DATE('" + req.body.date_out + "', '%m/%d/%Y')" + "," +
                    "STR_TO_DATE('" + req.body.due_date + "', '%m/%d/%Y')" + ")"
        mysqlConnection.query(insertBookloan, (err, fields)=>{
          if(!err){
            var updateAvailability = "UPDATE books SET available = 0 WHERE isbn = '" + req.body.isbn + "'"
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
      }else{
          res.send("exceeded")
      }
    }else{
      res.send(err);
    }
  });
});

module.exports = Router;
