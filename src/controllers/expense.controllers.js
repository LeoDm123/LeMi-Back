const Egresos = require("../models/egreso-model");
const Categorias = require("../models/categoria-model");

const createExpense = async (req, res) => {
  const {
    email,
    comentarios,
    categoria,
    subCategoria,
    monto,
    divisa,
    fechaPago,
    cuotas,
    repetir,
  } = req.body;

  if (
    !email ||
    !comentarios ||
    !categoria ||
    !subCategoria ||
    !monto ||
    !divisa ||
    !fechaPago ||
    !cuotas ||
    repetir === undefined
  ) {
    return res.status(400).json({ msg: "Todos los campos son obligatorios" });
  }

  try {
    let category = await Categorias.findOne({ categoria });
    if (category) {
      return res.status(404).json({ msg: "La categoría ya existe" });
    }

    let userExpense = await Egresos.findOne({ email });

    const newExpense = {
      comentarios,
      categoria,
      subCategoria,
      monto,
      divisa,
      fechaPago,
      cuotas,
      repetir,
    };

    if (userExpense) {
      userExpense.egresos.push(newExpense);
      await userExpense.save();
    } else {
      const newUserExpense = new Egresos({
        email,
        egresos: [newExpense],
      });

      await newUserExpense.save();
    }

    res.status(201).json({ msg: "Ingreso registrado correctamente" });
  } catch (error) {
    console.error("Error al registrar el ingreso:", error);
    res.status(500).json({ msg: "Hubo un problema al registrar el ingreso" });
  }
};

const fetchExpenses = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await Egresos.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({ egresos: user.egresos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createExpense,
  fetchExpenses,
};
