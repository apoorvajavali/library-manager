const express = require('express');
const bodyParser = require('body-parser');
const mysqlConnection = require('./mysqlConnection');
const DefaultRoute = require('./routes/home_route');
const SearchBookRoute = require('./routes/searchbook_route');
const BorrowerRoute = require('./routes/addborrower_route');
const CheckoutBookRoute = require('./routes/checkoutbook_route');
const SearchBookLoanRoute = require('./routes/searchbookloan_route');
const CheckinBookRoute = require('./routes/checkinbook_route');
const ManageFineRoute = require('./routes/managefine_route');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.static(__dirname + '/public'));

app.use('/', DefaultRoute );
app.use('/searchbook', SearchBookRoute);
app.use('/addbookloan', CheckoutBookRoute);
app.use('/searchbookloan', SearchBookLoanRoute);
app.use('/addcheckindate', CheckinBookRoute);
app.use('/addborrower', BorrowerRoute);
app.use('/managefine', ManageFineRoute)
app.set('view engine', 'ejs');


app.listen(2330, function () {
  console.log('App listening on port 2330!')
});
