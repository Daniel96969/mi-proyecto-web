
const express = require('express');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares - CORS CONFIGURADO CORRECTAMENTE
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Ruta principal del backend
app.get('/', (req, res) => {
    res.json({ 
    mensaje: '¡Backend funcionando correctamente!',
    fecha: new Date().toISOString(),
    instrucciones: 'Visita /api/mensaje para probar la API'
  });
});

// Ruta que usará el frontend
app.get('/api/mensaje', (req, res) => {
  res.json({ 
    mensaje: '¡Hola desde el backend!',
    timestamp: new Date().toLocaleTimeString(),
    servidor: 'Render - Backend API'
  });
});

// Ruta para recibir datos del frontend
app.post('/api/datos', (req, res) => {
  const { nombre, mensaje } = req.body;
  
  if (!nombre || !mensaje) {
    return res.status(400).json({
      error: 'Faltan datos: nombre y mensaje son requeridos'
    });
  }
  
  res.json({
    respuesta: `Hola ${nombre}, recibí tu mensaje: "${mensaje}"`,
    procesado: true,
    timestamp: new Date().toISOString()
  });
});

// Ruta de salud para verificar estado
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    servicio: 'Backend API',
    fecha: new Date().toISOString()
  });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    rutas_disponibles: [
      'GET /',
      'GET /health', 
      'GET /api/mensaje',
      'POST /api/datos'
    ]
  });
});

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend API ejecutándose en puerto ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
});