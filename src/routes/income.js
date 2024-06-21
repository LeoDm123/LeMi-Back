const express = require("express");
const {
  createIncome,
  fetchIncomes,
} = require("../controllers/income.controllers");

const routerIncome = express.Router();

routerIncome.post("/createIncome", createIncome);
routerIncome.get("/fetchIncomes", fetchIncomes);

module.exports = routerIncome;
