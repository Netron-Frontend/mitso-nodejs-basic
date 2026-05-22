const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher.controller');

// GET /teachers - get all teachers
router.get('/', teacherController.getAllTeachers.bind(teacherController));

// POST /teachers - create new teacher
router.post('/', teacherController.createTeacher.bind(teacherController));

// GET /teachers/:id - get teacher by id
router.get('/:id', teacherController.getTeacherById.bind(teacherController));

// PUT /teachers/:id - update teacher
router.put('/:id', teacherController.updateTeacher.bind(teacherController));

// DELETE /teachers/:id - delete teacher
router.delete('/:id', teacherController.deleteTeacher.bind(teacherController));

// GET /teachers/:id/exams - get exams of teacher
router.get('/:teacherId/exams', teacherController.getTeacherExams.bind(teacherController));

module.exports = router;