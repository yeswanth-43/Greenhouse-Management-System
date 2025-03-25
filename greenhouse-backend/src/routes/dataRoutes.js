const express = require('express');
const router = express.Router();

// Example routes
router.get('/temperature', (req, res) => {
    res.json({ message: 'Temperature data retrieved successfully' });
});

router.post('/temperature', (req, res) => {
    const { value } = req.body;
    res.json({ message: `Temperature data of ${value} saved successfully` });
});

module.exports = router;
