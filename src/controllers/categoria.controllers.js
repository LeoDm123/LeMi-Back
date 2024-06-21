const Categorias = require("../models/categoria-model");

const createCategoria = async (req, res) => {
  const { nombre, tipo, subcategorias } = req.body;

  try {
    let existingCat = await Categorias.findOne({ nombre });

    if (existingCat) {
      return res.status(400).json({
        msg: "La categoría ya se encuentra registrada",
      });
    }

    const newCategoria = new Categorias({
      nombre,
      tipo,
      subcategorias,
    });

    await newCategoria.save();

    res.status(201).json({
      msg: "Categoría registrada con éxito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hubo un problema a la hora de registrar la categoría",
    });
  }
};

const createSubcategoria = async (req, res) => {
  const { categoriaId, nombre } = req.body;

  try {
    let existingCat = await Categorias.findById(categoriaId);

    if (!existingCat) {
      return res.status(404).json({
        msg: "Categoría no encontrada",
      });
    }

    existingCat.subcategorias.push({ nombre });

    await existingCat.save();

    res.status(201).json({
      msg: "Subcategoría registrada con éxito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hubo un problema a la hora de registrar la subcategoría",
    });
  }
};

const fetchCategorias = async (req, res) => {
  try {
    const categorias = await Categorias.find();

    return res.status(200).json(categorias);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const fetchSubCategorias = async (req, res) => {
  try {
    const { categoriaId } = req.query;

    const categoria = await Categorias.findById(categoriaId);

    if (!categoria) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    return res.status(200).json({ subcategorias: categoria.subcategorias });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createCategoria,
  createSubcategoria,
  fetchCategorias,
  fetchSubCategorias,
};
