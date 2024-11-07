const mongoose = require('mongoose');

const hospitalResourceSchema = new mongoose.Schema({
  region: { type: String, required: true, unique: true },
  bedsAvailable: { type: Number, required: true },
  ventilatorsAvailable: { type: Number, required: true },
  ICUCapacity: { type: Number, required: true }
});

module.exports = mongoose.model('HospitalResource', hospitalResourceSchema);
