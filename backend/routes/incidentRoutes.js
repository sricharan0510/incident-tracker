const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');

router.get('/', incidentController.getIncidents);
router.post('/', incidentController.createIncident);
router.get('/:id', incidentController.getIncidentById);
router.patch('/:id', incidentController.updateIncident);

module.exports = router;