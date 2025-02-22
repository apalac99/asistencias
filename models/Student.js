const mongoose = require('../db');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course: { type: String, required: true },
  attendance: { type: [Boolean], default: [] }, // Lista de asistencias
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;