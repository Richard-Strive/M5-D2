const express = require("express");
const studentsRoutes = require("./students/index");
const projectsRoutes = require("./projects/index");
/*importo il router dalla index.js */

const {
  notFoundErrorHandler,
  unauthorizedErrorHandler,
  forbiddenErrorHandler,
  badRequestErrorHandler,
  catchAllErrorHandler,
} = require("./projects/errorHandling");

const server = express();

const port = 3001;
server.use(express.json());
/* da configurare prima del route ed e' utilizzato per fixare i "undefined body" nei POST*/

const loggerMiddleWare = (req, res, next) => {
  console.log(`${req.method}`);
  next() /*non dobbiamo dimenticarci di questo perche' ci permette di ricevere una risposta dal nostro middleware*/;
};
/* Definisco il middleware e quello che andra' a fare */

server.use(loggerMiddleWare);
/* chiedo al server di utilizzare il middleware */

server.use("/students", studentsRoutes);
server.use("/projects", projectsRoutes);
/* qui dico al server di utilizzare il percorso che porta all'array di studenti  specificando il prefisso ("/students" che potrebbe essere arbitrario) e il percorso locale del mio file*/

server.use(notFoundErrorHandler);
server.use(unauthorizedErrorHandler);
server.use(forbiddenErrorHandler);
server.use(badRequestErrorHandler);
server.use(catchAllErrorHandler);
/*POSIZIONE ERROR HANDLER!!! CIOE' DEVE STARE ALLA FINE DI TUTTO COSI QUALORA DOVESSERO PRESENTARSI DEGLI ERRORI DA PARTE DEI ROUTE GLI ERRORI VERREBBERO RITIRATI DAL ROUTE*/
server.listen(port, () => {
  console.log("It's working", port);
});
