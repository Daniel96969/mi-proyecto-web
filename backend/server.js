// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json()); // Para entender JSON en las peticiones

// Ruta de prueba para verificar que el backend funciona
app.get('/', (req, res) => {
  res.json({ 
    mensaje: '¡Backend funcionando correctamente!',
    fecha: new Date().toISOString()
  });
});

// Ruta que usará el frontend
app.get('/api/mensaje', (req, res) => {
  res.json({ 
    mensaje: '¡Hola desde el backend!',
    timestamp: new Date().toLocaleTimeString()
  });
});

// Ruta para recibir datos del frontend
app.post('/api/datos', (req, res) => {
  const { nombre, mensaje } = req.body;
  res.json({
    respuesta: `Hola ${nombre}, recibí tu mensaje: "${mensaje}"`,
    procesado: true
  });
});

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend ejecutándose en el puerto ${PORT}`);
  console.log(`📍 URL local: http://localhost:${PORT}`);
});