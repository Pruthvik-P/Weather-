const express = require('express');
const router = express.Router();
const DailySummary = require('../models/DailySummary');
const WeatherUpdate = require('../models/WeatherUpdate');

router.get('/:city', async (req, res) => {
    const city = req.params.city;
    
    
    try {
        // Fetch daily summaries from the DB for the selected city
        const summaries = await WeatherUpdate.find({ city }).sort({ date: 1 }).lean();
  
        // Prepare data for visualization
        const dates = summaries.map(summary => new Date(summary.date).toLocaleDateString());
        const avgTemps = summaries.map(summary => summary.avg_temp);
        const maxTemps = summaries.map(summary => summary.max_temp);
        const minTemps = summaries.map(summary => summary.min_temp);

        // Determine the most frequent dominant weather condition
        const dominantWeather = summaries
            .map(summary => summary.dominant_weather)
            .reduce((prev, curr, _, arr) =>
                arr.filter(weather => weather === prev).length >= arr.filter(weather => weather === curr).length ? prev : curr);
            console.log("here")
        res.render('dashboard', {
            city,
            dates: JSON.stringify(dates),
            avgTemps: JSON.stringify(avgTemps),
            maxTemps: JSON.stringify(maxTemps),
            minTemps: JSON.stringify(minTemps),
            dominantWeather
        });
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

module.exports = router;
