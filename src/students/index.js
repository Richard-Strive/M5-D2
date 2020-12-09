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

const uniqid = require("uniqid"); /* dopo aver npm i uniqid porcediamo con l'importarlo per poter generare "automagicamente" degli id ed e' un third party module*/

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
  const newStudent = req.body;
  /* cosi leggiamo la richiesta del body */
  newStudent.ID = uniqid();
  /* diamo degli id generati ai nostri POST */

  /*con "fs" interagiamo i file del sistema e in qusto caso stiamo sovrascivendo il mio students.json convertendo l'array in una stringa */
  console.log(studentsArray);
  studentsArray.push(newStudent);

  fs.writeFileSync(studentsFilePath, JSON.stringify(studentsArray));
  res.status(200).send(newStudent.ID);
});

/*PUT*/
router.put("/:id", (req, res) => {
  const studentsFilePath = path.join(__dirname, "students.json");
  const fileAsBuffer = fs.readFileSync(studentsFilePath);
  const fileAsString = fileAsBuffer.toString();
  const studentsArray = JSON.parse(fileAsString);
  /*come in precedenza LEGGIAMO il file*/

  const newStudentArray = studentsArray.filter(
    (student) => student.ID !== req.params.id
  );
  /* qui filtro e tengo visibile tutti quelli che non ha hanno L'id uguale a quello  del params.id vale la stessa cosa anche qui*/

  const modifiedStudent = req.body;
  modifiedStudent.ID = req.params.id;
  /* In quanto post quando modificiamo qualcosa dobbiamo inserire il body del req e in aggiunta abbiamo inserito un id che coincidesse con il param */

  newStudentArray.push(modifiedStudent);
  /* Nel nuovo array push lo student modificato */

  fs.writeFileSync(studentsFilePath, JSON.stringify(newStudentArray));
  /*qui converto il mio nuovo array in stringa e lo riscrivo nel file JSON anche sta volta  NB. I parametri sono: PERCORSO FILE E IL FILE STRINGATO*/
  console.log(req);
  res.status(200).send("I AM THE RESPONSE: STUDENT POST EDITED");
});
/*DELETE*/
router.delete("/:id", (req, res) => {
  const studentsFilePath = path.join(__dirname, "students.json");
  const fileAsBuffer = fs.readFileSync(studentsFilePath);
  const fileAsString = fileAsBuffer.toString();
  const studentsArray = JSON.parse(fileAsString);
  /*come in precedenza LEGGIAMO il file*/

  const idFromReq = req.params.id;

  const newStudentArray = studentsArray.filter(
    (student) => student.ID !== idFromReq
  );
  /* qui filtro e tengo visibile tutti quelli che non ha hanno L'id uguale a quello  del params.id */

  console.log(req);
  fs.writeFileSync(studentsFilePath, JSON.stringify(newStudentArray));
  /*qui converto il mio nuovo array in stringa e lo riscrivo nel file JSON*/
  res.status(204).send("I AM THE RESPONSE: STUDENT POST DELETED");
});

/*Abbiamo creato dei post, delete e put per permette al user di interagire con il nostro database(con i fetch)   */

module.exports = router;
/* con questo, come su React.js, sto esportando il router */
