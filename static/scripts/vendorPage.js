$(document).ready(function () {
  let generatedTrackingNumber = ""; // Initialize with an empty tracking number

  // Event listener for the "Generate Tracking Number" button
  $("#generateTrackingBtn").click(function () {
    // Make an AJAX GET request to fetch a unique tracking number from the server
    $.ajax({
      url: "backend_endpoint_for_tracking_number_generation", // Replace with your actual server endpoint
      method: "GET",
      dataType: "json",
      success: function (data) {
        if (data.trackingNumber) {
          // Store the generated tracking number
          generatedTrackingNumber = data.trackingNumber;
          // Display the generated tracking number
          $("#trackingNumberDisplay").text(
            `Tracking Number: ${generatedTrackingNumber}`
          );
        } else {
          alert("Failed to generate tracking number. Please try again.");
        }
      },
      error: function (error) {
        console.error("Error generating tracking number:", error);
      },
    });
  });

  // Event listener for the tracking form submission
  $("#trackingForm").submit(function (event) {
    event.preventDefault();

    // Get form data
    let productName = $("#productName").val();
    let productDescription = $("#productDescription").val();
    let status = $("#status").val();

    // Create a tracking object
    let trackingData = {
      productName: productName,
      productDescription: productDescription,
      status: status,
      trackingNumber: generatedTrackingNumber, // Include the generated tracking number
    };

    // Make an AJAX POST request to send tracking data to the server for database insertion
    $.ajax({
      url: "backend_endpoint_for_data_insertion", // Replace with your actual server endpoint
      method: "POST",
      data: JSON.stringify(trackingData),
      contentType: "application/json",
      dataType: "json",
      success: function (response) {
        if (response.success) {
          // Show success message
          $("#successMessage").removeClass("hidden");

          // Clear form fields
          $("#productName").val("");
          $("#productDescription").val("");
          $("#status").val("Shipped");

          // Hide success message after 3 seconds
          setTimeout(function () {
            $("#successMessage").addClass("hidden");
          }, 3000);
        } else {
          alert("Failed to submit tracking data. Please try again.");
        }
      },
      error: function (error) {
        console.error("Error submitting tracking data:", error);
      },
    });
  });
});
