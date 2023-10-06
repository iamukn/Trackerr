$(document).ready(function () {
  $("#registrationForm").submit(function (event) {
    event.preventDefault();

    var formData = {
      firstName: $("#firstName").val(),
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
var a = {'msg':'success'};
    $.ajax({
       type: "POST",
       url: "/signup", // Replace with your server endpoint
       data: JSON.stringify(formData),
       dataType: "json",
       contentType: "application/json",  
       success: function (response) {
        console.log(response);
       $("#response").text(a.msg);
      },
      error: function () {
        $("#response").text('Error');
      },
    });
  });
});
