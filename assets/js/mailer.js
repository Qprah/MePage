document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('email-form');
    const btn = document.getElementById('send_button');
    const loadingMessage = document.querySelector('.loading');
    const errorMessage = document.querySelector('.error-message');
    const sentMessage = document.querySelector('.sent-message');


    // Disable the button initially
    btn.disabled = true;

    function validateForm() {
        const inputs = form.querySelectorAll('input, textarea');
        const excludedDomains = ['myumanitoba.ca', 'umanitoba.ca'];
        let isValid = true; // Start assuming the form is valid

        // Clear previous error messages
        errorMessage.style.display = 'none'; // Hide error message initially

        Array.from(inputs).forEach(input => {
            if (input.type === 'email') {
                const emailDomain = input.value.split('@')[1]; // Get the domain after '@'
                if (input.value.trim() === '') {
                    isValid = false; // Empty email field
                } else if (excludedDomains.includes(emailDomain)) {
                    isValid = false; // Invalid email domain
                    errorMessage.textContent = `Email domain '${emailDomain}' is restricted, along with ${excludedDomains.filter(item => item!==emailDomain)}`;
                    errorMessage.style.display = 'block'; // Show error message
                }
            } else if (input.value.trim() === '') {
                isValid = false; // Non-email input is empty
            }
        });

        btn.disabled = !isValid; // Enable/disable button based on validity
    }

    // Attach input event to enable/disable button based on form validation
    form.addEventListener('input', validateForm);

    // Check if form exists
    if (form) {
        form.addEventListener("submit", function (event) {
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
