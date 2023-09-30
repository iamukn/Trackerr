$(document).ready(function () {
  let generatedTrackingNumber = "";
  let userName = "";

  // Fetch User Name on Page Load
  fetchUserName();

  // Generate Tracking Number Button
  $("#generateBtn").click(function () {
    $.ajax({
      url: "generate_tracking-number-API",
      type: "GET",
      success: function (data) {
        // Retrieve the generated tracking number from the backend
        generatedTrackingNumber = data.trackingNumber;
        $("#trackingNumber").text(generatedTrackingNumber);
      },
      error: function () {
        alert("Failed to generate tracking number.");
      },
    });
  });

  // Function to fetch the user's name on page load
  function fetchUserName() {
    $.ajax({
      url: "API-to-generate-username",
      type: "GET",
      success: function (data) {
        userName = data.name;

        $("#userName").text(userName);
      },
    });
  }

  // Update Tracking Status Form Submission
  $("#updateStatusForm").submit(function (event) {
    event.preventDefault();

    // Get input values
    let updateTrackingNumber = $("#updateTrackingNumberInput").val();
    let updatedStatus = $("#updatedStatusSelect").val();

    // Check if the tracking number has been registered
    if (updateTrackingNumber !== generatedTrackingNumber) {
      $("#updateFeedback").text("Tracking number not registered.");
      return;
    }

    // Prepare data for AJAX POST request
    let postData = {
      trackingNumber: updateTrackingNumber,
      status: updatedStatus,
    };

    // Send AJAX POST request to update tracking status
    $.ajax({
      url: "update_tracking_API",
      type: "POST",
      data: postData,
      success: function () {
        $("#updateFeedback").text(
          `Updated Status for Tracking Number ${updateTrackingNumber}: ${updatedStatus}`
        );
      },
      error: function () {
        alert("Failed to update tracking status.");
      },
    });
  });
});
