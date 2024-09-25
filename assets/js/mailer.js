document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('email-form');
    const btn = document.getElementById('send_button');
    const loadingMessage = document.querySelector('.loading');
    const errorMessage = document.querySelector('.error-message');
    const sentMessage = document.querySelector('.sent-message');
    
    // Disable the button initially
    btn.disabled = true;

    // Function to validate form fields
    function validateForm() {
        const inputs = form.querySelectorAll('input, textarea');
        btn.disabled = !Array.from(inputs).every(input => input.value.trim() !== '');
    }

    // Attach input event to enable/disable button based on form validation
    form.addEventListener('input', validateForm);

    // Check if form exists
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            btn.value = 'Sending...';
            loadingMessage.style.display = 'block'; // Show loading message
            errorMessage.style.display = 'none'; // Hide error message
            sentMessage.style.display = 'none'; // Hide success message

            // Gather form data
            var params = {
                from_name: document.getElementById("from_name").value,
                email_id: document.getElementById("email_id").value,
                subject: document.getElementById("subject").value,
                message: document.getElementById("message").value,
            };

            // Send email using emailJS or similar service
            emailjs.send("service_kwyuksl", "template_up6gzjy", params)
                .then(() => {
                    btn.value = 'Send Email';
                    loadingMessage.style.display = 'none'; // Hide loading message
                    sentMessage.style.display = 'block'; // Show success message
                    
                    // Clear form inputs
                    form.reset();
                    
                    // Hide success message after 3 seconds
                    setTimeout(() => {
                        sentMessage.style.display = 'none'; // Hide success message
                    }, 3000);
                    
                    validateForm(); // Re-check form to disable button if necessary
                }, (err) => {
                    btn.value = 'Send Email';
                    loadingMessage.style.display = 'none'; // Hide loading message
                    errorMessage.textContent = `Error: ${JSON.stringify(err)}`; // Show error message
                    errorMessage.style.display = 'block'; // Show error
                });
        });
    } else {
        console.error("Form element not found!");
    }
});
