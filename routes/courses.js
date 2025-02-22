const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Obtener todos los estudiantes de un curso
router.get('/:course', async (req, res) => {
  const students = await Student.find({ course: req.params.course });
  res.json(students);
});

module.exports = router;