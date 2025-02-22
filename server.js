const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const courseRoutes = require('./routes/courses');
const studentRoutes = require('./routes/students');
const uploadRoutes = require('./routes/uploads');

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Rutas
app.use('/courses', courseRoutes);
app.use('/students', studentRoutes);
app.use('/uploads', uploadRoutes);

// Ruta para servir el archivo HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Iniciar el servidor
app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));