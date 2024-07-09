const { Schema, model } = require("mongoose");

const ingresoSchema = Schema({
  email: {
    type: String,
    required: true,
  },

  ingresos: [
    {
      categoria: {
        type: String,
        required: true,
      },

      subCategoria: {
        type: String,
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

      repetir: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = model("Ingresos", ingresoSchema);
