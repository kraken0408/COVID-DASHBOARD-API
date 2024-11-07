    const mongoose = require('mongoose');

    const vaccinationStatusSchema = new mongoose.Schema({
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        dosesAdministered: { type: Number, required: true },
        populationVaccinated: { type: Number, required: true },
        date: { type: Date, default: Date.now }
    });

    module.exports = mongoose.model('VaccinationStatus', vaccinationStatusSchema);
