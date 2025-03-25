document.addEventListener("DOMContentLoaded", async () => {
    setTimeout(() => {
      document.getElementById("loading-screen").style.opacity = "0"
      setTimeout(() => {
        document.getElementById("loading-screen").style.display = "none"
        document.getElementById("main-content").style.display = "block"
      }, 500)
    }, 2000)
  
    const downloadButtons = document.querySelectorAll(".download-btn")
    const dateRangeModal = new bootstrap.Modal(document.getElementById("dateRangeModal"))
    const quickOptions = document.getElementById("quickOptions")
    const customDateRow = document.getElementById("customDateRow")
    const startDateInput = document.getElementById("startDate")
    const endDateInput = document.getElementById("endDate")
    const generatePdfBtn = document.getElementById("generatePdfBtn")
  
    downloadButtons.forEach((button) => {
      button.addEventListener("click", () => {
        dateRangeModal.show()
      })
    })
  
    quickOptions.addEventListener("change", () => {
      if (quickOptions.value === "custom") {
        customDateRow.classList.remove("d-none")
      } else {
        customDateRow.classList.add("d-none")
      }
    })
  
    generatePdfBtn.addEventListener("click", () => {
      const selectedOption = quickOptions.value
      let dateRangeText = ""
  
      if (selectedOption === "custom") {
        const start = startDateInput.value
        const end = endDateInput.value
        if (!start || !end) {
          alert("Please choose a valid start and end date.")
          return
        }
        dateRangeText = `From ${start} to ${end}`
      } else if (selectedOption === "24h") {
        dateRangeText = "Last 24 Hours"
      } else if (selectedOption === "48h") {
        dateRangeText = "Last 48 Hours"
      } else if (selectedOption === "1month") {
        dateRangeText = "Last Month"
      } else if (selectedOption === "year") {
        dateRangeText = "This Year"
      }
  
      generateReportPDF(dateRangeText)
      dateRangeModal.hide()
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
  
  function generateReportPDF(dateRangeText) {
    const { jsPDF } = window.jspdf
    const doc = new jsPDF()
  
    const logoUrl = "Assets/LOGO.png"
    doc.addImage(logoUrl, "PNG", 14, 10, 30, 30)
    doc.setFontSize(18)
    doc.text("Greenhouse Data Report", 14, 50)
  
    doc.setFontSize(12)
    doc.text(`Date Range: ${dateRangeText}`, 14, 60)
  
    doc.setFontSize(14)
    doc.text("Temperature Report:", 14, 75)
    doc.setFontSize(12)
    const temperatureData = "Current Temperature: 25°C\nTrend: Stable"
    doc.text(temperatureData, 14, 85)
  
    doc.setFontSize(12)
    const temperatureInsights = "Insights:\n- Moderate temperature is ideal.\n- Keep monitoring to ensure stability."
    doc.text(temperatureInsights, 14, 100)
  
    doc.setFontSize(14)
    doc.text("Humidity Report:", 14, 115)
    doc.setFontSize(12)
    const humidityData = "Current Humidity: 60%\nTrend: Stable"
    doc.text(humidityData, 14, 125)
  
    doc.setFontSize(12)
    const humidityInsights = "Insights:\n- Ideal humidity for most crops.\n- Keep an eye to prevent fungal growth."
    doc.text(humidityInsights, 14, 140)
  
    const footerText = "© 2025 Greenhouse Management | All Rights Reserved"
    const footerY = doc.internal.pageSize.height - 10
    doc.setFontSize(10)
    doc.text(footerText, 14, footerY)
  
    doc.save("greenhouse_report.pdf")
  }
  