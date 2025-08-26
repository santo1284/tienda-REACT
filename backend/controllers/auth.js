const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Lista de correos de administradores
const ADMIN_EMAILS = [
  'admin1@mimotodelpueblo.com',
  'admin2@mimotodelpueblo.com',
  'santiagocalderonlara12@gmail.com',
];

// Función para generar un token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};


// @desc    Registrar un nuevo usuario
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    // Determinar el rol del usuario
    const role = ADMIN_EMAILS.includes(email.toLowerCase()) ? 'admin' : 'user';

    // Crear una nueva instancia de usuario
    user = new User({
      name,
      email,
      password,
      role,
    });

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Guardar el usuario en la base de datos
    await user.save();

    // Crear y devolver el token
    const token = generateToken(user._id, user.role);
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

// @desc    Autenticar un usuario (login)
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    // Verificar si el rol debe ser admin (por si se añadió después)
    if (ADMIN_EMAILS.includes(email.toLowerCase()) && user.role !== 'admin') {
      user.role = 'admin';
      await user.save();
    }

    // Crear y devolver el token
    const token = generateToken(user._id, user.role);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

module.exports = {
  register,
  login,
};
