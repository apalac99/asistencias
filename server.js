const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Importar rutas
const courseRoutes = require('./routes/courses');
const studentRoutes = require('./routes/students');
const uploadRoutes = require('./routes/uploads');
const cors = require('cors'); // Importar el paquete cors
const PORT = process.env.PORT || 1000; // Usar el puerto definido en la variable de entorno o el puerto 3000 por defecto

// Middleware
app.use(bodyParser.json()); // Parsear JSON en las solicitudes
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos desde la carpeta "public"

// Habilitar CORS para todas las solicitudes
app.use(cors());

// Rutas
app.use('/courses', courseRoutes); // Rutas para cursos
app.use('/students', studentRoutes); // Rutas para estudiantes
app.use('/uploads', uploadRoutes); // Rutas para subir archivos

// Ruta para servir el archivo HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html')); // Enviar el archivo HTML principal
});

// Configuración del puerto


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});