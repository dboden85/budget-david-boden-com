const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(cors());

app.post('/login', login);

function login(req, res){
  const {user, pass} = req.body;
  const lInfo = {user: 'dboden', pass: 'poop'}

  if(user === lInfo.user && pass === lInfo.pass){
    res.status(200).json({message: "it worked", status: 1})
    console.log("it worked")
  }else{
    console.log("didn't work")
  }
}


// Start the server
server.listen(5001, () => {
    console.log(`Hello Dave! Server is running on port 5001`);
  });
  