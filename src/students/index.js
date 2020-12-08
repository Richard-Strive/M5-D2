const { Router } = require("express");
const express = require("express");

const router = express.Router();
/* Posso creare piu endpoint: router.get(""), router.post("") e cosi via. In sintessi e' un percorso che mi permette di fare 
determinate azioni al contento delle nostre "array" */

module.exports = router;
/* con questo, come su React.js, sto esportando il router */

router.get("/", (req, res) => {});

/* dal server ricevo localhost:3001/users/ e  */
