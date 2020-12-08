const express = require("express");

const server = express();

const port = 3001;

server.listen(port, () => {
  console.log("It's working", port);
});
