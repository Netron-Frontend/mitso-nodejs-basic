const Teacher = require('../models/teacher.model');

class TeacherValidator {
    validateCreate(data) {
        const validation = Teacher.validate(data);
        if (!validation.isValid) {
            throw new Error(validation.errors.join(', '));
        }
        return true;
    }

    validateUpdate(data) {
        if (Object.keys(data).length === 0) {
            throw new Error('No data provided for update');
        }

        if (data.firstName && (typeof data.firstName !== 'string' || data.firstName.trim().length < 2)) {
            throw new Error('firstName must be a string with at least 2 characters');
        }

        if (data.lastName && (typeof data.lastName !== 'string' || data.lastName.trim().length < 2)) {
            throw new Error('lastName must be a string with at least 2 characters');
        }

        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            throw new Error('email must be a valid email address');
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

module.exports = new TeacherValidator();