const chatContainer = document.getElementById("chatContainer");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");

messageForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  const message = messageInput.value;

  // Get username from local storage
  const username = localStorage.getItem("username");

  // Send the message to the server
  sendMessage(username, message);

  // Clear the message input field
  messageInput.value = "";
});

// Function to display a new message
function displayMessage(username, message) {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = `<strong>${username}:</strong> ${message}`;
  chatContainer.appendChild(messageElement);
}

// Function to send a message to the server
function sendMessage(username, message) {
  // Perform API call to send the message to the server
  // Replace this code with your actual API call or socket implementation
  // In this example, we're simply displaying the message on the client side
  displayMessage(username, message);
}
