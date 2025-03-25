// Example with MongoDB
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  soilMoisture: Number,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Data', dataSchema);
