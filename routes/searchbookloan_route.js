const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../mysqlConnection');

Router.get('/', function (req, res){
  res.render('search_bookloan')
});

Router.post('/:value', function (req, res){
  var getBookLoans = "SELECT bl.loan_id, bl.card_id, Concat(br.fname,' ', br.lname) as name, " +
  "bl.isbn, DATE_FORMAT(bl.date_out,'%m/%d/%Y') date_out, DATE_FORMAT(bl.due_date,'%m/%d/%Y') due_date, " +
  "CASE WHEN date_in IS NULL THEN 0 ELSE 1 END AS checked_in " +
  "FROM book_loan bl, borrower br " +
  "WHERE bl.card_id = br.card_id AND " +
  "(bl.isbn LIKE '%" + req.params.value + "%' OR " +
  "bl.card_id LIKE '%" + req.params.value + "%' OR " +
  "br.fname LIKE '%" + req.params.value + "%' OR " +
  'br.lname LIKE "%' + req.params.value + '%")';
  mysqlConnection.query(getBookLoans, (err, rows, fields)=>{
    if(!err){
      if(rows.length>0){
        res.render('book_loans', {rows: rows})
      }else {
        res.send("<div class='text-center'>No book loans available. Please modify your search</div>")
      }
    }else{
      console.log(err);
    }
  });
})

module.exports = Router;
