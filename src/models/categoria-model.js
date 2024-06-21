const { Schema, model } = require("mongoose");

const categoriaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  subcategorias: [
    {
      nombre: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = model("Categorias", categoriaSchema);
