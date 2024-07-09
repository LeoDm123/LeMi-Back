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
    dividir,
    condDiv,
    montoDiv,
  } = req.body;

  console.log(req.body);

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
      dividir,
      condDiv,
      montoDiv,
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

const fetchExpenseByID = async (req, res) => {
  try {
    const { email, expenseId } = req.query;

    if (!email || !expenseId) {
      return res
        .status(400)
        .json({ message: "Email and expenseId are required" });
    }

    const user = await Egresos.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const expense = user.egresos.id(expenseId);

    if (!expense) {
      return res.status(404).json({ message: "Egreso no encontrado" });
    }

    return res.status(200).json({ egreso: expense });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const editExpense = async (req, res) => {
  const { email, expenseId, updatedExpense } = req.body;

  try {
    let userExpense = await Egresos.findOne({ email });

    if (!userExpense) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const expenseIndex = userExpense.egresos.findIndex(
      (expense) => expense._id.toString() === expenseId
    );

    if (expenseIndex === -1) {
      return res.status(404).json({ msg: "Egreso no encontrado" });
    }

    userExpense.egresos[expenseIndex] = {
      ...userExpense.egresos[expenseIndex],
      ...updatedExpense,
    };

    await userExpense.save();

    res.status(200).json({ msg: "Egreso actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el egreso:", error);
    res.status(500).json({ msg: "Hubo un problema al actualizar el egreso" });
  }
};

const deleteExpense = async (req, res) => {
  const { email, expenseId } = req.body;

  try {
    let userExpense = await Egresos.findOne({ email });

    if (!userExpense) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    console.log(userExpense);

    const expenseIndex = userExpense.egresos.findIndex(
      (expense) => expense._id.toString() === expenseId
    );

    if (expenseIndex === -1) {
      return res.status(404).json({ msg: "Egreso no encontrado" });
    }

    userExpense.egresos.splice(expenseIndex, 1);

    await userExpense.save();

    res.status(200).json({ msg: "Egreso eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el egreso:", error);
    res.status(500).json({ msg: "Hubo un problema al eliminar el egreso" });
  }
};

module.exports = {
  createExpense,
  fetchExpenses,
  fetchExpenseByID,
  editExpense,
  deleteExpense,
};
