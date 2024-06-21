const express = require("express");
const {
  createCategoria,
  createSubcategoria,
  fetchCategorias,
  fetchSubCategorias,
} = require("../controllers/categoria.controllers");

const routerCategoria = express.Router();

routerCategoria.post("/createCategoria", createCategoria);
routerCategoria.post("/createSubcategoria,", createSubcategoria);
routerCategoria.get("/fetchCategorias", fetchCategorias);
routerCategoria.get("/fetchSubCategorias", fetchSubCategorias);

module.exports = routerCategoria;
