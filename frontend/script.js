// script.js

// URL del backend - cambiar por tu URL de Render cuando despliegues
const BACKEND_URL = 'https://mi-proyecto-web-4qau.onrender.com/';

// Elementos del DOM
const btnObtenerMensaje = document.getElementById('btnObtenerMensaje');
const btnEnviarDatos = document.getElementById('btnEnviarDatos');
const mensajeBackend = document.getElementById('mensajeBackend');
const respuestaBackend = document.getElementById('respuestaBackend');
const estadoConexion = document.getElementById('estadoConexion');

// Función para probar la conexión al backend
async function probarConexion() {
    try {
        const respuesta = await fetch(`${BACKEND_URL}/`);
        const datos = await respuesta.json();
        
        estadoConexion.innerHTML = `✅ Conectado al backend: ${datos.mensaje}`;
        estadoConexion.style.color = '#155724';
        
    } catch (error) {
        estadoConexion.innerHTML = `❌ Error de conexión: ${error.message}`;
        estadoConexion.style.color = '#721c24';
    }
}

// Obtener mensaje del backend
btnObtenerMensaje.addEventListener('click', async () => {
    try {
        mensajeBackend.innerHTML = '🔄 Cargando...';
        
        const respuesta = await fetch(`${BACKEND_URL}/api/mensaje`);
        const datos = await respuesta.json();
        
        mensajeBackend.innerHTML = `
            <strong>Mensaje:</strong> ${datos.mensaje}<br>
            <strong>Hora:</strong> ${datos.timestamp}
        `;
        
    } catch (error) {
        mensajeBackend.innerHTML = `❌ Error: ${error.message}`;
    }
});

// Enviar datos al backend
btnEnviarDatos.addEventListener('click', async () => {
    const nombre = document.getElementById('inputNombre').value;
    const mensaje = document.getElementById('inputMensaje').value;
    
    if (!nombre || !mensaje) {
        alert('Por favor completa ambos campos');
        return;
    }
    
    try {
        respuestaBackend.innerHTML = '🔄 Enviando datos...';
        
        const respuesta = await fetch(`${BACKEND_URL}/api/datos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, mensaje })
        });
        
        const datos = await respuesta.json();
        
        respuestaBackend.innerHTML = `
            <strong>Respuesta:</strong> ${datos.respuesta}<br>
            <strong>Procesado:</strong> ${datos.procesado ? '✅ Sí' : '❌ No'}
        `;
        
    } catch (error) {
        respuestaBackend.innerHTML = `❌ Error: ${error.message}`;
    }
});

// Probar conexión al cargar la página
document.addEventListener('DOMContentLoaded', probarConexion);