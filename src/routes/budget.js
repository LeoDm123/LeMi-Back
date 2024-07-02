const express = require("express");
const {
  createBudget,
  fetchBudgets,
} = require("../controllers/budget.controllers");

const routerBudget = express.Router();

routerBudget.post("/createBudget", createBudget);
routerBudget.get("/fetchBudgets", fetchBudgets);

module.exports = routerBudget;
