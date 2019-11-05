const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../mysqlConnection');

Router.get('/', function (req, res){
  res.render('search_book')
});

Router.post('/:query', function (req, res){
  mysqlConnection.query(
    'SELECT b.isbn, b.title, b.available, group_concat(a.name separator", ") as "name"' +
    'FROM books b, author a, book_author ba ' +
    'WHERE b.isbn = ba.isbn AND ba.author_id = a.author_id AND ' +
    '(b.title LIKE "%' + req.params.query + '%" OR ' +
    'a.name LIKE "%' + req.params.query + '%" OR ' +
    'b.isbn LIKE "%' + req.params.query + '%") GROUP BY b.isbn',
    (err, rows, fields)=>{
    if(!err){
      if(rows.length>0){
        res.render('books', {rows: rows})
      }else {
        res.send("<div class='text-center'>No books available. Please modify your search</div>")
      }
    }else{
      console.log(err);
    }
  });
});

module.exports = Router;
