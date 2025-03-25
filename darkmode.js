const darkModeToggle = document.getElementById("darkModeToggle");

// Check saved preference
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  darkModeToggle.checked = true;
}

// Toggle dark mode
darkModeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
});
