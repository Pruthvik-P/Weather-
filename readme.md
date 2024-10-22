# Weather Monitoring Dashboard

This is a Node.js application that monitors weather conditions in various cities and provides summarized insights using rollups and aggregates. It retrieves real-time weather data from the OpenWeatherMap API and visualizes the information using Chart.js.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [License](#license)

## Features

- Real-time weather data retrieval for cities in India (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad).
- Daily weather summary with average, maximum, and minimum temperatures.
- Dominant weather condition identification.
- Visualizations of weather trends using Chart.js.
- User-configurable alert thresholds for specific weather conditions.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (Node package manager)
- An API key from [OpenWeatherMap](https://openweathermap.org/api) to access weather data.

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
2. **Install dependencies**:

   Run the following command to install the required packages:

   ```bash
   npm install
   ```

## Configuration

1. **Set Up Environment Variables**:

   Create a `.env` file in the root of your project and add your OpenWeatherMap API key:

   ```plaintext
   OPENWEATHERMAP_API_KEY=your_api_key_here
   ```

   Replace `your_api_key_here` with your actual API key.

2. **Configure City List (Optional)**:

   You can modify the list of cities for which you want to retrieve weather data in the relevant section of your server code.

## Running the Application

1. **Start the server**:

   Use the following command to start the application:

   ```bash
   npm start
   ```

2. **Access the Dashboard**:

   Open your web browser and navigate to:

   ```bash
   http://localhost:3000/dashboard
   ```

   You should see the weather dashboard displaying real-time weather information and visualizations for the configured cities.

Usage
The dashboard will automatically update weather data at a configurable interval (e.g., every 5 minutes).
The dominant weather condition will be displayed along with a chart showing daily temperature trends.
Alerts will be triggered based on user-configurable thresholds for specific weather conditions.