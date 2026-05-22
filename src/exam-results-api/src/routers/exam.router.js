const express = require('express');
const router = express.Router();
const examController = require('../controllers/exam.controller');

// GET /exams - get all exams
router.get('/', examController.getAllExams.bind(examController));

// POST /exams - create new exam
router.post('/', examController.createExam.bind(examController));

// GET /exams/:id - get exam by id
router.get('/:id', examController.getExamById.bind(examController));

// PUT /exams/:id - update exam
router.put('/:id', examController.updateExam.bind(examController));

// DELETE /exams/:id - delete exam
router.delete('/:id', examController.deleteExam.bind(examController));

// GET /exams/:id/teachers - get teachers for exam
router.get('/:examId/teachers', examController.getExamTeachers.bind(examController));

module.exports = router;