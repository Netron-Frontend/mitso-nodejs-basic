const teacherService = require('../services/teacher.service');
const teacherValidator = require('../validators/teacher.validator');

class TeacherController {
    async getAllTeachers(req, res, next) {
        try {
            const teachers = await teacherService.getAllTeachers();
            res.status(200).json({
                success: true,
                count: teachers.length,
                data: teachers
            });
        } catch (error) {
            next(error);
        }
    }

    async getTeacherById(req, res, next) {
        try {
            teacherValidator.validateId(req.params.id);
            const teacher = await teacherService.getTeacherById(req.params.id);
            res.status(200).json({
                success: true,
                data: teacher
            });
        } catch (error) {
            if (error.message === 'Teacher not found') {
                res.status(404).json({ error: error.message });
            } else {
                next(error);
            }
        }
    }

    async getTeacherExams(req, res, next) {
        try {
            teacherValidator.validateId(req.params.teacherId);
            const exams = await teacherService.getTeacherExams(req.params.teacherId);
            res.status(200).json({
                success: true,
                count: exams.length,
                data: exams
            });
        } catch (error) {
            if (error.message === 'Teacher not found') {
                res.status(404).json({ error: error.message });
            } else {
                next(error);
            }
        }
    }

    async createTeacher(req, res, next) {
        try {
            teacherValidator.validateCreate(req.body);
            const teacher = await teacherService.createTeacher(req.body);
            res.status(201).json({
                success: true,
                message: 'Teacher created successfully',
                data: teacher
            });
        } catch (error) {
            if (error.message.includes('already exists')) {
                res.status(409).json({ error: error.message });
            } else {
                next(error);
            }
        }
    }

    async updateTeacher(req, res, next) {
        try {
            teacherValidator.validateId(req.params.id);
            teacherValidator.validateUpdate(req.body);
            const teacher = await teacherService.updateTeacher(req.params.id, req.body);
            res.status(200).json({
                success: true,
                message: 'Teacher updated successfully',
                data: teacher
            });
        } catch (error) {
            if (error.message === 'Teacher not found') {
                res.status(404).json({ error: error.message });
            } else if (error.message.includes('already exists')) {
                res.status(409).json({ error: error.message });
            } else {
                next(error);
            }
        }
    }

    async deleteTeacher(req, res, next) {
        try {
            teacherValidator.validateId(req.params.id);
            const result = await teacherService.deleteTeacher(req.params.id);
            res.status(200).json({
                success: true,
                message: 'Teacher deleted successfully',
                deletedExamsCount: result.deletedExamsCount
            });
        } catch (error) {
            if (error.message === 'Teacher not found') {
                res.status(404).json({ error: error.message });
            } else {
                next(error);
            }
        }
    }
}

module.exports = new TeacherController();