const express = require("express");
const {
  createExpense,
  fetchExpenses,
  fetchExpenseByID,
  editExpense,
  deleteExpense,
} = require("../controllers/expense.controllers");

const routerExpense = express.Router();

routerExpense.post("/createExpense", createExpense);
routerExpense.get("/fetchExpenses", fetchExpenses);
routerExpense.get("/fetchExpenseByID", fetchExpenseByID);
routerExpense.put("/editExpense", editExpense);
routerExpense.post("/deleteExpense", deleteExpense);

module.exports = routerExpense;
