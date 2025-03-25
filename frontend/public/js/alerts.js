document.addEventListener("DOMContentLoaded", async () => {
  setTimeout(() => {
    document.getElementById("loading-screen").style.opacity = "0"
    setTimeout(() => {
      document.getElementById("loading-screen").style.display = "none"
      document.getElementById("main-content").style.display = "block"
    }, 500)
  }, 2000)
  const alertForm = document.querySelector("form")
  alertForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const minTemperature = document.getElementById("minTemperature").value
    const maxTemperature = document.getElementById("maxTemperature").value
    const minHumidity = document.getElementById("minHumidity").value
    const maxHumidity = document.getElementById("maxHumidity").value
    console.log(`Alert Settings Saved: 
      Min Temp: ${minTemperature}, 
      Max Temp: ${maxTemperature}, 
      Min Humidity: ${minHumidity}, 
      Max Humidity: ${maxHumidity}`)
    alert("Alert settings saved successfully!")
  })
  const liveChatButton = document.getElementById("liveChatButton")
  const liveChatBox = document.getElementById("liveChatBox")
  const closeChat = document.getElementById("closeChat")
  liveChatButton.addEventListener("click", () => {
    liveChatBox.classList.toggle("d-none")
  })
  closeChat.addEventListener("click", () => {
    liveChatBox.classList.add("d-none")
  })
})
