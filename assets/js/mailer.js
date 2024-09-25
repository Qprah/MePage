document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('email-form');
    const btn = document.getElementById('send_button');

    // Check if form exists
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            btn.value = 'Sending...';

            // Gather form data
            var params = {
                from_name: document.getElementById("from_name").value,
                email_id: document.getElementById("email_id").value,
                subject: document.getElementById("subject").value,
                message: document.getElementById("message").value,
            };

            // Assuming you're using emailJS or a similar service
            emailjs.send("service_kwyuksl", "template_up6gzjy", params)
                .then(() => {
                    btn.value = 'Send Email';
                    console.log('Sent!');
                }, (err) => {
                    btn.value = 'Send Email';
                    console.log(JSON.stringify(err));
                });
        });
    } else {
        console.error("Form element not found!");
    }
});