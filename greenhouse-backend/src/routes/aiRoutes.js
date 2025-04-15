const express = require('express');
const router = express.Router();

// Example GET route
router.get('/status', (req, res) => {
    res.json({ message: 'AI module is running!' });
});

// Example POST route
router.post('/predict', (req, res) => {
    const inputData = req.body;
    // Simulate AI prediction logic
    const prediction = `Predicted value for input: ${JSON.stringify(inputData)}`;
    res.json({ prediction });
});

module.exports = router;
