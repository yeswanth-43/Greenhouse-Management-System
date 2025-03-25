document.addEventListener("DOMContentLoaded", async () => {
  setTimeout(() => {
    document.getElementById("loading-screen").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("loading-screen").style.display = "none";
      document.getElementById("main-content").style.display = "block";
    }, 500);
  }, 2000);

  // Optional LOGOUT button
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Logged out successfully!");
      window.location.href = "login.html";
    });
  }

  // Default values or fetch from an API
  const tempMinElement = document.getElementById("tempMin");
  const tempMaxElement = document.getElementById("tempMax");
  const humidityMinElement = document.getElementById("humidityMin");
  const humidityMaxElement = document.getElementById("humidityMax");
  const lightStartElement = document.getElementById("lightStart");
  const lightEndElement = document.getElementById("lightEnd");
  const irrigationIntervalElement = document.getElementById("irrigationInterval");
  const waterUsageElement = document.getElementById("waterUsage");

  if (tempMinElement) tempMinElement.value = 18;
  if (tempMaxElement) tempMaxElement.value = 30;
  if (humidityMinElement) humidityMinElement.value = 40;
  if (humidityMaxElement) humidityMaxElement.value = 80;
  if (lightStartElement) lightStartElement.value = "06:00";
  if (lightEndElement) lightEndElement.value = "18:00";
  if (irrigationIntervalElement) irrigationIntervalElement.value = 6;
  if (waterUsageElement) waterUsageElement.value = 50;

  const tempForm = document.getElementById("tempForm");
  const humidityForm = document.getElementById("humidityForm");
  const lightingForm = document.getElementById("lightingForm");
  const irrigationForm = document.getElementById("irrigationForm");

  if (tempForm) {
    tempForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const tempMin = tempMinElement.value;
      const tempMax = tempMaxElement.value;
      console.log(`Saved Temperature: Min ${tempMin}, Max ${tempMax}`);
      alert("Temperature settings saved successfully!");
    });
  }

  if (humidityForm) {
    humidityForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const humMin = humidityMinElement.value;
      const humMax = humidityMaxElement.value;
      console.log(`Saved Humidity: Min ${humMin}, Max ${humMax}`);
      alert("Humidity settings saved successfully!");
    });
  }

  if (lightingForm) {
    lightingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const start = lightStartElement.value;
      const end = lightEndElement.value;
      console.log(`Saved Lighting: On at ${start}, Off at ${end}`);
      alert("Lighting settings saved successfully!");
    });
  }

  if (irrigationForm) {
    irrigationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const interval = irrigationIntervalElement.value;
      const usage = waterUsageElement.value;
      console.log(`Saved Irrigation: Every ${interval} hrs, Max ${usage} liters`);
      alert("Irrigation settings saved successfully!");
    });
  }

  // Live Chat
  const liveChatButton = document.getElementById("liveChatButton");
  const liveChatBox = document.getElementById("liveChatBox");
  const closeChat = document.getElementById("closeChat");

  if (liveChatButton) {
    liveChatButton.addEventListener("click", () => {
      liveChatBox.classList.toggle("d-none");
    });
  }

  if (closeChat) {
    closeChat.addEventListener("click", () => {
      liveChatBox.classList.add("d-none");
    });
  }
});
