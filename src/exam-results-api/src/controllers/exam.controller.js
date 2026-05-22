const examService = require('../services/exam.service');
const examValidator = require('../validators/exam.validator');

class ExamController {
    async getAllExams(req, res, next) {
        try {
            const exams = await examService.getAllExams();
            res.status(200).json({
                success: true,
                count: exams.length,
                data: exams
            });
        } catch (error) {
            next(error);
        }
    }

    async getExamById(req, res, next) {
        try {
            examValidator.validateId(req.params.id);
            const exam = await examService.getExamById(req.params.id);
            res.status(200).json({
                success: true,
                data: exam
            });
        } catch (error) {
            if (error.message === 'Exam not found') {
                res.status(404).json({ error: error.message });
            } else {
                next(error);
            }
        }
    }

    async getExamTeachers(req, res, next) {
        try {
            examValidator.validateId(req.params.examId);
            const teachers = await examService.getExamTeachers(req.params.examId);
            res.status(200).json({
                success: true,
                count: teachers.length,
                data: teachers
            });
        } catch (error) {
            if (error.message === 'Exam not found') {
                res.status(404).json({ error: error.message });
            } else {
                next(error);
            }
        }
    }

    async createExam(req, res, next) {
        try {
            examValidator.validateCreate(req.body);

            // Get abiturientId and teacherId from body or query
            const abiturientId = req.body.abiturientId || req.query.abiturientId;
            const teacherId = req.body.teacherId || req.query.teacherId;

            const exam = await examService.createExam(req.body, abiturientId, teacherId);
            res.status(201).json({
                success: true,
                message: 'Exam created successfully',
                data: exam
            });
        } catch (error) {
            if (error.message === 'Abiturient not found' || error.message === 'Teacher not found') {
                res.status(404).json({ error: error.message });
            } else {
                next(error);
            }
        }
    }

    async updateExam(req, res, next) {
        try {
            examValidator.validateId(req.params.id);
            examValidator.validateUpdate(req.body);
            const exam = await examService.updateExam(req.params.id, req.body);
            res.status(200).json({
                success: true,
                message: 'Exam updated successfully',
                data: exam
            });
        } catch (error) {
            if (error.message === 'Exam not found') {
                res.status(404).json({ error: error.message });
            } else if (error.message === 'Abiturient not found' || error.message === 'Teacher not found') {
                res.status(404).json({ error: error.message });
            } else {
                next(error);
            }
        }
    }

    async deleteExam(req, res, next) {
        try {
            examValidator.validateId(req.params.id);
            await examService.deleteExam(req.params.id);
            res.status(200).json({
                success: true,
                message: 'Exam deleted successfully'
            });
        } catch (error) {
            if (error.message === 'Exam not found') {
                res.status(404).json({ error: error.message });
            } else {
                next(error);
            }
        }
    }
}

module.exports = new ExamController();