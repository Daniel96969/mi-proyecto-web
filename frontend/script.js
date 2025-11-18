// script.js - VERSIÓN CORREGIDA

// URL de tu backend - VERIFICA QUE ESTA SEA LA CORRECTA
const BACKEND_URL = 'https://mi-proyecto-web-4qau.onrender.com';

// Elementos del DOM
const btnObtenerMensaje = document.getElementById('btnObtenerMensaje');
const btnEnviarDatos = document.getElementById('btnEnviarDatos');
const mensajeBackend = document.getElementById('mensajeBackend');
const respuestaBackend = document.getElementById('respuestaBackend');
const estadoConexion = document.getElementById('estadoConexion');

// Función para probar conexión
async function probarConexion() {
    try {
        estadoConexion.innerHTML = '🔄 Probando conexión...';
        
        const respuesta = await fetch(`${BACKEND_URL}/api/mensaje`);
        const datos = await respuesta.json();
        
        estadoConexion.innerHTML = `✅ Conectado al backend: ${datos.mensaje}`;
        estadoConexion.style.color = '#155724';
        
    } catch (error) {
        estadoConexion.innerHTML = `❌ Error de conexión: ${error.message}`;
        estadoConexion.style.color = '#721c24';
    }
}

// Obtener mensaje del backend - VERSIÓN CORREGIDA
btnObtenerMensaje.addEventListener('click', async () => {
    try {
        mensajeBackend.innerHTML = '🔄 Cargando...';
        
        const respuesta = await fetch(`${BACKEND_URL}/api/mensaje`);
        const datos = await respuesta.json();
        
        // ESTA ES LA PARTE CORREGIDA - usando las propiedades correctas
        mensajeBackend.innerHTML = `
            <strong>Mensaje:</strong> ${datos.mensaje}<br>
            <strong>Hora:</strong> ${datos.timestamp}<br>
            <strong>Servidor:</strong> ${datos.servidor}
        `;
        
    } catch (error) {
        mensajeBackend.innerHTML = `❌ Error: ${error.message}`;
    }
});

// Enviar datos al backend (mantener igual)
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