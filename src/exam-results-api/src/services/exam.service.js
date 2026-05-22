const examRepository = require('../repositories/exam.memory.repository');
const abiturientRepository = require('../repositories/abiturient.memory.repository');
const teacherRepository = require('../repositories/teacher.memory.repository');

class ExamService {
    async getAllExams() {
        return await examRepository.findAll();
    }

    async getExamById(id) {
        const exam = await examRepository.findById(id);
        if (!exam) {
            throw new Error('Exam not found');
        }
        return exam;
    }

    async getExamTeachers(examId) {
        const exam = await examRepository.findById(examId);
        if (!exam) {
            throw new Error('Exam not found');
        }

        if (!exam.teacherId) {
            return [];
        }

        const teacher = await teacherRepository.findById(exam.teacherId);
        return teacher ? [teacher] : [];
    }

    async createExam(examData, abiturientId, teacherId) {
        // Validate abiturient exists if provided
        if (abiturientId) {
            const abiturient = await abiturientRepository.findById(abiturientId);
            if (!abiturient) {
                throw new Error('Abiturient not found');
            }
        }

        // Validate teacher exists if provided
        if (teacherId) {
            const teacher = await teacherRepository.findById(teacherId);
            if (!teacher) {
                throw new Error('Teacher not found');
            }
        }

        const examToCreate = {
            ...examData,
            abiturientId: abiturientId || null,
            teacherId: teacherId || null
        };

        return await examRepository.create(examToCreate);
    }

    async updateExam(id, examData) {
        const exam = await examRepository.findById(id);
        if (!exam) {
            throw new Error('Exam not found');
        }

        // Validate abiturient exists if being updated
        if (examData.abiturientId !== undefined && examData.abiturientId !== null) {
            const abiturient = await abiturientRepository.findById(examData.abiturientId);
            if (!abiturient) {
                throw new Error('Abiturient not found');
            }
        }

        // Validate teacher exists if being updated
        if (examData.teacherId !== undefined && examData.teacherId !== null) {
            const teacher = await teacherRepository.findById(examData.teacherId);
            if (!teacher) {
                throw new Error('Teacher not found');
            }
        }

        return await examRepository.update(id, examData);
    }

    async deleteExam(id) {
        const exam = await examRepository.findById(id);
        if (!exam) {
            throw new Error('Exam not found');
        }

        return await examRepository.delete(id);
    }

    async getExamsByAbiturientId(abiturientId) {
        return await examRepository.findByAbiturientId(abiturientId);
    }

    async getExamsByTeacherId(teacherId) {
        return await examRepository.findByTeacherId(teacherId);
    }
}

module.exports = new ExamService();