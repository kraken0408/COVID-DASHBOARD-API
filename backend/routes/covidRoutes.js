const express = require('express');
const { authenticateJWT, authorizeRoles } = require('../middleware/authMiddleware');
const { updateCovidCases, getCovidCases, getCovidCasesByRegion, updateHospitalResources, getHospitalResources, vaccinationStatusRes } = require('../controllers/covidController');
const { VaccinationStatus } = require('../models/vaccinationStatus')
const router = express.Router();

// Route to get all COVID-19 cases
router.get('/cases', getCovidCases);

// Route to get COVID-19 cases by region
router.get('/cases/:region', getCovidCasesByRegion);

// Route to update COVID-19 cases (Healthcare officials only)
router.post('/cases/update', updateCovidCases);

// Route to get all hospital resources
router.get('/hospitals/resources', getHospitalResources);

// Route to update hospital resources (Hospitals only)
router.post('/hospitals/resources/update', updateHospitalResources);

// In covidRoutes.js
router.get('/vaccination-status', vaccinationStatusRes);



module.exports = router;
