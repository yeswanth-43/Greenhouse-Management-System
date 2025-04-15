document.addEventListener("DOMContentLoaded", async () => {
  setTimeout(() => {
    document.getElementById("loading-screen").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("loading-screen").style.display = "none";
      document.getElementById("main-content").style.display = "block";
    }, 500);
  }, 2000);

  const downloadButtons = document.querySelectorAll(".download-btn");
  const dateRangeModal = new bootstrap.Modal(document.getElementById("dateRangeModal"));
  const quickOptions = document.getElementById("quickOptions");
  const customDateRow = document.getElementById("customDateRow");
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  const generatePdfBtn = document.getElementById("generatePdfBtn");

  downloadButtons.forEach((button) => {
    button.addEventListener("click", () => {
      dateRangeModal.show();
    });
  });

  quickOptions.addEventListener("change", () => {
    if (quickOptions.value === "custom") {
      customDateRow.classList.remove("d-none");
    } else {
      customDateRow.classList.add("d-none");
    }
  });

  generatePdfBtn.addEventListener("click", () => {
    const selectedOption = quickOptions.value;
    let dateRangeText = "";

    if (selectedOption === "custom") {
      const start = startDateInput.value;
      const end = endDateInput.value;
      if (!start || !end) {
        alert("Please choose a valid start and end date.");
        return;
      }
      dateRangeText = `From ${start} to ${end}`;
    } else if (selectedOption === "24h") {
      dateRangeText = "Last 24 Hours";
    } else if (selectedOption === "48h") {
      dateRangeText = "Last 48 Hours";
    } else if (selectedOption === "1month") {
      dateRangeText = "Last Month";
    } else if (selectedOption === "year") {
      dateRangeText = "This Year";
    }

    generateReportPDF(dateRangeText, selectedOption);
    dateRangeModal.hide();
  });

  const liveChatButton = document.getElementById("liveChatButton");
  const liveChatBox = document.getElementById("liveChatBox");
  const closeChat = document.getElementById("closeChat");

  liveChatButton.addEventListener("click", () => {
    liveChatBox.classList.toggle("d-none");
  });

  closeChat.addEventListener("click", () => {
    liveChatBox.classList.add("d-none");
  });
});

function generateReportPDF(dateRangeText, selectedOption) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const logoUrl = "Assets/LOGO.png";
  doc.addImage(logoUrl, "PNG", 14, 10, 30, 30);
  doc.setFontSize(18);
  doc.text("Greenhouse Data Report", 14, 50);

  doc.setFontSize(12);
  doc.text(`Date Range: ${dateRangeText}`, 14, 60);

  // Adding Historical Data to PDF Report
  const historicalData = getHistoricalData(selectedOption);

  // Temperature Report
  doc.setFontSize(14);
  doc.text("Temperature Report:", 14, 75);
  doc.setFontSize(12);
  let yPosition = 85;
  historicalData.temperature.forEach((dataPoint) => {
    const tempText = `Date: ${dataPoint.time}, Temp: ${dataPoint.value}°C`;
    doc.text(tempText, 14, yPosition);
    yPosition += 10;
  });

  doc.setFontSize(12);
  const temperatureInsights = `Insights:\n- Moderate temperature is ideal.\n- Keep monitoring to ensure stability.`;
  doc.text(temperatureInsights, 14, yPosition);
  yPosition += 20; // Leave space after insights

  // Humidity Report
  doc.setFontSize(14);
  doc.text("Humidity Report:", 14, yPosition);
  yPosition += 10;
  doc.setFontSize(12);
  historicalData.humidity.forEach((dataPoint) => {
    const humidityText = `Date: ${dataPoint.time}, Humidity: ${dataPoint.value}%`;
    doc.text(humidityText, 14, yPosition);
    yPosition += 10;
  });

  doc.setFontSize(12);
  const humidityInsights = `Insights:\n- Ideal humidity for most crops.\n- Keep an eye to prevent fungal growth.`;
  doc.text(humidityInsights, 14, yPosition);

  const footerText = "© 2025 Greenhouse Management | All Rights Reserved";
  const footerY = doc.internal.pageSize.height - 10;
  doc.setFontSize(10);
  doc.text(footerText, 14, footerY);

  // Instead of using doc.save(), we create an anchor element for Android compatibility
  const pdfOutput = doc.output("datauristring");
  const link = document.createElement("a");
  link.href = pdfOutput;
  link.download = "greenhouse_report.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function getHistoricalData(selectedOption) {
  // Simulated Historical Data: 10 data points with exact date and time
  let temperatureData = [];
  let humidityData = [];
  let currentDate = new Date();

  for (let i = 0; i < 10; i++) {
    const time = new Date(currentDate - (i * 3600000)); // Subtract 1 hour per data point
    const formattedTime = time.toISOString().slice(0, 19).replace("T", " ");
    const temp = 20 + Math.floor(Math.random() * 10); // Random temperature between 20°C and 30°C
    temperatureData.push({ time: formattedTime, value: temp });
    const humidity = 50 + Math.floor(Math.random() * 20); // Random humidity between 50% and 70%
    humidityData.push({ time: formattedTime, value: humidity });
  }
  
  return { temperature: temperatureData, humidity: humidityData };
}
