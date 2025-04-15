const fetch = require('node-fetch');

// Simulate fetching temperature data
exports.getTemperature = async (req, res) => {
  try {
    // Simulate API call or database query
    const temperature = 25 + Math.random() * 5; // Mock temperature value
    res.json({ success: true, data: temperature });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching temperature' });
  }
};

// Simulate fetching humidity data
exports.getHumidity = async (req, res) => {
  try {
    const humidity = 60 + Math.random() * 10; // Mock humidity value
    res.json({ success: true, data: humidity });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching humidity' });
  }
};

// Simulate fetching soil moisture data
exports.getSoilMoisture = async (req, res) => {
  try {
    const soilMoisture = 30 + Math.random() * 20; // Mock soil moisture value
    res.json({ success: true, data: soilMoisture });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching soil moisture' });
  }
};
