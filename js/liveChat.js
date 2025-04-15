const liveChatButton = document.getElementById("liveChatButton");
const liveChatBox = document.getElementById("liveChatBox");
const closeChat = document.getElementById("closeChat");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendChat = document.querySelector(".chat-footer button");

liveChatButton.addEventListener("click", () => {
  liveChatBox.classList.toggle("d-none");
});

closeChat.addEventListener("click", () => {
  liveChatBox.classList.add("d-none");
});

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
  "swiss chard": {
    "temperature": "15–24°C",
    "humidity": "60–70%",
    "light": "Moderate–High",
    "soil_pH": "6.0–6.8",
    "notes": "Avoid waterlogging"
  },
  "arugula": {
    "temperature": "10–22°C",
    "humidity": "50–70%",
    "light": "Moderate",
    "soil_pH": "6.0–7.0",
    "notes": "Bolt-resistant varieties best"
  },
  "mustard greens": {
    "temperature": "10–24°C",
    "humidity": "50–70%",
    "light": "Moderate",
    "soil_pH": "6.0–7.5",
    "notes": "Sensitive to drought"
  },
  "collard greens": {
    "temperature": "15–20°C",
    "humidity": "60–70%",
    "light": "Moderate",
    "soil_pH": "6.0–7.0",
    "notes": "Tolerates heat well"
  },
  "endive": {
    "temperature": "15–20°C",
    "humidity": "50–70%",
    "light": "Moderate",
    "soil_pH": "6.0–7.0",
    "notes": "Prefers cool conditions"
  },
  "mizuna": {
    "temperature": "10–18°C",
    "humidity": "50–70%",
    "light": "Moderate",
    "soil_pH": "6.0–7.0",
    "notes": "Fast-growing"
  },
  "bok choy": {
    "temperature": "10–20°C",
    "humidity": "50–70%",
    "light": "Moderate",
    "soil_pH": "6.0–7.0",
    "notes": "Needs consistent moisture"
  },
  "tatsoi": {
    "temperature": "10–18°C",
    "humidity": "60–70%",
    "light": "Moderate",
    "soil_pH": "6.0–7.0",
    "notes": "Cold-hardy and fast-growing"
  },
  "carrots": {
    "temperature": "13–24°C",
    "humidity": "50–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–6.8",
    "notes": "Loose soil preferred"
  },
  "radishes": {
    "temperature": "10–22°C",
    "humidity": "50–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–7.0",
    "notes": "Fast maturing"
  },
  "beets": {
    "temperature": "10–24°C",
    "humidity": "60–70%",
    "light": "Moderate",
    "soil_pH": "6.0–7.5",
    "notes": "Tolerates cool temps"
  },
  "turnips": {
    "temperature": "10–20°C",
    "humidity": "50–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–6.5",
    "notes": "Cold-hardy"
  },
  "parsnips": {
    "temperature": "13–24°C",
    "humidity": "50–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–7.0",
    "notes": "Requires long growing season"
  },
  "onions": {
    "temperature": "13–25°C",
    "humidity": "50–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–7.0",
    "notes": "Needs good airflow"
  },
  "garlic": {
    "temperature": "4–24°C",
    "humidity": "50–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–7.5",
    "notes": "Needs vernalization (cold period)"
  },
  "shallots": {
    "temperature": "13–25°C",
    "humidity": "50–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–7.0",
    "notes": "Good for small spaces"
  },
  "broccoli": {
    "temperature": "15–20°C",
    "humidity": "60–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–7.0",
    "notes": "Avoid heat"
  },
  "cauliflower": {
    "temperature": "15–20°C",
    "humidity": "60–80%",
    "light": "Full Sun",
    "soil_pH": "6.5–7.5",
    "notes": "Uniform temps needed"
  },
  "cabbage": {
    "temperature": "10–21°C",
    "humidity": "60–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–6.8",
    "notes": "Space well"
  },
  "brussels sprouts": {
    "temperature": "7–18°C",
    "humidity": "60–80%",
    "light": "Full Sun",
    "soil_pH": "6.0–6.8",
    "notes": "Long season crop"
  },
  "kohlrabi": {
    "temperature": "10–25°C",
    "humidity": "60–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–7.0",
    "notes": "Tolerates cooler conditions"
  },
  "tomatoes": {
    "temperature": "20–27°C",
    "humidity": "60–70%",
    "light": "Full Sun, 8+ hrs",
    "soil_pH": "6.0–6.8",
    "notes": "Needs staking"
  },
  "cucumbers": {
    "temperature": "18–24°C",
    "humidity": "60–80%",
    "light": "Full Sun",
    "soil_pH": "6.0–6.8",
    "notes": "Good ventilation helps"
  },
  "peppers": {
    "temperature": "18–26°C",
    "humidity": "60–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–6.8",
    "notes": "Warm soil preferred"
  },
  "eggplant": {
    "temperature": "20–30°C",
    "humidity": "60–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–6.8",
    "notes": "Needs warm soil"
  },
  "zucchini": {
    "temperature": "18–24°C",
    "humidity": "60–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–7.5",
    "notes": "Requires space"
  },
  "squash": {
    "temperature": "20–30°C",
    "humidity": "60–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–6.5",
    "notes": "Needs regular watering"
  },
  "okra": {
    "temperature": "24–30°C",
    "humidity": "60–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–6.8",
    "notes": "Thrives in heat"
  },
  "basil": {
    "temperature": "18–30°C",
    "humidity": "50–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–7.0",
    "notes": "Needs consistent moisture"
  },
  "parsley": {
    "temperature": "18–24°C",
    "humidity": "50–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–7.0",
    "notes": "Prefers well-drained soil"
  },
  "cilantro": {
    "temperature": "18–24°C",
    "humidity": "50–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–7.0",
    "notes": "Bolts in heat"
  },
  "dill": {
    "temperature": "18–24°C",
    "humidity": "50–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–7.0",
    "notes": "Grows quickly"
  },
  "thyme": {
    "temperature": "15–20°C",
    "humidity": "50–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–7.0",
    "notes": "Low maintenance"
  },
  "oregano": {
    "temperature": "15–20°C",
    "humidity": "50–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–7.5",
    "notes": "Perennial herb"
  },
  "sage": {
    "temperature": "18–24°C",
    "humidity": "50–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–7.5",
    "notes": "Needs well-drained soil"
  },
  "mint": {
    "temperature": "18–24°C",
    "humidity": "50–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–7.0",
    "notes": "Invasive, needs control"
  },
  "chives": {
    "temperature": "18–24°C",
    "humidity": "50–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–7.0",
    "notes": "Prefers rich soil"
  },
  "rosemary": {
    "temperature": "15–25°C",
    "humidity": "50–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–7.0",
    "notes": "Needs good drainage"
  },
  "green beans": {
    "temperature": "18–30°C",
    "humidity": "60–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–7.0",
    "notes": "Requires support"
  },
  "snap peas": {
    "temperature": "10–20°C",
    "humidity": "50–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–7.0",
    "notes": "Needs trellis"
  },
  "snow peas": {
    "temperature": "10–20°C",
    "humidity": "50–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–7.0",
    "notes": "Needs trellis"
  },
  "lima beans": {
    "temperature": "18–30°C",
    "humidity": "60–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–7.0",
    "notes": "Warmth-loving"
  },
  "mâche": {
    "temperature": "10–18°C",
    "humidity": "60–70%",
    "light": "Moderate",
    "soil_pH": "6.0–7.0",
    "notes": "Cold-hardy"
  },
  "sorrel": {
    "temperature": "10–20°C",
    "humidity": "60–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–7.0",
    "notes": "Tolerates frost"
  },
  "watercress": {
    "temperature": "10–20°C",
    "humidity": "60–80%",
    "light": "Full Sun",
    "soil_pH": "6.0–7.0",
    "notes": "Requires moisture"
  },
  "microgreens": {
    "temperature": "18–22°C",
    "humidity": "60–70%",
    "light": "Moderate",
    "soil_pH": "6.0–7.0",
    "notes": "Fast-growing"
  },
  "amaranth greens": {
    "temperature": "18–30°C",
    "humidity": "50–70%",
    "light": "Full Sun",
    "soil_pH": "6.0–7.0",
    "notes": "Drought-tolerant"
  },
  "malabar spinach": {
    "temperature": "24–30°C",
    "humidity": "70–80%",
    "light": "Full Sun",
    "soil_pH": "6.0–7.0",
    "notes": "Thrives in heat"
  }
};

function getBotResponse(userInput) {
  const input = userInput.toLowerCase().trim();

  if (input === "hello" || input === "hi" || input === "hey") {
    return "Hello! How can I assist you today?";
  } else if (input === "thank you" || input === "thanks") {
    return "You're welcome! Feel free to ask any questions.";
  } else if (cropConditions[input]) {
    const crop = cropConditions[input];
    return `
      <strong>${input.charAt(0).toUpperCase() + input.slice(1)}</strong><br/>
      Temperature: ${crop.temperature}<br/>
      Humidity: ${crop.humidity}<br/>
      Light: ${crop.light}<br/>
      Soil pH: ${crop.soil_pH}<br/>
      Notes: ${crop.notes}
    `;
  } else {
    return "Our professionals will get in touch with you shortly.";
  }
}

sendChat.addEventListener("click", () => {
  const message = chatInput.value.trim();
  if (message) {
    const userMessage = document.createElement("div");
    userMessage.className = "text-end my-2";
    userMessage.innerHTML = `<strong>You:</strong> ${message}`;
    chatMessages.appendChild(userMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    const botReply = getBotResponse(message);

    const botMessage = document.createElement("div");
    botMessage.className = "text-start my-2";
    botMessage.innerHTML = `<strong>Bot:</strong> ${botReply}`;
    chatMessages.appendChild(botMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    chatInput.value = "";
  }
});

chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (message) {
      const userMessage = document.createElement("div");
      userMessage.className = "text-end my-2";
      userMessage.innerHTML = `<strong>You:</strong> ${message}`;
      chatMessages.appendChild(userMessage);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      const botReply = getBotResponse(message);

      const botMessage = document.createElement("div");
      botMessage.className = "text-start my-2";
      botMessage.innerHTML = `<strong>Bot:</strong> ${botReply}`;
      chatMessages.appendChild(botMessage);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      chatInput.value = "";
    }
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    liveChatBox.classList.add("d-none");
  }
});
