const abiturientRepository = require('../repositories/abiturient.memory.repository');
const examRepository = require('../repositories/exam.memory.repository');

class AbiturientService {
    async getAllAbiturients() {
        return await abiturientRepository.findAll();
    }

    async getAbiturientById(id) {
        const abiturient = await abiturientRepository.findById(id);
        if (!abiturient) {
            throw new Error('Abiturient not found');
        }
        return abiturient;
    }

    async getAbiturientExams(abiturientId) {
        const abiturient = await abiturientRepository.findById(abiturientId);
        if (!abiturient) {
            throw new Error('Abiturient not found');
        }
        return await examRepository.findByAbiturientId(abiturientId);
    }

    async createAbiturient(abiturientData) {
        const existingAbiturient = await abiturientRepository.findByEmail(abiturientData.email);
        if (existingAbiturient) {
            throw new Error('Abiturient with this email already exists');
        }
        return await abiturientRepository.create(abiturientData);
    }

    async updateAbiturient(id, abiturientData) {
        const abiturient = await abiturientRepository.findById(id);
        if (!abiturient) {
            throw new Error('Abiturient not found');
        }

        if (abiturientData.email && abiturientData.email !== abiturient.email) {
            const existingAbiturient = await abiturientRepository.findByEmail(abiturientData.email);
            if (existingAbiturient) {
                throw new Error('Abiturient with this email already exists');
            }
        }

        return await abiturientRepository.update(id, abiturientData);
    }

    async deleteAbiturient(id) {
        const abiturient = await abiturientRepository.findById(id);
        if (!abiturient) {
            throw new Error('Abiturient not found');
        }

        // First, nullify abiturientId in all related exams
        await examRepository.nullifyAbiturientId(id);

        // Then, delete exams that have both abiturientId and teacherId as null
        const deletedExams = await examRepository.deleteByCondition(exam =>
            exam.abiturientId === null && exam.teacherId === null
        );

        // Finally, delete the abiturient
        await abiturientRepository.delete(id);

        return { deletedExamsCount: deletedExams.length };
    }
}

module.exports = new AbiturientService();