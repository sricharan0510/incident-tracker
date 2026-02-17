require('dotenv').config();
const express = require('express');
const cors = require('cors');
const incidentRoutes = require('./routes/incidentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 

app.use('/api/incidents', incidentRoutes);
app.get('/', (req, res) => {
  res.send('Incident Tracker API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});