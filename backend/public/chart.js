// Sample data arrays to store weather data
const labels = []; // Dates for the x-axis
const avgTemperatures = []; // Average temperatures
const maxTemperatures = []; // Maximum temperatures
const minTemperatures = []; // Minimum temperatures

// Function to update the chart with new data
function updateChartData(cityData) {
    // Clear existing data (if needed)
    if (labels.length > 0) {
        labels.length = 0;
        avgTemperatures.length = 0;
        maxTemperatures.length = 0;
        minTemperatures.length = 0;
    }

    // Loop through cityData to populate the data arrays
    cityData.forEach(data => {
        const date = new Date(data.date).toLocaleDateString(); // Format date
        labels.push(date);
        avgTemperatures.push(data.avgTemp);
        maxTemperatures.push(data.maxTemp);
        minTemperatures.push(data.minTemp);
    });

    // Create the chart
    const ctx = document.getElementById('tempChart').getContext('2d');
    const tempChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Avg Temperature (°C)',
                    data: avgTemperatures,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: 'Max Temperature (°C)',
                    data: maxTemperatures,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: 'Min Temperature (°C)',
                    data: minTemperatures,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Temperature (°C)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            }
        }
    });
}

// Example of how to call updateChartData with fetched data
// You can replace this with the actual data fetching mechanism
document.addEventListener('DOMContentLoaded', function () {
    // Sample data format
    const cityData = [
        { date: '2024-10-01', avgTemp: 25, maxTemp: 30, minTemp: 20 },
        { date: '2024-10-02', avgTemp: 26, maxTemp: 31, minTemp: 21 },
        { date: '2024-10-03', avgTemp: 24, maxTemp: 29, minTemp: 19 },
        // Add more data points as needed
    ];

    // Update the chart with sample data
    updateChartData(cityData);
});
