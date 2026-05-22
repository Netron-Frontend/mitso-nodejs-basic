const teacherRepository = require('../repositories/teacher.memory.repository');
const examRepository = require('../repositories/exam.memory.repository');

class TeacherService {
    async getAllTeachers() {
        return await teacherRepository.findAll();
    }

    async getTeacherById(id) {
        const teacher = await teacherRepository.findById(id);
        if (!teacher) {
            throw new Error('Teacher not found');
        }
        return teacher;
    }

    async getTeacherExams(teacherId) {
        const teacher = await teacherRepository.findById(teacherId);
        if (!teacher) {
            throw new Error('Teacher not found');
        }
        return await examRepository.findByTeacherId(teacherId);
    }

    async createTeacher(teacherData) {
        if (teacherData.email) {
            const existingTeacher = await teacherRepository.findByEmail(teacherData.email);
            if (existingTeacher) {
                throw new Error('Teacher with this email already exists');
            }
        }
        return await teacherRepository.create(teacherData);
    }

    async updateTeacher(id, teacherData) {
        const teacher = await teacherRepository.findById(id);
        if (!teacher) {
            throw new Error('Teacher not found');
        }

        if (teacherData.email && teacherData.email !== teacher.email) {
            const existingTeacher = await teacherRepository.findByEmail(teacherData.email);
            if (existingTeacher) {
                throw new Error('Teacher with this email already exists');
            }
        }

        return await teacherRepository.update(id, teacherData);
    }

    async deleteTeacher(id) {
        const teacher = await teacherRepository.findById(id);
        if (!teacher) {
            throw new Error('Teacher not found');
        }

        // First, nullify teacherId in all related exams
        await examRepository.nullifyTeacherId(id);

        // Then, delete exams that have both abiturientId and teacherId as null
        const deletedExams = await examRepository.deleteByCondition(exam =>
            exam.abiturientId === null && exam.teacherId === null
        );

        // Finally, delete the teacher
        await teacherRepository.delete(id);

        return { deletedExamsCount: deletedExams.length };
    }
}

module.exports = new TeacherService();