$(document).ready(function () {
  $("#registrationForm").submit(function (event) {
    event.preventDefault();

    var formData = {
      fullName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      password: $("#password").val(),
      phone: $("#phone").val(),
      email: $("#email").val(),
      companyName: $("#companyName").val(),
      username: $("#username").val(),
      service: $("#service").val(),
      city: $("#city").val(),
      country: $("#country").val(),
      companyAddr: $("#ScompanyAddr").val(),
    };

    $.ajax({
       type: "POST",
       url: "/signup", // Replace with your server endpoint
       data: JSON.stringify(formData),
       dataType: "json",
       contentType: "application/json",  
       success: function (response) {
        alert(response.message);
       $("#response").text(response.message);
      },
      error: function () {
        $("#response").text(response.message);
      },
    });
  });
});
