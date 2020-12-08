const { Router } = require("express");
const express = require("express");
/* Third party elementi non integrati che devono essere importati */

const router = express.Router();
/* Posso creare piu endpoint: router.get(""), router.post("") e cosi via. In sintessi e' un percorso che mi permette di fare 
determinate azioni al contento delle nostre "array" */

const path = require("path");
/* core module integrati  */

const fs = require("fs");
/* core module integrato su express*/

router.get("/", (req, res) => {
  const studentsFilePath = "";
  console.log(
    __dirname
  ); /* directory dinamica che serve a creare il path in funzione dal sistema da cui ci stiamo accededno */
  console.log(
    path.join(__dirname, "students.json")
  ); /* l'unico modo per concatenare le path "path.join(__dirname, "students.json")"
  /* a) stiamo creando un percorso che ci permette di ritirare i dati dal students.json visto che non abbiamo ancora un database*/

  // console.log(req);
  res.send("I AM THE RESPONSE: LIST OF STUDENTS");
});
/* dal server ricevo localhost:3001/users/ e qui sopra sto creando una funzione che mi permette di ricevere risposta al percorso a aggiuntivo di "/"*/
router.get("/:id", (req, res) => {
  console.log(req);
  res.send("I AM THE RESPONSE: I AM A SIGLE STUDENT");
});

/* Post */
router.post("/", (req, res) => {
  console.log(req);
  res.send("I AM THE RESPONSE: STUDENT POST CREATED");
});

/*PUT*/
router.put("/", (req, res) => {
  console.log(req);
  res.send("I AM THE RESPONSE: STUDENT POST EDITED");
});
/*DELETE*/
router.delete("/", (req, res) => {
  console.log(req);
  res.send("I AM THE RESPONSE: STUDENT POST DELETED");
});

/*Abbiamo creato dei post, delete e put per permette al user di interagire con il nostro database(con i fetch)   */

module.exports = router;
/* con questo, come su React.js, sto esportando il router */
