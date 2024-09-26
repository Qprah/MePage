// JavaScript for toggling dark mode
const checkbox = document.getElementById("checkbox");
const msg = document.getElementById("msg-toggler");

// Array of phrases for when dark mode is disabled
const lightModePhrases = [
    "<!--Oh no, change it back!-->",
    "<!--No! I don't like this one.-->", 
    "<!--It's too bright.-->", 
    "<!--My eyes! It's too much light.-->", 
    "<!--Who turned on the sun?-->", 
    "<!--I miss the darkness.-->", 
    "<!--This feels wrong, turn it off.-->", 
    "<!--Why does everything hurt now?-->", 
    "<!--Bring back the night!-->", 
    "<!--I can't see anymore, it's too bright!-->", 
    "<!--I was happier in the dark.-->", 
    "<!--The light, it burns!-->", 
    "<!--It's like a thousand suns!-->", 
    "<!--Where did my cozy darkness go?-->", 
    "<!--This is blinding!-->", 
    "<!--Dark mode was my comfort zone.-->", 
    "<!--I didn't sign up for this brightness!-->", 
    "<!--Can we pretend this never happened?-->", 
    "<!--Why did you abandon the dark side?-->", 
    "<!--I need sunglasses for this!-->"
];

// Array of phrases for when dark mode is enabled
const darkModePhrases = [
    "<!--Perfect! Dark mode enabled.-->", 
    "<!--Welcome to the dark side.-->", 
    "<!--Ah, much better.-->", 
    "<!--My eyes can finally relax.-->", 
    "<!--Embrace the darkness!-->", 
    "<!--This is where I belong.-->", 
    "<!--Night mode is the best mode.-->", 
    "<!--Now that's more like it.-->", 
    "<!--Who needs light anyway?-->", 
    "<!--Finally, peace for my eyes.-->", 
    "<!--I love it when it's dark.-->", 
    "<!--Darkness is my happy place.-->", 
    "<!--This feels just right.-->", 
    "<!--Now I can focus.-->", 
    "<!--No more headaches from the light.-->", 
    "<!--Darkness, my old friend.-->", 
    "<!--Let's keep it this way forever.-->", 
    "<!--Everything looks cooler in dark mode.-->", 
    "<!--I can stay here forever.-->", 
    "<!--Welcome to the shadows.-->"
];

// Variable to track the last displayed phrase to prevent repetition for both modes
let lastLightPhraseIndex = -1;
let lastDarkPhraseIndex = -1;

// Function to select a random phrase, ensuring no immediate repetition
function getRandomPhrase(phrases, lastIndex) {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * phrases.length);
    } while (randomIndex === lastIndex); // Ensure it's not the same as the last one
    return randomIndex;
}

// Check for saved preference in local storage and apply it
if (localStorage.getItem("darkMode") === "enabled") {
    checkbox.checked = true;
    document.body.classList.add("dark-background");
    msg.textContent = "<!--Perfect! Dark mode enabled.-->"; // Default message for dark mode
} else {
    msg.textContent = "<!--I prefer dark mode.-->"; // Default message for light mode
}

checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark-background");

  // Save the preference to local storage and update message
  if (checkbox.checked) {
    localStorage.setItem("darkMode", "enabled");
    if (msg.textContent === "I prefer dark mode.") {
      msg.textContent = "Perfect! Dark mode enabled."; // First time switch to dark mode
    } else {
      lastDarkPhraseIndex = getRandomPhrase(darkModePhrases, lastDarkPhraseIndex);
      msg.textContent = darkModePhrases[lastDarkPhraseIndex];
    }
  } else {
    localStorage.removeItem("darkMode");
    if (msg.textContent === "Perfect! Dark mode enabled.") {
      msg.textContent = "I prefer dark mode."; // First time switch to light mode
    } else {
      lastLightPhraseIndex = getRandomPhrase(lightModePhrases, lastLightPhraseIndex);
      msg.textContent = lightModePhrases[lastLightPhraseIndex];
    }
  }
});

/*
Inactivity checker
*/
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
    if (inactivityTime >= 4) {
        hideToggle();
    }
}, 1000);

document.addEventListener('scroll',hideToggle);

// Add event listeners for user activity
document.addEventListener('mousemove', resetTimer);
document.addEventListener('click', resetTimer);

// Show toggle when clicking on the navbar
const navbar = document.querySelector('.navbar'); // Adjust this selector to your actual navbar element
if (navbar) {
    navbar.addEventListener('click', resetTimer);
}
