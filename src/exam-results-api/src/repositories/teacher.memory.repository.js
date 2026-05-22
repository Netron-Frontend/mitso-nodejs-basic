const db = require('../../src/config/database');
const Teacher = require('../models/teacher.model');

class TeacherMemoryRepository {
    // Get all teachers
    async findAll() {
        return [...db.teachers];
    }

    // Find teacher by ID
    async findById(id) {
        return db.teachers.find(t => t.id === id) || null;
    }

    // Create new teacher
    async create(teacherData) {
        const id = Date.now().toString();
        const teacher = new Teacher(
            id,
            teacherData.firstName,
            teacherData.lastName,
            teacherData.specialization,
            teacherData.department,
            teacherData.email,
            teacherData.phone
        );
        db.teachers.push(teacher);
        return teacher;
    }

    // Update teacher
    async update(id, teacherData) {
        const index = db.teachers.findIndex(t => t.id === id);
        if (index === -1) return null;

        const updatedTeacher = db.teachers[index].update(teacherData);
        db.teachers[index] = updatedTeacher;
        return updatedTeacher;
    }

    // Delete teacher
    async delete(id) {
        const index = db.teachers.findIndex(t => t.id === id);
        if (index === -1) return false;

        db.teachers.splice(index, 1);
        return true;
    }

    // Find teacher by email
    async findByEmail(email) {
        return db.teachers.find(t => t.email === email) || null;
    }
}

module.exports = new TeacherMemoryRepository();