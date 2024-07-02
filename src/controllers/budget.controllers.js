const Presupuestos = require("../models/presupuesto-model");
const Categorias = require("../models/categoria-model");

const createBudget = async (req, res) => {
  const {
    email,
    comentarios,
    categoria,
    subCategoria,
    monto,
    porcentaje,
    divisa,
    fechaPago,
    repetir,
  } = req.body;

  //   if (
  //     !email ||
  //     !comentarios ||
  //     !categoria ||
  //     !subCategoria ||
  //     !monto ||
  //     !porcentaje ||
  //     !divisa ||
  //     !fechaPago
  //   ) {
  //     return res.status(400).json({ msg: "Todos los campos son obligatorios" });
  //   }

  try {
    let category = await Categorias.findOne({ categoria });
    if (category) {
      return res.status(404).json({ msg: "La categoría ya existe" });
    }

    let userBudget = await Presupuestos.findOne({ email });

    const newBudget = {
      comentarios,
      categoria,
      subCategoria,
      monto,
      porcentaje,
      divisa,
      fechaPago,
      repetir,
    };

    if (userBudget) {
      userBudget.presupuestos.push(newBudget);
      await userBudget.save();
    } else {
      const newUserBudget = new Presupuestos({
        email,
        presupuestos: [newBudget],
      });

      await newUserBudget.save();
    }

    res.status(201).json({ msg: "Ingreso registrado correctamente" });
  } catch (error) {
    console.error("Error al registrar el ingreso:", error);
    res.status(500).json({ msg: "Hubo un problema al registrar el ingreso" });
  }
};

const fetchBudgets = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await Presupuestos.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({ presupuestos: user.presupuestos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createBudget,
  fetchBudgets,
};
