$(document).ready(function () {
  // Event listener for the "Track" button
  $("#trackButton").click(function () {
    // Get the search term from the input field
    let searchTerm = $("#searchInput").val().toLowerCase();

    // Clear previous search results and product details
    $("#searchResults").empty();
    $("#productDetails").empty();

    // Perform an AJAX GET request to retrieve product data from the server
    $.ajax({
      url: "your_server_endpoint_here",
      method: "GET",
      dataType: "json",
      data: { searchTerm: searchTerm }, // Pass the search term to the server
      success: function (data) {
        // Process the received data
        data.forEach(function (product) {
          // Display matching products within a section container
          let productHtml = `
                      <section data-product-id="${product.id}">
                          <h3>My Parcel</h3>
                          <div class="product-info">
                          <p>Tracking Number: ${product.trackingNumber}</p>
                          <p>Status: ${product.status}</p>
                          <button class="detail-button">View details</button>
                      </div>
                      </section>
                  `;
          $("#searchResults").append(productHtml);
        });

        //This script will redirect the user to the tracking status page
        $("#detail-button").click(function () {
          const trackingNumber = $("#searchInput").val().toLowerCase();

          // Redirect to the tracking status page with the tracking number as a URL parameter
          window.location.href = `./trackingStatus.html?trackingNumber=${trackingNumber}`;
        });

        // Add click event to "Track" buttons for more details
        $(".view-details").click(function () {
          // Get the product ID from the parent section's data attribute
          let productId = $(this).closest("section").data("product-id");
        });
      },
      error: function (error) {
        console.error("Error fetching data:", error);
      },
    });
  });
});
