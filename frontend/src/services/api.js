import axios from 'axios';

const API_URL = 'http://localhost:5000/api/incidents';

export const fetchIncidents = async (page = 1, limit = 10, search = '', severity = '', status = '', sortBy = 'createdAt', order = 'DESC') => {
  const params = { page, limit, sortBy, order };
  if (search) params.search = search;
  if (severity) params.severity = severity;
  if (status) params.status = status;

  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const createIncident = async (data) => {
  return await axios.post(API_URL, data);
};

export const updateIncident = async (id, data) => {
  return await axios.patch(`${API_URL}/${id}`, data);
};

export const getIncidentById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};