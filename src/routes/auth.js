const express = require("express");
const {
  createUser,
  userLogin,
  getUserByEmail,
  getUsers,
  inviteUser,
} = require("../controllers/auth.controllers");

const routerAuth = express.Router();

routerAuth.post("/createUser", createUser);
routerAuth.post("/userLogin", userLogin);
routerAuth.get("/getUserByEmail", getUserByEmail);
routerAuth.get("/getUsers", getUsers);
routerAuth.put("/inviteUser", inviteUser);

module.exports = routerAuth;
