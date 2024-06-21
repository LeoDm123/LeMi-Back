const Users = require("../models/user-model");
const Ingresos = require("../models/ingreso-model");
const Categorias = require("../models/categoria-model");

const createIncome = async (req, res) => {
  const {
    email,
    comentarios,
    categoria,
    subCategoria,
    monto,
    divisa,
    fechaPago,
    repetir,
  } = req.body;

  console.log(req.body);

  if (
    !email ||
    !comentarios ||
    !categoria ||
    !subCategoria ||
    !monto ||
    !divisa ||
    !fechaPago ||
    repetir === undefined
  ) {
    return res.status(400).json({ msg: "Todos los campos son obligatorios" });
  }

  try {
    let category = await Categorias.findOne({ categoria });
    if (category) {
      return res.status(404).json({ msg: "La categoría ya existe" });
    }

    let userIncome = await Ingresos.findOne({ email });

    const newIncome = {
      comentarios,
      categoria,
      subCategoria,
      monto,
      divisa,
      fechaPago,
      repetir,
    };

    console.log("Nuevo ingreso:", newIncome);

    if (userIncome) {
      userIncome.ingresos.push(newIncome);
      await userIncome.save();
    } else {
      const newUserIncome = new Ingresos({
        email,
        ingresos: [newIncome],
      });

      await newUserIncome.save();
    }

    res.status(201).json({ msg: "Ingreso registrado correctamente" });
  } catch (error) {
    console.error("Error al registrar el ingreso:", error);
    res.status(500).json({ msg: "Hubo un problema al registrar el ingreso" });
  }
};

const fetchIncomes = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await Ingresos.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({ ingresos: user.ingresos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createIncome,
  fetchIncomes,
};
