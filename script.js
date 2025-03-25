// Script for Live Chat
const liveChatBox = document.getElementById("liveChatBox");
const liveChatButton = document.getElementById("liveChatButton");
const closeChat = document.getElementById("closeChat");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const sendChat = document.getElementById("sendChat");

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

    // Simulate bot response
    const botMessage = document.createElement("div");
    botMessage.className = "chat-message bot";
    botMessage.innerText = "Thank you for your message! We'll get back to you shortly.";
    setTimeout(() => chatMessages.appendChild(botMessage), 1000);

    // Clear input
    chatInput.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});
