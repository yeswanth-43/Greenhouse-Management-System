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

  let temperatureData = [];
  let timestamps = [];
  let humidityData = [];
  let humidityTimestamps = [];

  const getUserLocation = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      if (response.ok) {
        const data = await response.json();
        return data.city ? `${data.city}, ${data.country_name}` : "Unknown Location";
      }
    } catch (error) {}
    return "Unknown Location";
  };

  const generateInsights = (temperature, humidity, soilMoisture) => {
    let insights = [];
    if (temperature !== null) {
      if (temperature > 35) insights.push("🔥 It's extremely hot. Ensure proper irrigation.");
      else if (temperature > 25) insights.push("☀️ Warm weather detected. Keep plants hydrated.");
      else if (temperature < 10) insights.push("❄️ Cold temperatures detected. Protect crops.");
      else insights.push("🌤️ Moderate temperature. Good for most plants.");
    }
    if (humidity !== null) {
      if (humidity > 80) insights.push("💦 High humidity detected. Risk of fungal infections.");
      else if (humidity < 30) insights.push("🌵 Low humidity levels. Watering may be needed.");
      else insights.push("🌿 Humidity levels are optimal.");
    }
    if (soilMoisture !== null) {
      if (soilMoisture < 20) insights.push("🚨 Low soil moisture! Immediate watering needed.");
      else if (soilMoisture > 80) insights.push("⚠️ Too much moisture. Reduce irrigation.");
      else insights.push("🌱 Soil moisture levels are balanced.");
    }
    let finalInsights = insights.length > 0 ? insights.join("\n") : "No sufficient data for insights.";

    finalInsights += "\n\n🌍 Smart Agriculture Solutions is here to help you monitor and improve your farm’s conditions.\n";
    finalInsights += "🔹 Get real-time insights on temperature, humidity, and soil moisture to optimize your crop health.\n";
    finalInsights += "🔹 Stay ahead with intelligent recommendations tailored to your environment.";
    return finalInsights;
  };

  const fetchSoilMoisture = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/soil-moisture");
      if (response.ok) {
        const data = await response.json();
        const soilMoisture = data.soilMoisture !== undefined ? data.soilMoisture : null;
        soilMoistureElement.textContent = soilMoisture !== null ? `${soilMoisture}%` : "No Data";
        return soilMoisture;
      }
    } catch (error) {}
    soilMoistureElement.textContent = "No Data";
    return null;
  };

  async function fetchWeatherData() {
    const userLocation = await getUserLocation();
    locationElement.textContent = userLocation;
    try {
      const city = userLocation.split(",")[0];
      const response = await fetch(`https://wttr.in/${city}?format=j1`);
      if (response.ok) {
        const data = await response.json();
        const temperature = parseInt(data.current_condition[0].temp_C);
        const humidity = parseInt(data.current_condition[0].humidity);
        tempElement.textContent = `${temperature} °C`;
        humidityElement.textContent = `${humidity} %`;
        updateTemperatureChartData(temperature, new Date().toLocaleTimeString());
        updateHumidityChartData(humidity, new Date().toLocaleTimeString());
        const soilMoisture = await fetchSoilMoisture();
        aiInsightsElement.innerHTML = generateInsights(temperature, humidity, soilMoisture).replace(/\n/g, "<br>");
      }
    } catch (error) {}
  }

  const updateTemperatureChartData = (temperature, time) => {
    temperatureData.push(temperature);
    timestamps.push(time);
    if (temperatureData.length > 10) {
      temperatureData.shift();
      timestamps.shift();
    }
    temperatureChart.update();
  };

  const updateHumidityChartData = (humidity, time) => {
    humidityData.push(humidity);
    humidityTimestamps.push(time);
    if (humidityData.length > 10) {
      humidityData.shift();
      humidityTimestamps.shift();
    }
    humidityChart.update();
  };

  const temperatureChart = new Chart(chartCanvas, {
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
    options: {
      responsive: true,
      scales: {
        x: {
          ticks: { color: "#fff" },
          grid: { color: "rgba(255,255,255,0.2)" },
          title: { display: true, text: "Time", color: "#fff" }
        },
        y: {
          ticks: { color: "#fff" },
          grid: { color: "rgba(255,255,255,0.2)" },
          title: { display: true, text: "Temperature (°C)", color: "#fff" }
        }
      },
      plugins: {
        legend: {
          labels: { color: "#fff" }
        }
      }
    }
  });

  const humidityChart = new Chart(humidityCanvas, {
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
    options: {
      responsive: true,
      scales: {
        x: {
          ticks: { color: "#fff" },
          grid: { color: "rgba(255,255,255,0.2)" },
          title: { display: true, text: "Time", color: "#fff" }
        },
        y: {
          ticks: { color: "#fff" },
          grid: { color: "rgba(255,255,255,0.2)" },
          title: { display: true, text: "Humidity (%)", color: "#fff" }
        }
      },
      plugins: {
        legend: {
          labels: { color: "#fff" }
        }
      }
    }
  });

  // Fetch data immediately, then every 60 seconds
  fetchWeatherData();
  setInterval(fetchWeatherData, 60000);
});
