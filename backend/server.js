
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// SERVIR ARCHIVOS ESTÁTICOS DEL FRONTEND
app.use(express.static(path.join(__dirname, '../frontend')));

// Ruta para servir el frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Ruta de salud para verificar que el backend funciona
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    mensaje: 'Backend funcionando correctamente',
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

// Ruta para recibir datos del frontend - CORREGIDA
app.post('/api/datos', (req, res) => {
  const { nombre, mensaje } = req.body;
  res.json({
    respuesta: `Hola ${nombre}, recibí tu mensaje: "${mensaje}"`,
    procesado: true
  });
});

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
});