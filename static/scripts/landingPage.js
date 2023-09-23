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
                          <div>
                              <p>Product: ${product.name}</p>
                              <p>Status: ${product.status}</p>
                              <button class="view-details">View details</button>
                          </div>
                      </section>
                  `;
          $("#searchResults").append(productHtml);
        });

        // Add click event to "Track" buttons for more details
        $(".view-details").click(function () {
          // Get the product ID from the parent section's data attribute
          let productId = $(this).closest("section").data("product-id");

          // Perform an AJAX GET request to fetch product details based on the productId
          $.ajax({
            url: `get_product_details=${productId}`, // Replace with  server endpoint
            method: "GET",
            dataType: "json",
            success: function (productDetails) {
              // Display product details on a separate page or modal
              let detailsHtml = `<h2>${productDetails.name}</h2>`;
              detailsHtml += `<p>Status: ${productDetails.status}</p>`;

              $("#productDetails").html(detailsHtml);
            },
            error: function (error) {
              console.error("Error fetching product details:", error);
            },
          });
        });
      },
      error: function (error) {
        console.error("Error fetching data:", error);
      },
    });
  });
});
