const express = require("express");

const studentsRoutes = require("./students/index");
/*importo il router dalla index.js */

const server = express();

const port = 3001;

server.use("/students", studentsRoutes);
/* qui dico al server di utilizzare il percorso che porta all'array di studenti  specificando il prefisso ("/students" che potrebbe essere arbitrario) e il percorso locale del mio file*/
server.listen(port, () => {
  console.log("It's working", port);
});
