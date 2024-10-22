const mongoose = require('mongoose');

const dailySummarySchema = new mongoose.Schema({
    city: String,
    avg_temp: Number,
    max_temp: Number,
    min_temp: Number,
    dominant_weather: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DailySummary', dailySummarySchema);
