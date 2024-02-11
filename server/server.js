const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const server = http.createServer(app);

// DB Configuration
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'dboden',
  password: 'davbod12',
  database: 'budgetdb'
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.post('/create-user', signup);
app.get('/login', login);

function signup(req, res){
    const {fname, lname, email, uname, pass} = req.body; 
    const q = 'INSERT INTO users(fname, lname, email, uname, password) VALUES(?, ?, ?, ?, ?);';

    db.query(q, [fname, lname, email, uname, pass], (err, results)=>{
	    if(err){
	      console.log(err);
	      return;
	    }

	    res.status(200).json({'message': 'user created'});
    })
}

function login(req, res){
  const q = 'SELECT * FROM users';
  db.query(q, (err, results) => {
   res.json(results); 
  });
}


// Start the server
server.listen(5001, () => {
    console.log(`Hello Dave! Server is running on port 5001`);
  });
  
