const axios = require('axios');
const WeatherUpdate = require('./models/WeatherUpdate');
const DailySummary = require('./models/DailySummary');

const API_KEY = 'c55cf30a9c85423269017fd4b1838cb7';
const CITIES = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

async function fetchWeather(city) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const { main, weather, dt } = response.data;

        const temp_celsius = main.temp - 273.15;
        const feels_like_celsius = main.feels_like - 273.15;
 
        const weatherData = {
            city,
            temp: temp_celsius,
            feels_like: feels_like_celsius,
            main: weather[0].main,
            timestamp: dt
        };

        // Try to save data and log errors
        await WeatherUpdate.create(weatherData);
        console.log('Weather data saved successfully:');
        return weatherData;
    } catch (error) {
        console.error('Error saving weather data:', error);
    }
}


async function processWeatherUpdates() {
    for (const city of CITIES) {
        await fetchWeather(city);
    }
}

async function rollupDailySummary() {
    const summaries = [];

    for (const city of CITIES) {
        const updates = await WeatherUpdate.find({ city }).lean();

        const temps = updates.map(update => update.temp);
        const dominantWeather = updates
            .map(update => update.main)
            .reduce((prev, curr, _, arr) =>
                arr.filter(weather => weather === prev).length >= arr.filter(weather => weather === curr).length
                    ? prev
                    : curr);

        const dailySummary = {
            city,
            avg_temp: (temps.reduce((a, b) => a + b, 0) / temps.length),
            max_temp: Math.max(...temps),
            min_temp: Math.min(...temps),
            dominant_weather: dominantWeather
        };

        summaries.push(dailySummary);
        await DailySummary.create(dailySummary);
    }
    return summaries;
}

module.exports = {
    processWeatherUpdates,
    rollupDailySummary
};
