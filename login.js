document.getElementById("loginForm").addEventListener("submit", function(event) {
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

  // Continue with login logic
  loginUser(username, email, password)
    .then(() => {
      // Redirect to chat page upon successful login
      window.location.href = "chat.html";
    })
    .catch((error) => {
      console.error("Login failed:", error);
      // Handle login error (e.g., display error message)
    });
});

function isValidEmail(email) {
  const emailPattern = /@srmist\.edu\.in$/;
  return emailPattern.test(email);
}

function loginUser(username, email, password) {
  // Perform login API call (replace with your actual login logic)
  return new Promise((resolve, reject) => {
    // Simulate successful login after 1 second (replace with your actual API call)
    setTimeout(() => {
      const isSuccess = true; // Replace with your actual login logic

      if (isSuccess) {
        resolve();
      } else {
        reject("Login failed");
      }
    }, 1000);
  });
}
