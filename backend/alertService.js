const nodemailer = require('nodemailer');
const WeatherUpdate = require('./models/WeatherUpdate');

const THRESHOLD = 35;  // Example threshold for temperature

async function checkForAlerts() {
    const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

    for (const city of cities) {
        const recentUpdates = await WeatherUpdate.find({ city }).sort({ timestamp: -1 }).limit(2);
        if (recentUpdates.length === 2) {
            if (recentUpdates[0].temp > THRESHOLD && recentUpdates[1].temp > THRESHOLD) {
                triggerAlert(city, recentUpdates[0].temp);
            }
        }
    }
}

function triggerAlert(city, temp) {
    console.log(`Alert: Temperature in ${city} exceeds ${THRESHOLD}°C: ${temp}°C`);

    // Optionally, send email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'recipient-email@gmail.com',
        subject: `Weather Alert for ${city}`,
        text: `The temperature in ${city} has exceeded ${THRESHOLD}°C. Current temp: ${temp}°C.`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error sending alert email', error);
        } else {
            console.log('Alert email sent: ' + info.response);
        }
    });
}

module.exports = checkForAlerts;
