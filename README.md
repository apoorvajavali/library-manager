# Library Management System

This system is targeted to help the librarians by providing a GUI based system for managing the tasks that they need to carry on the daily basis. LMS allows librarians to issue books to borrowers, check in the returned books, add new borrowers and manage fines for overdue book loans.

# System Architecture

Library management system is a Node.js based application. The technical architecture of LMS consists of following parts.
1.	Database server: This system uses MySQL as the database server where all the data pertaining to library is stored. Following are the tables stored in the Library database:
a.	Books: stores the ISBN, title and availability.
b.	Book loans: stores the details of books lent.
c.	Authors: stores distinct authors.
d.	Book Authors: stores the authors of the books.
e.	Borrower: stores the borrower details like card number, name, SSN, etc.
f.	Fine: stores the fine amount and payment that a borrower owes.

2.	Node.js Backend: This hosts the LMS and acts as the application server that renders the UI. It interacts with both database server and the client to process requests from client and query/read the data from the database. 

3.	Web GUI: This is the user interface part of LMS developed using jQuery, HTML, Bootstrap, Express.js (UI framework for Node.js). The UI will be accessed by the end user (librarians) via web browsers. It is the client through which user interacts with application and database server. 


# Demo

![Library Management System](https://media.giphy.com/media/VGbW0HwVSU7UCam8su/giphy.gif)
