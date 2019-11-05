const mysql = require('mysql');
var mysql_connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'Library',
  multipleStatements : true
});

mysql_connection.connect((err)=>{
  if(!err){
    console.log("Library Database Connected");
  }else{
    console.log(err);
  }
});

module.exports = mysql_connection;
