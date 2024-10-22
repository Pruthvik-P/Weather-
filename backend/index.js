const express = require('express');
const cron = require('node-cron');
const path = require('path');
const connectDB = require('./database');
const { processWeatherUpdates, rollupDailySummary } = require('./weatherService');
const checkForAlerts = require('./alertService');
const dashboardRoutes = require('./routes/dashboard');

const app = express();

// Connect to the database
connectDB();

// Set up middleware and static file serving
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public'))); // Correctly serving static files
app.use('/dashboard', dashboardRoutes);

// Schedule weather updates every 5 minutes
cron.schedule('*/5 * * * *', async () => {
    console.log('Fetching weather updates...');
    await processWeatherUpdates();
});

// Schedule daily summary rollup at midnight
cron.schedule('0 0 * * *', async () => {
    console.log('Rolling up daily weather summaries...');
    await rollupDailySummary();
});

// Check for temperature alerts every 5 minutes
cron.schedule('*/5 * * * *', async () => {
    console.log('Checking for weather alerts...');
    await checkForAlerts();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
