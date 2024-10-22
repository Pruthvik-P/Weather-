const mongoose = require('mongoose');

const weatherUpdateSchema = new mongoose.Schema({
    city: String,
    temp: Number,
    feels_like: Number,
    main: String,
    timestamp: Number
});

module.exports = mongoose.model('WeatherUpdate', weatherUpdateSchema);
