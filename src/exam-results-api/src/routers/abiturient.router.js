const express = require('express');
const router = express.Router();
const abiturientController = require('../controllers/abiturient.controller');

// GET /abiturients - get all abiturients
router.get('/', abiturientController.getAllAbiturients.bind(abiturientController));

// POST /abiturients - create new abiturient
router.post('/', abiturientController.createAbiturient.bind(abiturientController));

// GET /abiturients/:id - get abiturient by id
router.get('/:id', abiturientController.getAbiturientById.bind(abiturientController));

// PUT /abiturients/:id - update abiturient
router.put('/:id', abiturientController.updateAbiturient.bind(abiturientController));

// DELETE /abiturients/:id - delete abiturient
router.delete('/:id', abiturientController.deleteAbiturient.bind(abiturientController));

// GET /abiturients/:id/exams - get exams of abiturient
router.get('/:abiturientId/exams', abiturientController.getAbiturientExams.bind(abiturientController));

module.exports = router;