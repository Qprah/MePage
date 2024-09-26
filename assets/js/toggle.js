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