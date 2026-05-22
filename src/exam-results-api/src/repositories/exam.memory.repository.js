const db = require('../../src/config/database');
const Exam = require('../models/exam.model');

class ExamMemoryRepository {
    // Get all exams
    async findAll() {
        return [...db.exams];
    }

    // Find exam by ID
    async findById(id) {
        return db.exams.find(e => e.id === id) || null;
    }

    // Find exams by abiturient ID
    async findByAbiturientId(abiturientId) {
        return db.exams.filter(e => e.abiturientId === abiturientId);
    }

    // Find exams by teacher ID
    async findByTeacherId(teacherId) {
        return db.exams.filter(e => e.teacherId === teacherId);
    }

    // Create new exam
    async create(examData) {
        const id = Date.now().toString();
        const exam = new Exam(
            id,
            examData.subject,
            examData.score,
            examData.date,
            examData.abiturientId,
            examData.teacherId
        );
        db.exams.push(exam);
        return exam;
    }

    // Update exam
    async update(id, examData) {
        const index = db.exams.findIndex(e => e.id === id);
        if (index === -1) return null;

        const updatedExam = db.exams[index].update(examData);
        db.exams[index] = updatedExam;
        return updatedExam;
    }

    // Delete exam
    async delete(id) {
        const index = db.exams.findIndex(e => e.id === id);
        if (index === -1) return false;

        db.exams.splice(index, 1);
        return true;
    }

    // Delete exams by condition (for cleanup)
    async deleteByCondition(condition) {
        const toDelete = [];
        for (let i = db.exams.length - 1; i >= 0; i--) {
            if (condition(db.exams[i])) {
                toDelete.push(db.exams[i].id);
                db.exams.splice(i, 1);
            }
        }
        return toDelete;
    }

    // Update abiturientId to null for all exams of an abiturient
    async nullifyAbiturientId(abiturientId) {
        const updatedExams = [];
        for (let exam of db.exams) {
            if (exam.abiturientId === abiturientId) {
                exam.abiturientId = null;
                updatedExams.push(exam);
            }
        }
        return updatedExams;
    }

    // Update teacherId to null for all exams of a teacher
    async nullifyTeacherId(teacherId) {
        const updatedExams = [];
        for (let exam of db.exams) {
            if (exam.teacherId === teacherId) {
                exam.teacherId = null;
                updatedExams.push(exam);
            }
        }
        return updatedExams;
    }
}

module.exports = new ExamMemoryRepository();