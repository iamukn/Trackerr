$(document).ready(function () {
  $("#registrationForm").submit(function (event) {
    event.preventDefault();

    var formData = {
      fullName: $("#fullName").val(),
      lastName: $("#lastName").val(),
      password: $("#password").val(),
      phone: $("#phone").val(),
      email: $("#email").val(),
      companyName: $("#companyName").val(),
      username: $("#username").val(),
      service: $("#service").val(),
      city: $("#city").val(),
      country: $("#country").val(),
      companyAddr: $("#companyAddr").val(),
    };

    $.ajax({
      type: "POST",
      url: "your_server_url_here", // Replace with your server endpoint
      data: formData,
      success: function (response) {
        $("#response").text("Registration successful!");
      },
      error: function () {
        $("#response").text("Registration failed. Please try again.");
      },
    });
  });
});
