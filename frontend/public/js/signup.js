document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
  
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const fullname = document.getElementById("fullname").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("newPassword").value.trim();
      const confirmPassword = document
        .getElementById("confirmPassword")
        .value.trim();
  
      if (password !== confirmPassword) {
        alert("Passwords do not match. Please re-check.");
        return;
      }
  
      console.log("Attempted signup with:", {
        fullname,
        email,
        password
      });
  
      // TODO: Perform actual signup logic with backend
  
      alert("Signup successful! Redirecting to login...");
      window.location.href = "login.html";
    });
  });
  