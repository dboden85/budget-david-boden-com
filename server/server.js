const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);



// Start the server
server.listen(5001, () => {
    console.log(`Hello Dave! Server is running on port 5001`);
  });
  