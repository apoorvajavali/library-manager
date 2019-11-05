const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../mysqlConnection');

Router.get('/:query', function (req, res){
  if(req.params.query == "all")
  {
    var getFines = "select l.loan_id, l.card_id, concat(fname, ' ', lname) as name, fine_amount as total, paid " +
                    "from fine f, borrower b, book_loan l " +
                    "where f.loan_id = l.loan_id and l.card_id = b.card_id"
    mysqlcall(getFines, "all")
  }
  else if (req.params.query == "unpaid") {
    var getFines = "select l.card_id, concat(fname, ' ', lname) as name, sum(fine_amount) as total " +
                    "from fine f, borrower b, book_loan l " +
                    "where f.loan_id = l.loan_id and l.card_id = b.card_id and f.paid is null " +
                    "group by card_id"
    mysqlcall(getFines, "unpaid")
  }
  else if (req.params.query == "update"){
    var updateFines = "insert into fine (loan_id, fine_amount)" +
                      " select * from (select loan_id, " +
                      "0.25 * DATEDIFF(case when date_in is null then curdate() else date_in end, due_date) as overdue" +
                      " from book_loan having overdue > 0) as f" +
                      " on duplicate key update fine_amount = if(paid is null, f.overdue, fine_amount)"
    mysqlConnection.query(updateFines,
      (err, fields)=>{
      if(!err){
          res.send("success")
      }else{
        console.log(err);
      }
    });
  }

  function mysqlcall(query, btn){
    mysqlConnection.query(query,
      (err, rows, fields)=>{
      if(!err){
        if(rows.length>0){
          res.render('manage_fines', {rows: rows, active: btn})
        }else {
          res.send("<div class='text-center'>No fine records found.</div>")
        }
      }else{
        console.log(err);
      }
    });
  }

});

Router.post('/:query', function (req, res){
  var checkReturn = "select date_in from book_loan where loan_id = " + req.body.loan_id
  mysqlConnection.query(checkReturn, (err, rows, fields)=>{
    if(!err){
      if(rows[0].date_in){
        var payFine = "update fine set paid = 1 where loan_id = " + req.body.loan_id
        mysqlConnection.query(payFine, (err, fields)=>{
          if(!err){
              res.send("success")
          }else{
            console.log(err);
          }
        });
      } else {
        res.send("notcheckedin")
      }
    }else{
      console.log(err);
    }
  });
});

module.exports = Router;
