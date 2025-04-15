document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
  
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
  
      console.log("Attempted login with:", { username, password });
  
      // TODO: Perform actual authentication (fetch to backend, etc.)
  
      alert("Login successful! Redirecting...");
      window.location.href = "index.html"; // Example: go to Dashboard
    });
  });
  