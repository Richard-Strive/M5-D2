const { Router } = require("express");
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

router.get("/", (req, res) => {
  const projectsArray = fileReader("projects.json");
  res.send(projectsArray);
});
router.get("/:id", (req, res) => {
  const projectsArray = fileReader("projects.json");
  const idFromReq = req.params.id;
  const project = projectsArray.filter((project) => project.ID === idFromReq);
  console.log(project);
  res.send(project);
});
router.post("/", (req, res) => {
  const projectsArray = fileReader("projects.json");
  const newProject = req.body;
  newProject.ID = uniqid();
  projectsArray.push(newProject);

  console.log(projectsArray);
  fs.writeFileSync(
    path.join(__dirname, "projects.json"),
    JSON.stringify(projectsArray)
  );
  res.status(201).send();
});

router.put("/:id", (req, res) => {
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
  res.send("Hello i am the response");
});
router.delete("/:id", (req, res) => {
  const projectsArray = fileReader("projects.json");
  console.log("DELETE ID");
  res.send("Hello i am the response");
});

module.exports = router;
