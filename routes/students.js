const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Obtener todos los estudiantes
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los estudiantes.' });
  }
});

// Agregar un estudiante
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el estudiante.' });
  }
});

// Actualizar asistencia
router.post('/:id/attendance', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Estudiante no encontrado.' });
    }
    student.attendance.push(req.body.present); // Agrega true (asistencia) o false (falta)
    await student.save();
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la asistencia.' });
  }
});

// Eliminar el último registro de asistencia o falta
router.delete('/:id/attendance', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Estudiante no encontrado.' });
    }
    if (student.attendance.length > 0) {
      student.attendance.pop(); // Elimina el último elemento del array de asistencia
      await student.save();
      res.json(student);
    } else {
      res.status(400).json({ error: 'No hay registros de asistencia para eliminar.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el último registro de asistencia.' });
  }
});

// Eliminar un estudiante
router.delete('/:id', async (req, res) => {
  try {
    const result = await Student.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Estudiante no encontrado.' });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el estudiante.' });
  }
});

module.exports = router;