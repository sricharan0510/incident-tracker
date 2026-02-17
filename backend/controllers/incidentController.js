const { Incident } = require('../models');
const { Op } = require('sequelize');

exports.getIncidents = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      sortBy = 'createdAt', 
      order = 'DESC', 
      severity, 
      status, 
      search 
    } = req.query;

    const offset = (page - 1) * limit;

    const whereClause = {};
    if (severity) whereClause.severity = severity;
    if (status) whereClause.status = status;
    
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { summary: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows } = await Incident.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, order.toUpperCase()]]
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      incidents: rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createIncident = async (req, res) => {
  try {
    const { title, service, severity, status, owner, summary } = req.body;
    
    if (!title || !service || !severity) {
      return res.status(400).json({ error: "Title, Service, and Severity are required." });
    }

    const newIncident = await Incident.create({
      title, service, severity, status, owner, summary
    });

    res.status(201).json(newIncident);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findByPk(req.params.id);
    if (!incident) return res.status(404).json({ error: "Incident not found" });
    res.json(incident);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateIncident = async (req, res) => {
  try {
    const { status, severity, owner, summary } = req.body;
    const incident = await Incident.findByPk(req.params.id);
    
    if (!incident) return res.status(404).json({ error: "Incident not found" });

    if (status) incident.status = status;
    if (severity) incident.severity = severity;
    if (owner) incident.owner = owner;
    if (summary) incident.summary = summary;

    await incident.save();
    res.json(incident);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};