const express = require("express");
const {
  createExpense,
  fetchExpenses,
} = require("../controllers/expense.controllers");

const routerExpense = express.Router();

routerExpense.post("/createExpense", createExpense);
routerExpense.get("/fetchExpenses", fetchExpenses);

module.exports = routerExpense;
