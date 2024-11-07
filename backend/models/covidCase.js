const mongoose = require('mongoose');

const covidCaseSchema = new mongoose.Schema({
  region: { type: String, required: true, unique: true },
  activeCases: { type: Number, required: true },
  recoveredCases: { type: Number, required: true },
  deaths: { type: Number, required: true }
});

module.exports = mongoose.model('CovidCase', covidCaseSchema);
