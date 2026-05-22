/**
 * Exam Model
 * Represents an entrance exam taken by an abiturient
 */
class Exam {
    constructor(id, subject, score, date, abiturientId, teacherId) {
        this.id = id;
        this.subject = subject;
        this.score = score;
        this.date = date;
        this.abiturientId = abiturientId || null;
        this.teacherId = teacherId || null;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    // Validation method
    static validate(data) {
        const errors = [];

        if (!data.subject || typeof data.subject !== 'string' || data.subject.trim().length < 2) {
            errors.push('subject must be a string with at least 2 characters');
        }

        if (data.score === undefined || typeof data.score !== 'number' || data.score < 0 || data.score > 100) {
            errors.push('score must be a number between 0 and 100');
        }

        if (data.date && isNaN(new Date(data.date).getTime())) {
            errors.push('date must be a valid date');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Update method
    update(data) {
        if (data.subject) this.subject = data.subject;
        if (data.score !== undefined) this.score = data.score;
        if (data.date) this.date = data.date;
        if (data.abiturientId !== undefined) this.abiturientId = data.abiturientId;
        if (data.teacherId !== undefined) this.teacherId = data.teacherId;
        this.updatedAt = new Date();
        return this;
    }

    // Check if exam should be deleted (both IDs are null)
    shouldBeDeleted() {
        return this.abiturientId === null && this.teacherId === null;
    }

    // Convert to JSON
    toJSON() {
        return {
            id: this.id,
            subject: this.subject,
            score: this.score,
            date: this.date,
            abiturientId: this.abiturientId,
            teacherId: this.teacherId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = Exam;