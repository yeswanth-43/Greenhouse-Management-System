// Live Chat Script
const liveChatBox = document.getElementById("liveChatBox");
const liveChatButton = document.getElementById("liveChatButton");
const closeChat = document.getElementById("closeChat");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const sendChat = document.getElementById("sendChat");

// Crop Conditions Data
const cropConditions = {
  "lettuce": {
    "temperature": "15–20°C",
    "humidity": "50–70%",
    "light": "Moderate",
    "soil_pH": "6.0–7.0",
    "notes": "Bolts in high heat"
  },
  "spinach": {
    "temperature": "10–20°C",
    "humidity": "60–80%",
    "light": "Moderate",
    "soil_pH": "6.5–7.5",
    "notes": "Prefers cooler temps"
  },
  "kale": {
    "temperature": "10–25°C",
    "humidity": "60–70%",
    "light": "Moderate",
    "soil_pH": "6.0–7.5",
    "notes": "Frost-hardy"
  },
  "tomatoes": {
    "temperature": "20–27°C",
    "humidity": "60–70%",
    "light": "Full Sun, 8+ hrs",
    "soil_pH": "6.0–6.8",
    "notes": "Needs staking"
  },
  // Add more crops here as needed
};

// Open Live Chat
liveChatButton.addEventListener("click", () => {
  liveChatBox.classList.remove("d-none");
  liveChatButton.style.display = "none";
});

// Close Live Chat
closeChat.addEventListener("click", () => {
  liveChatBox.classList.add("d-none");
  liveChatButton.style.display = "block";
});

// Send Chat Message
sendChat.addEventListener("click", () => {
  const message = chatInput.value.trim();
  if (message) {
    const userMessage = document.createElement("div");
    userMessage.className = "chat-message user";
    userMessage.innerText = message;
    chatMessages.appendChild(userMessage);

    // Check if the message is a crop name and respond with the conditions
    const cropName = message.toLowerCase().trim();
    if (cropConditions[cropName]) {
      const crop = cropConditions[cropName];
      const botMessage = document.createElement("div");
      botMessage.className = "chat-message bot";
      botMessage.innerHTML = `
        <strong>${cropName.charAt(0).toUpperCase() + cropName.slice(1)}</strong><br/>
        Temperature: ${crop.temperature}<br/>
        Humidity: ${crop.humidity}<br/>
        Light: ${crop.light}<br/>
        Soil pH: ${crop.soil_pH}<br/>
        Notes: ${crop.notes}
      `;
      chatMessages.appendChild(botMessage);
    } else {
      // Default response if crop not found
      const botMessage = document.createElement("div");
      botMessage.className = "chat-message bot";
      botMessage.innerText = "Sorry, I couldn't find information for that crop. Please try again.";
      chatMessages.appendChild(botMessage);
    }

    // Simulate bot response delay
    setTimeout(() => chatMessages.scrollTop = chatMessages.scrollHeight, 1000);

    // Clear input
    chatInput.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");

  // Save dark mode preference in localStorage
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
});

// Load dark mode preference from localStorage
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  darkModeToggle.checked = true;
} else {
  document.body.classList.remove("dark-mode");
  darkModeToggle.checked = false;
}
