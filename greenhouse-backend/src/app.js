const express = require('express');
const cors = require('cors');
const dataRoutes = require('./routes/dataRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/data', dataRoutes);
app.use('/api/ai', aiRoutes);

module.exports = app;
