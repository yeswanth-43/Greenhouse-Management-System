document.addEventListener("DOMContentLoaded", async () => {
  setTimeout(() => {
    document.getElementById("loading-screen").style.opacity = "0"
    setTimeout(() => {
      document.getElementById("loading-screen").style.display = "none"
      document.getElementById("main-content").style.display = "block"
    }, 500)
  }, 2000)

  const supportForm = document.getElementById("support-form")

  supportForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const issueDescription = document.getElementById("issueDescription").value
    console.log(`Issue Reported: ${issueDescription}`)
    alert("Support request submitted successfully!")
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
