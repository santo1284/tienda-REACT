// IMPORTACIONES NECESARIAS
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// CREAR APLICACIÓN EXPRESS
const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARE GLOBAL
app.use(cors());
app.use(express.json());

// RUTAS DE LA API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/admin', require('./routes/admin'));

app.get('/', (req, res) => {
  res.json({
    message: '🏍️ Mi Moto del Pueblo - Backend funcionando!',
    location: 'Garzón, Huila',
    timestamp: new Date().toISOString()
  });
});

// FUNCIÓN PARA INICIAR EL SERVIDOR
const startServer = async () => {
  console.log('Intentando conectar a la base de datos...');
  try {
    const conn = await connectDB();
    console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
    
    app.listen(PORT, () => {
      console.log(`🏍️ Mi Moto del Pueblo - Servidor corriendo en puerto ${PORT}`);
      console.log(`📡 API disponible en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`❌ Error de conexión a MongoDB: ${error.message}`);
    process.exit(1);
  }
  console.log('Función startServer ha terminado de ejecutarse.');
};

// INICIAR
startServer();