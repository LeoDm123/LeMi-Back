const { Schema, model } = require("mongoose");

const egresoSchema = Schema({
  email: {
    type: String,
    required: true,
  },

  egresos: [
    {
      categoria: {
        type: String,
        required: true,
      },

      subCategoria: {
        type: String,
        required: true,
      },

      comentarios: {
        type: String,
        required: true,
      },

      monto: {
        type: Number,
        required: true,
      },

      divisa: {
        type: String,
        required: true,
      },

      fechaPago: {
        type: Date,
        required: true,
      },

      cuotas: {
        type: Number,
        required: true,
      },

      repetir: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = model("Egresos", egresoSchema);
