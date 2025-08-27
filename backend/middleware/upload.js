const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
require('dotenv').config();

// Configurar Cloudinary (asegúrate de que tus variables de entorno estén cargadas)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configurar Multer para usar almacenamiento en memoria
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Formato de archivo no válido. Solo se permiten imágenes.'), false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB
  }
}).single('image'); // 'image' es el nombre del campo en el formulario

// El middleware de subida real
const uploadImage = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      // Manejar errores de Multer (ej. archivo muy grande, tipo de archivo incorrecto)
      return res.status(400).json({ message: err.message });
    }

    // Si no hay archivo, simplemente pasamos al siguiente middleware.
    // El controlador de la ruta se encargará de validar si la imagen era requerida.
    if (!req.file) {
      return next();
    }

    // Función para subir el stream a Cloudinary
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          {
            folder: 'mi-moto-del-pueblo',
            public_id: `${file.fieldname}-${Date.now()}`
          },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    // Función asíncrona para llamar a la subida
    async function uploadToCloudinary(req) {
      try {
        let result = await streamUpload(req);
        // Adjuntar la información de la imagen al body para que el controlador la pueda usar
        req.body.images = [{ // Se guarda como array para ser consistente con el modelo
          url: result.secure_url,
          public_id: result.public_id
        }];
        console.log('Imagen subida a Cloudinary exitosamente:', req.body.images);
        next();
      } catch (error) {
        console.error('Error al subir a Cloudinary:', error);
        // Pasar el error al manejador de errores de Express
        next(error);
      }
    }

    uploadToCloudinary(req);
  });
};

module.exports = { uploadImage };
