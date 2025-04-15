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
    const currentDate = new Date();
    updateCharts(currentDate.getHours() + ":" + currentDate.getMinutes());
  }

  function generatePastData(hours, min, max) {
    return Array.from({ length: hours }, () => Math.floor(Math.random() * (max - min + 1) + min));
  }

  function generateTimestamps(hours) {
    let result = [];
    for (let i = 1; i <= hours; i++) {
      result.push(i + "h");
    }
    return result;
  }

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

  function updateCharts(timeLabel) {
    // Simulate real-time data update
    temperatureData.shift();
    temperatureData.push(Math.floor(Math.random() * (30 - 20 + 1) + 20));
    humidityData.shift();
    humidityData.push(Math.floor(Math.random() * (80 - 40 + 1) + 40));

    // Update labels
    timestamps.shift();
    timestamps.push(timeLabel);
    humidityTimestamps.shift();
    humidityTimestamps.push(timeLabel);

    temperatureChart.update();
    humidityChart.update();
  }

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

  // Start fetching data
  fetchWeatherData();
  setInterval(fetchWeatherData, 60000); // Update data every 60 seconds
});
