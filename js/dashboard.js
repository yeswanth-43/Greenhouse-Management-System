document.addEventListener("DOMContentLoaded", async () => {
  // Shorter loading time
  setTimeout(() => {
    document.getElementById("loading-screen").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("loading-screen").style.display = "none";
      document.getElementById("main-content").style.display = "block";
    }, 1000);
  }, 2000);

  // LOGOUT
  const logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Logged out successfully!");
    window.location.href = "login.html";
  });

  const tempElement = document.getElementById("temp");
  const humidityElement = document.getElementById("humidity");
  const soilMoistureElement = document.getElementById("soilMoisture");
  const locationElement = document.getElementById("location");
  const aiInsightsElement = document.getElementById("aiInsights");
  const chartCanvas = document.getElementById("chart").getContext("2d");
  const humidityCanvas = document.getElementById("humidityChart").getContext("2d");

  // Simulate past data for charts
  let temperatureData = generatePastData(24, 20, 30); // Last 24 hours, min 20°C, max 30°C
  let timestamps = generateTimestamps(24);
  let humidityData = generatePastData(24, 40, 80); // Last 24 hours, min 40%, max 80%
  let humidityTimestamps = timestamps.slice(); // Clone timestamps for humidity

  initCharts();

  async function fetchWeatherData() {
    const userLocation = await getUserLocation();
    locationElement.textContent = userLocation;

    // Extract city, latitude, and longitude from the user location
    const locationParts = userLocation.split(', ');
    const city = locationParts[0];
    const country = locationParts[1];

    // Fetch the weather data using Open-Meteo API
    const weatherData = await getWeatherData(city);

    if (weatherData) {
      const { temperature, humidity } = weatherData;

      // Update the temperature and humidity display
      tempElement.textContent = `${temperature}°C`;
      humidityElement.textContent = `${humidity}%`;

      // Simulate updating the charts with real-time data
      updateCharts(temperature, humidity);
    } else {
      // If weather data is not available, show fallback values
      tempElement.textContent = "Failed to load";
      humidityElement.textContent = "Failed to load";
    }

    const currentDate = new Date();
    updateCharts(currentDate.getHours() + ":" + currentDate.getMinutes());
  }

  // Fetch weather data from Open-Meteo API based on latitude and longitude
  async function getWeatherData(city) {
    try {
      // Using Open-Meteo API to get weather data based on city name and latitude/longitude
      const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&language=en`);
      const geoData = await geoResponse.json();
      const latitude = geoData.results[0].latitude;
      const longitude = geoData.results[0].longitude;

      const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
      const weatherData = await weatherResponse.json();

      if (weatherData && weatherData.current_weather) {
        const temperature = weatherData.current_weather.temperature; // Temperature in Celsius
        const humidity = weatherData.current_weather.humidity; // Humidity in percentage
        return { temperature, humidity };
      } else {
        console.error("Error fetching weather data:", weatherData);
        return null;
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  }

  // Function to get user's geolocation (latitude and longitude)
  async function getUserLocation() {
    try {
      const response = await fetch("https://ipapi.co/json/");
      if (response.ok) {
        const data = await response.json();
        return data.city ? `${data.city}, ${data.country_name}` : "Unknown Location";
      }
    } catch (error) {
      console.error("Error fetching location", error);
      return "Unknown Location";
    }
  }

  // Function to generate past data for temperature and humidity
  function generatePastData(hours, min, max) {
    return Array.from({ length: hours }, () => Math.floor(Math.random() * (max - min + 1) + min));
  }

  // Function to generate timestamps for the chart
  function generateTimestamps(hours) {
    let result = [];
    for (let i = 1; i <= hours; i++) {
      result.push(i + "h");
    }
    return result;
  }

  // Chart initialization
  function initCharts() {
    temperatureChart = new Chart(chartCanvas, {
      type: "line",
      data: {
        labels: timestamps,
        datasets: [
          {
            label: "Temperature (°C)",
            data: temperatureData,
            borderColor: "rgb(255, 99, 132)",
            tension: 0.2
          }
        ]
      },
      options: getChartOptions("Time", "Temperature (°C)")
    });

    humidityChart = new Chart(humidityCanvas, {
      type: "line",
      data: {
        labels: humidityTimestamps,
        datasets: [
          {
            label: "Humidity (%)",
            data: humidityData,
            borderColor: "rgb(54, 162, 235)",
            tension: 0.2
          }
        ]
      },
      options: getChartOptions("Time", "Humidity (%)")
    });
  }

  // Function to update charts with new temperature and humidity data
  function updateCharts(temperature, humidity) {
    // Update temperature and humidity data for charts (real-time)
    temperatureData.shift();
    temperatureData.push(temperature);

    humidityData.shift();
    humidityData.push(humidity);

    // Update chart labels to reflect current time
    const timeLabel = new Date().getHours() + ":" + new Date().getMinutes();
    timestamps.shift();
    timestamps.push(timeLabel);

    humidityTimestamps.shift();
    humidityTimestamps.push(timeLabel);

    // Update the charts
    temperatureChart.update();
    humidityChart.update();
  }

  // Chart options configuration
  function getChartOptions(xLabel, yLabel) {
    return {
      responsive: true,
      scales: {
        x: {
          ticks: { color: "#fff" },
          grid: { color: "rgba(255,255,255,0.2)" },
          title: { display: true, text: xLabel, color: "#fff" }
        },
        y: {
          ticks: { color: "#fff" },
          grid: { color: "rgba(255,255,255,0.2)" },
          title: { display: true, text: yLabel, color: "#fff" }
        }
      },
      plugins: {
        legend: {
          labels: { color: "#fff" }
        }
      }
    };
  }

  // Start fetching data
  fetchWeatherData();
  setInterval(fetchWeatherData, 60000); // Update data every 60 seconds
});
