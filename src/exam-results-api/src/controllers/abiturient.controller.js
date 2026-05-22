const abiturientService = require('../services/abiturient.service');
const abiturientValidator = require('../validators/abiturient.validator');

class AbiturientController {
    async getAllAbiturients(req, res, next) {
        try {
            const abiturients = await abiturientService.getAllAbiturients();
            res.status(200).json({
                success: true,
                count: abiturients.length,
                data: abiturients
            });
        } catch (error) {
            next(error);
        }
    }

    async getAbiturientById(req, res, next) {
        try {
            abiturientValidator.validateId(req.params.id);
            const abiturient = await abiturientService.getAbiturientById(req.params.id);
            res.status(200).json({
                success: true,
                data: abiturient
            });
        } catch (error) {
            if (error.message === 'Abiturient not found') {
                res.status(404).json({ error: error.message });
            } else {
                next(error);
            }
        }
    }

    async getAbiturientExams(req, res, next) {
        try {
            abiturientValidator.validateId(req.params.abiturientId);
            const exams = await abiturientService.getAbiturientExams(req.params.abiturientId);
            res.status(200).json({
                success: true,
                count: exams.length,
                data: exams
            });
        } catch (error) {
            if (error.message === 'Abiturient not found') {
                res.status(404).json({ error: error.message });
            } else {
                next(error);
            }
        }
    }

    async createAbiturient(req, res, next) {
        try {
            abiturientValidator.validateCreate(req.body);
            const abiturient = await abiturientService.createAbiturient(req.body);
            res.status(201).json({
                success: true,
                message: 'Abiturient created successfully',
                data: abiturient
            });
        } catch (error) {
            if (error.message.includes('already exists')) {
                res.status(409).json({ error: error.message });
            } else {
                next(error);
            }
        }
    }

    async updateAbiturient(req, res, next) {
        try {
            abiturientValidator.validateId(req.params.id);
            abiturientValidator.validateUpdate(req.body);
            const abiturient = await abiturientService.updateAbiturient(req.params.id, req.body);
            res.status(200).json({
                success: true,
                message: 'Abiturient updated successfully',
                data: abiturient
            });
        } catch (error) {
            if (error.message === 'Abiturient not found') {
                res.status(404).json({ error: error.message });
            } else if (error.message.includes('already exists')) {
                res.status(409).json({ error: error.message });
            } else {
                next(error);
            }
        }
    }

    async deleteAbiturient(req, res, next) {
        try {
            abiturientValidator.validateId(req.params.id);
            const result = await abiturientService.deleteAbiturient(req.params.id);
            res.status(200).json({
                success: true,
                message: 'Abiturient deleted successfully',
                deletedExamsCount: result.deletedExamsCount
            });
        } catch (error) {
            if (error.message === 'Abiturient not found') {
                res.status(404).json({ error: error.message });
            } else {
                next(error);
            }
        }
    }
}

module.exports = new AbiturientController();