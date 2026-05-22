const Exam = require('../models/exam.model');

class ExamValidator {
    validateCreate(data) {
        const validation = Exam.validate(data);
        if (!validation.isValid) {
            throw new Error(validation.errors.join(', '));
        }
        return true;
    }

    validateUpdate(data) {
        if (Object.keys(data).length === 0) {
            throw new Error('No data provided for update');
        }

        if (data.subject !== undefined && (typeof data.subject !== 'string' || data.subject.trim().length < 2)) {
            throw new Error('subject must be a string with at least 2 characters');
        }

        if (data.score !== undefined && (typeof data.score !== 'number' || data.score < 0 || data.score > 100)) {
            throw new Error('score must be a number between 0 and 100');
        }

        if (data.date !== undefined && isNaN(new Date(data.date).getTime())) {
            throw new Error('date must be a valid date');
        }

        return true;
    }

    validateId(id) {
        if (!id || typeof id !== 'string' || id.trim() === '') {
            throw new Error('Invalid ID format');
        }
        return true;
    }
}

module.exports = new ExamValidator();