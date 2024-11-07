const CovidCase = require('../models/covidCase');
const HospitalResource = require('../models/hospitalResource');
const vaccinationStatus = require('../models/vaccinationStatus');

// Update COVID-19 cases (Healthcare officials)
const updateCovidCases = async (req, res) => {
  try {
    const { region, activeCases, recoveredCases, deaths } = req.body;
    const updatedCase = await CovidCase.findOneAndUpdate(
      { region },
      { activeCases, recoveredCases, deaths },
      { new: true, upsert: true }
    );
    res.status(200).json(updatedCase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get all COVID-19 cases
const getCovidCases = async (req, res) => {
  try {
    const cases = await CovidCase.find();
    res.status(200).json(cases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get COVID-19 cases by region
const getCovidCasesByRegion = async (req, res) => {
  try {
    const region = req.params.region;
    const caseData = await CovidCase.findOne({ region });
    if (!caseData) {
      return res.status(404).json({ message: 'Region not found' });
    }
    res.status(200).json(caseData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update hospital resources (Hospitals)
const updateHospitalResources = async (req, res) => {
  try {
    const { region, bedsAvailable, ventilatorsAvailable, ICUCapacity } = req.body;
    const updatedResource = await HospitalResource.findOneAndUpdate(
      { region },
      { bedsAvailable, ventilatorsAvailable, ICUCapacity },
      { new: true, upsert: true }
    );
    res.status(200).json(updatedResource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all hospital resources
const getHospitalResources = async (req, res) => {
  try {
    const resources = await HospitalResource.find();
    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const vaccinationStatusRes = async (req, res) => {
    try {
        // Fetch vaccination data from your database or any other source
        const vaccinationData = await vaccinationStatus.find(); // Assuming you have a model called VaccinationStatus
        res.json(vaccinationData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
  updateCovidCases,
  getCovidCases,
  getCovidCasesByRegion,
  updateHospitalResources,
  getHospitalResources,
  vaccinationStatusRes
};
