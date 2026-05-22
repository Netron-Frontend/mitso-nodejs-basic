/**
 * Abiturient (Applicant) Model
 * Represents a person applying for admission
 */
class Abiturient {
    constructor(id, firstName, lastName, birthDate, phone, email, address) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.phone = phone;
        this.email = email;
        this.address = address;
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

        if (data.phone && !/^\+?[\d\s-]{10,}$/.test(data.phone)) {
            errors.push('phone must be a valid phone number');
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
        if (data.birthDate) this.birthDate = data.birthDate;
        if (data.phone) this.phone = data.phone;
        if (data.email) this.email = data.email;
        if (data.address) this.address = data.address;
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
            birthDate: this.birthDate,
            phone: this.phone,
            email: this.email,
            address: this.address,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = Abiturient;