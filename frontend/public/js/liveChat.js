// Live Chat Functionality
const liveChatButton = document.getElementById("liveChatButton");
const liveChatBox = document.getElementById("liveChatBox");
const closeChat = document.getElementById("closeChat");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendChat = document.querySelector(".chat-footer button"); // Send button

// Show and hide the chat box
liveChatButton.addEventListener("click", () => {
  liveChatBox.classList.toggle("d-none"); // Toggle chat box visibility
});

closeChat.addEventListener("click", () => {
  liveChatBox.classList.add("d-none"); // Close chat box when close button is clicked
});

// Function to handle bot response from the backend
async function getBotResponse(userInput) {
  try {
    // Send a POST request to the backend to fetch bot's response
    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userInput }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch bot response");
    }

    const data = await response.json();
    return data.reply || "Sorry, I couldn't understand that."; // Return the bot's reply or a default message
  } catch (error) {
    console.error("Error fetching bot response:", error);
    return "Oops! There was an error. Please try again later."; // Fallback error message
  }
}

// Send chat message functionality (on click of Send button)
sendChat.addEventListener("click", async () => {
  const message = chatInput.value.trim(); // Get the input message
  if (message) {
    // Add user message to the chat
    const userMessage = document.createElement("div");
    userMessage.className = "text-end my-2"; // Right-aligned user message
    userMessage.innerHTML = `<strong>You:</strong> ${message}`;
    chatMessages.appendChild(userMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom

    // Get the bot's response
    const botReply = await getBotResponse(message);

    // Add bot message to the chat
    const botMessage = document.createElement("div");
    botMessage.className = "text-start my-2"; // Left-aligned bot message
    botMessage.innerHTML = `<strong>Bot:</strong> ${botReply}`;
    chatMessages.appendChild(botMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom

    // Clear the input field after sending the message
    chatInput.value = "";
  }
});

// Send chat message functionality when Enter key is pressed
chatInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    // Prevent default behavior of the Enter key (which may cause a new line)
    e.preventDefault();
    const message = chatInput.value.trim();
    if (message) {
      // Add user message to the chat
      const userMessage = document.createElement("div");
      userMessage.className = "text-end my-2"; // Right-aligned user message
      userMessage.innerHTML = `<strong>You:</strong> ${message}`;
      chatMessages.appendChild(userMessage);
      chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom

      // Get the bot's response
      const botReply = await getBotResponse(message);

      // Add bot message to the chat
      const botMessage = document.createElement("div");
      botMessage.className = "text-start my-2"; // Left-aligned bot message
      botMessage.innerHTML = `<strong>Bot:</strong> ${botReply}`;
      chatMessages.appendChild(botMessage);
      chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom

      // Clear the input field after sending the message
      chatInput.value = "";
    }
  }
});

// Close chat functionality when Escape key is pressed
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    liveChatBox.classList.add("d-none"); // Hide the chat box when Escape key is pressed
  }
});
