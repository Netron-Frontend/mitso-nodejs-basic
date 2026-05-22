/**
 * Teacher Model
 * Represents a teacher who conducts exams
 */
class Teacher {
    constructor(id, firstName, lastName, specialization, department, email, phone) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.specialization = specialization;
        this.department = department;
        this.email = email;
        this.phone = phone;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    // Validation method
    static validate(data) {
        const errors = [];

        if (!data.firstName || typeof data.firstName !== 'string' || data.firstName.trim().length < 2) {
            errors.push('firstName must be a string with at least 2 characters');
        }

        if (!data.lastName || typeof data.lastName !== 'string' || data.lastName.trim().length < 2) {
            errors.push('lastName must be a string with at least 2 characters');
        }

        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.push('email must be a valid email address');
        }

        if (data.specialization && typeof data.specialization !== 'string') {
            errors.push('specialization must be a string');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Update method
    update(data) {
        if (data.firstName) this.firstName = data.firstName;
        if (data.lastName) this.lastName = data.lastName;
        if (data.specialization) this.specialization = data.specialization;
        if (data.department) this.department = data.department;
        if (data.email) this.email = data.email;
        if (data.phone) this.phone = data.phone;
        this.updatedAt = new Date();
        return this;
    }

    // Convert to JSON
    toJSON() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            fullName: `${this.firstName} ${this.lastName}`,
            specialization: this.specialization,
            department: this.department,
            email: this.email,
            phone: this.phone,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = Teacher;