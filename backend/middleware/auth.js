const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Obtener token del header
      token = req.headers.authorization.split(' ')[1];

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Obtener usuario del token y adjuntarlo al request
      // Excluimos la contraseña
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ msg: 'No autorizado, usuario no encontrado' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ msg: 'No autorizado, token falló' });
    }
  }

  if (!token) {
    res.status(401).json({ msg: 'No autorizado, no hay token' });
  }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ msg: 'Acceso denegado, no eres administrador' });
    }
};

module.exports = { protect, admin };
