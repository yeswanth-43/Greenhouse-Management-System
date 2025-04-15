const fetch = require('node-fetch');
const { AI_API_URL } = require('../config/config');

// Simulate fetching AI insights
exports.fetchAIInsights = async () => {
  try {
    const response = await fetch(`${AI_API_URL}/generate-insights`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch AI insights');
  }
};
