const User = require('../models/User');
const jwt = require('jsonwebtoken');


// Función para generar JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Registrar un nuevo usuario
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    console.log('Datos recibidos en register:', req.body);

    const { name, email, password } = req.body;

    // Validación de campos requeridos
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Todos los campos son obligatorios',
        required: ['name', 'email', 'password']
      });
    }

    // Validación de longitud de contraseña
    if (password.length < 6) {
      return res.status(400).json({
        message: 'La contraseña debe tener al menos 6 caracteres'
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        message: 'Ya existe un usuario con este email'
      });
    }

    // Crear usuario
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password
    });

    if (user) {
      const token = generateToken(user._id);
      
      console.log('Usuario registrado exitosamente:', user._id);
      
      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isActive: user.isActive
        },
        token
      });
    } else {
      res.status(400).json({ message: 'Datos de usuario inválidos' });
    }
  } catch (error) {
    console.error('Error en register:', error);
    
    // Manejar errores de validación de MongoDB
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ 
        message: 'Datos inválidos', 
        errors 
      });
    }

    // Manejar error de duplicado (email único)
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Ya existe un usuario con este email'
      });
    }

    res.status(500).json({ 
      message: 'Error interno del servidor',
      error: error.message 
    });
  }
};

// @desc    Autenticar usuario (login)
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    console.log('Intento de login:', req.body.email);

    const { email, password } = req.body;

    // Validación de campos requeridos
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email y contraseña son obligatorios'
      });
    }

    // Buscar usuario por email (incluyendo password para comparar)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(401).json({
        message: 'Credenciales inválidas'
      });
    }

    // Verificar si el usuario está activo
    if (!user.isActive) {
      return res.status(401).json({
        message: 'Cuenta desactivada. Contacta al administrador'
      });
    }

    // Verificar contraseña
    const isPasswordCorrect = await user.matchPassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Credenciales inválidas'
      });
    }

    const token = generateToken(user._id);
    
    console.log('Login exitoso para usuario:', user._id);

    res.json({
      message: 'Login exitoso',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        location: user.location,
        verified: user.verified
      },
      token
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ 
      message: 'Error interno del servidor',
      error: error.message 
    });
  }
};

// @desc    Obtener perfil del usuario actual
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (user) {
      res.json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          location: user.location,
          verified: user.verified,
          phone: user.phone,
          avatar: user.avatar,
          rating: user.rating,
          numReviews: user.numReviews,
          createdAt: user.createdAt
        }
      });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error en getProfile:', error);
    res.status(500).json({ 
      message: 'Error del servidor',
      error: error.message 
    });
  }
};

module.exports = {
  register,
  login,
  getProfile
};