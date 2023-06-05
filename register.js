document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get form values
    const username = document.getElementById("usernameInput").value;
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
  
    // Validate email format
    if (!isValidEmail(email)) {
      console.error("Invalid email format");
      // Handle invalid email format (e.g., display error message)
      return;
    }
  
    // Continue with registration logic
    registerUser(username, email, password)
      .then(() => {
        // Redirect to login page upon successful registration
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        // Handle registration error (e.g., display error message)
      });
  });
  
  function isValidEmail(email) {
    const emailPattern = /@srmist\.edu\.in$/;
    return emailPattern.test(email);
  }
  
  function registerUser(username, email, password) {
    // Perform registration API call (replace with your actual registration logic)
    return new Promise((resolve, reject) => {
      // Simulate successful registration after 1 second (replace with your actual API call)
      setTimeout(() => {
        const isSuccess = true; // Replace with your actual registration logic
  
        if (isSuccess) {
          resolve();
        } else {
          reject("Registration failed");
        }
      }, 1000);
    });
  }
