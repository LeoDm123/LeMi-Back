const { Schema, model } = require("mongoose");

const presupuestoSchema = Schema({
  email: {
    type: String,
    required: true,
  },

  presupuestos: [
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
      },

      porcentaje: {
        type: Number,
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

module.exports = model("Presupuestos", presupuestoSchema);
