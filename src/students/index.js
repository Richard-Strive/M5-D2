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
  const studentsFilePath = path.join(__dirname, "students.json");
  console.log(
    __dirname
  ); /* directory dinamica che serve a creare il path in funzione dal sistema da cui ci stiamo accededno */
  console.log(
    path.join(__dirname, "students.json")
  ); /* l'unico modo per concatenare i path "path.join(__dirname, "students.json")"*/

  const fileAsBuffer = fs.readFileSync(
    studentsFilePath
  ); /* questo per leggere il file. Mi ritornera' un buffer, un codice criptato leggibile solo dalle macchine*/
  console.log(
    fileAsBuffer.toString()
  ); /* ==> con toString() convertiamo il buffer in qualcosa di leggibile==> poi lo convertiamo in un oggetto con JSON.parse(fileAsBuffer.toString())*/
  console.log(JSON.parse(fileAsBuffer.toString()));

  /* a) stiamo creando un percorso che ci permette di ritirare i dati dal students.json visto che non abbiamo ancora un database*/

  // console.log(req);
  res.send(JSON.parse(fileAsBuffer.toString()));
});
/* dal server ricevo localhost:3001/users/ e qui sopra sto creando una funzione che mi permette di ricevere risposta al percorso a aggiuntivo di "/"*/

router.get("/:id", (req, res) => {
  const studentsFilePath = path.join(__dirname, "students.json");
  const fileAsBuffer = fs.readFileSync(studentsFilePath);
  const fileAsString = fileAsBuffer.toString();
  const studentsArray = JSON.parse(fileAsString);
  /* qui sopra abbiamo la sintesi di quello che e' successo da linea 16 a linea 30 */

  const idFromReq = req.params.id;
  /*questo ci permette di prendere dal url della richiesta quello che coincide con "/:id"*/

  const student = studentsArray.filter((student) => student.ID === idFromReq);
  console.log(idFromReq);
  res.send(student);
});

/* Post */
router.post("/", (req, res) => {
  const studentsFilePath = path.join(__dirname, "students.json");
  const fileAsBuffer = fs.readFileSync(studentsFilePath);
  const fileAsString = fileAsBuffer.toString();
  const studentsArray = JSON.parse(fileAsString);
  /* in questo caso la parte superiore serve per leggere il contenuto vecchio del nostro file*/
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
