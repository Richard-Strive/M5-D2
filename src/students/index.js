const { Router } = require("express");
const express = require("express");

const router = express.Router();
/* Posso creare piu endpoint: router.get(""), router.post("") e cosi via. In sintessi e' un percorso che mi permette di fare 
determinate azioni al contento delle nostre "array" */

router.get("/", (req, res) => {
  console.log(req);
  res.send("I AM THE RESPONSE: LIST OF STUDENTS");
});
/* dal server ricevo localhost:3001/users/ e qui sopra sto creando una funzione che mi permette di ricevere risposta al percorso a aggiuntivo di "/"*/
router.get("/:id", (req, res) => {
  console.log(req);
  res.send("I AM THE RESPONSE: I AM A SIGLE STUDENT");
});

module.exports = router;
/* con questo, come su React.js, sto esportando il router */
