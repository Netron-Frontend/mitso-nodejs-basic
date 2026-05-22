const db = require('../../src/config/database');
const Abiturient = require('../models/abiturient.model');

class AbiturientMemoryRepository {
    // Get all abiturients
    async findAll() {
        return [...db.abiturients];
    }

    // Find abiturient by ID
    async findById(id) {
        return db.abiturients.find(a => a.id === id) || null;
    }

    // Create new abiturient
    async create(abiturientData) {
        const id = Date.now().toString();
        const abiturient = new Abiturient(
            id,
            abiturientData.firstName,
            abiturientData.lastName,
            abiturientData.birthDate,
            abiturientData.phone,
            abiturientData.email,
            abiturientData.address
        );
        db.abiturients.push(abiturient);
        return abiturient;
    }

    // Update abiturient
    async update(id, abiturientData) {
        const index = db.abiturients.findIndex(a => a.id === id);
        if (index === -1) return null;

        const updatedAbiturient = db.abiturients[index].update(abiturientData);
        db.abiturients[index] = updatedAbiturient;
        return updatedAbiturient;
    }

    // Delete abiturient
    async delete(id) {
        const index = db.abiturients.findIndex(a => a.id === id);
        if (index === -1) return false;

        db.abiturients.splice(index, 1);
        return true;
    }

    // Find abiturient by email
    async findByEmail(email) {
        return db.abiturients.find(a => a.email === email) || null;
    }
}

module.exports = new AbiturientMemoryRepository();