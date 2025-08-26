const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para proteger rutas
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtener token del header
      token = req.headers.authorization.split(' ')[1];
      
      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Obtener usuario del token
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({ message: 'No autorizado - Usuario no encontrado' });
      }

      if (!req.user.isActive) {
        return res.status(401).json({ message: 'No autorizado - Cuenta desactivada' });
      }

      next();
    } catch (error) {
      console.error('Error en middleware protect:', error);
      
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'No autorizado - Token inválido' });
      }
      
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'No autorizado - Token expirado' });
      }
      
      return res.status(401).json({ message: 'No autorizado' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'No autorizado - Token no encontrado' });
  }
};

// Middleware para verificar rol de administrador
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Acceso denegado - Se requieren permisos de administrador' });
  }
};

// Middleware opcional de autenticación (no bloquea si no hay token)
const optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    } catch (error) {
      // Si hay error, simplemente no asignar usuario (opcional)
      console.log('Token opcional inválido:', error.message);
    }
  }

  next();
};

module.exports = { protect, admin, optionalAuth };

