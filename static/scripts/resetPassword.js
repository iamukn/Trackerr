$(document).ready(function () {
  let loginForm = $(".my-form");

  loginForm.submit(function (e) {
    e.preventDefault();

    let email = $("#email").val();

    // Create a data object to send to the server
    let data = {
      email: email,
    };

    // Perform an AJAX POST request to check if the email exists
    $.ajax({
      url: "check_email_endpoint", //
      method: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (response) {
        // Handle the response from the server
        if (response.exists) {
          console.log("Email exists");

          // Sends a request to the server to generate and send OTP
          $.ajax({
            url: "/recovery",
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: data, // Send email data to the server
            success: function (otpResponse) {
              console.log("OTP sent successfully");

              $("#notification-message").text(
                "OTP has been sent to your email."
              );

              setTimeout(function () {
                $("#notification-message").text("");
              }, 5000); // Clear the message after 5 seconds
            },
            error: function (otpError) {
              console.error("Error sending OTP:", otpError);

              $("#error-message").text("An error occurred while sending OTP");
            },
          });
        } else {
          console.log("Email does not exist");

          $("#error-message").text("Email not found in the database");
        }
      },
      error: function (error) {
        console.error("Error checking email:", error);

        $("#error-message").text("An error occurred while checking the email");
      },
    });
  });
});
