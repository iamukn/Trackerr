$(document).ready(function () {
  let generatedTrackingNumber = "";
  let userName = "";


  // Generate Tracking Number Button
  $("#generateBtn").click(function () {
    $.ajax({
        url: "/dashboard/generate",
      type: "GET",
      success: function (data) {
        // Retrieve the generated tracking number from the backend
        generatedTrackingNumber = data.tracking_number;
        $("#trackingNumber").text(generatedTrackingNumber);
      },
      error: function () {
        alert("Failed to generate tracking number.");
      },
    });
  });

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
      url: "http://127.0.0.1/dashboard/tracking/update",
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
