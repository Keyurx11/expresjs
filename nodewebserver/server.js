const express = require('express');
const server = express();
const port = 81; //change to port 80 unless already in use

server.listen(port, () => console.log(`Example web server listening at http://localhost:${port}`));