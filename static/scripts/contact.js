$(document).ready(function () {
  $("#contactForm").submit(function (event) {
    event.preventDefault();

    // Get input values
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();

    // Perform simple form validation
    if (name === "" || email === "" || message === "") {
      alert("Please fill in all fields.");
      return;
    }

    // Prepare the data to send to the server
    var data = {
      name: name,
      email: email,
      message: message,
    };

    // Send an AJAX POST request to the server
    $.ajax({
      type: "POST",
      url: "submit_contact_API",
      data: data,
      success: function (response) {
        // Handle the server's response
        if (response === "success") {
          alert("Message sent successfully!");
          // Clear the form inputs
          $("#name").val("");
          $("#email").val("");
          $("#message").val("");
        } else {
          alert("An error occurred. Please try again later.");
        }
      },
      error: function () {
        alert("An error occurred. Please try again later.");
      },
    });
  });
});
