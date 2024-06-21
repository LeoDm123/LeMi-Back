const Users = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { userName, email, password } = req.body;

  console.log(req.body);

  try {
    let user = await Users.findOne({ email });

    if (user) {
      return res.status(400).json({
        msg: "El usuario ya se encuentra registrado",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new Users({
      userName,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      msg: "Usuario registrado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hubo un problema a la hora de registrar el usuario",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Users.findOne({ email }).exec();

    if (!user) {
      return res.status(401).json({
        msg: "El email son incorrectos",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        msg: "la contraseña son incorrectos",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      msg: "Usuario logeado",
      token: token,
      user: {
        avatar: user.avatar || "",
        userName: user.userName || "Anonymous",
        authority: [user.rol || "USER"],
        email: user.email,
        invites: user.invites || [],
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hubo un problema a la hora de iniciar sesión",
    });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { userEmail } = req.query;

    const user = await Users.findOne({ userEmail });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await Users.find();

    if (!users) {
      return res.status(404).json({ message: "User data not found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const inviteUser = async (req, res) => {
  const { email, invMail } = req.body;

  try {
    let user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "Usuario no encontrado",
      });
    }

    user.invites.push({ email: invMail });
    await user.save();

    res.status(200).json({
      msg: "Invitado agregado al usuario existente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hubo un problema a la hora de agregar al invitado",
    });
  }
};

module.exports = {
  createUser,
  userLogin,
  getUserByEmail,
  getUsers,
  inviteUser,
};
