const { Router } = require("express");
const { body, validationResult, check } = require("express-validator");
const express = require("express");

const router = express.Router();

const path = require("path");

const fs = require("fs");

const uniqid = require("uniqid");

const fileReader = (file) => {
  const myPath = path.join(__dirname, file);
  const myFileAsBuffer = fs.readFileSync(myPath);
  const fileAsString = myFileAsBuffer.toString();
  return JSON.parse(fileAsString);
};

router.get("/", (req, res, next) => {
  try {
    const projectsArray = fileReader("projects.jsons");
    res.send(projectsArray);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
/*Inserendo next tra i parametri e utitizzandolo come una funzione al suo interno "next()" verso la fine, abbiamo la possbilita' di mandare l'errore captati agli errorHandler del server che si trovano subito dopo i route*/
router.get("/:id", (req, res, next) => {
  try {
    const projectsArray = fileReader("projects.json");
    const idFromReq = req.params.id;
    const project = projectsArray.filter((project) => project.ID === idFromReq);
    if (project.length > 0) {
      res.send(project);
    } else {
      const err = new Error();
      err.httpStatusCode = 404;
      next(err);
    }
    console.log(project);
  } catch (err) {
    console.log(err);
  }
});

router.post(
  "/",
  [check("name").exists().withMessage("ASSHOLE WRITE YOUR NAME")],
  (req, res, next) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        const err = new Error();
        err.message = errors;
        err.httpStatusCode = 400;
        next(err);
      } else {
        const projectsArray = fileReader("projects.jsond");
        const newProject = { ...req.body, ID: uniqid(), postedAt: new Date() };
        projectsArray.push(newProject);
        console.log(projectsArray);
        fs.writeFileSync(
          path.join(__dirname, "projects.json"),
          JSON.stringify(projectsArray)
        );
        res.status(201).send();
      }
    } catch (err) {
      console.log(err);
    }
  }
);

router.put("/:id", (req, res, next) => {
  const projectsArray = fileReader("projects.json");

  const newProjectArray = projectsArray.filter(
    (project) => project.ID !== req.params.id
  );

  const modifiedProject = req.body;

  modifiedProject.ID = req.params.id;
  newProjectArray.push(modifiedProject);

  fs.writeFileSync(
    path.join(__dirname, "projects.json"),
    JSON.stringify(newProjectArray)
  );

  console.log("PUT ID");
  res.status(200).send();
});
router.delete("/:id", (req, res, next) => {
  const projectsArray = fileReader("projects.json");
  const newProjectArray = projectsArray.filter(
    (project) => project.ID !== req.params.id
  );

  fs.writeFileSync(
    path.join(__dirname, "projects.json"),
    JSON.stringify(newProjectArray)
  );
  console.log("DELETE ID");
  res.status(200).send();
});

module.exports = router;
