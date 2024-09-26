// JavaScript for toggling dark mode
const checkbox = document.getElementById("checkbox");

// Check for saved preference in local storage and apply it
if (localStorage.getItem("darkMode") === "enabled") {
    checkbox.checked = true;
    document.body.classList.add("dark-background");
  }

checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark-background");

   // Save the preference to local storage
   if (checkbox.checked) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.removeItem("darkMode");
  }
});

let inactivityTime = 0; // Inactivity timer
const toggleContainer = document.getElementById('toggle-container');

// Function to hide the toggle button
function hideToggle() {
    toggleContainer.classList.remove('active');
}

// Function to show the toggle button
function showToggle() {
    toggleContainer.classList.add('active');
}

// Reset inactivity timer
function resetTimer() {
    inactivityTime = 0; // Reset the timer
    showToggle(); // Show the toggle on activity
}

// Check for inactivity every second
setInterval(() => {
    inactivityTime++;
    if (inactivityTime >= 1.75) { // 5 seconds of inactivity
        hideToggle();
    }
}, 1000);

// Add event listeners for user activity
document.addEventListener('mousemove', resetTimer);
document.addEventListener('click', resetTimer);

