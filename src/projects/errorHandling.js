const express = require("express");

const notFoundErrorHandler = (err, req, res, next) => {
  res.send(404).send("ERROR! Not Found!!! Keep serching but NOT HERE");
};
const unauthorizedErrorHandler = (err, req, res, next) => {
  res.send(401).send("ERROR! NOT AUTHORIZED.YOU THINK YOU ARE A MR.ROBOT???");
};
const forbiddenErrorHandler = (err, req, res, next) => {
  res.send(403).send("ERROR!!! FORBIDDEN. DON'T TRY IT AGAIN FAKE HACKER");
};
const badRequestErrorHandler = (err, req, res, next) => {
  res.send(400).send("Bad request dude :)");
};
const catchAllErrorHandler = (err, req, res, next) => {
  res.send(500).send("Just wanna trow a GENERIC ERROR");
};

module.exports = {
  notFoundErrorHandler,
  unauthorizedErrorHandler,
  forbiddenErrorHandler,
  badRequestErrorHandler,
  catchAllErrorHandler,
};
