$(document).ready(function () {
  // Event listener for the "Track" button
  $("#trackButton").click(function () {
    // Get the search term from the input field
    let searchTerm = $("#searchInput").val().toLowerCase();

    if (searchTerm === "") {
      // Display a message below the input field to prompt the user to enter a tracking number
      $("#searchInput").addClass("invalid");
      $("#searchInput").attr(
        "placeholder",
        "Please enter your tracking number"
      );
      return;
    }

    $("#searchInput").removeClass("invalid");
    $("#searchInput").attr("placeholder", "Enter your tracking number");
    // Clear previous search results
    $("#searchResults").empty();

    // Perform an AJAX GET request to retrieve parcel data from the server
    $.ajax({
      url: "/",
      method: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ search: searchTerm }), // Pass the search term to the server
      success: function (data) {
        console.log(data);

        // Process the received data
        // Display matching products within a section container
        let productHtml = `
          <div class="product-container collapsible-container" data-product-id="${data.tracking_number}">
          <div class="product-info">
              
              <p  class="item">Tracking Number: ${data.tracking_number}</p>
              <p class="item">Status: ${data.status1}</p>
              <button class="detail-button collapsible-button item">View details</button>
              <div class="collapsible-content item">
              <div class="container animate__animated animate__zoomInDown">
              <div class="row">
                <div class="col-12 col-md-10 hh-grayBox pt45 pb20">
                  <div class="row justify-content-between">
                    <div class="order-tracking completed">
                      <span class="is-complete"></span>
                      <p id="shippedStatus">Shipped<br /><span id="updateDate">Mon, June 24</span></p>
                    </div>
                    <div class="order-tracking completed">
                      <span class="is-complete"></span>
                      <p id="inTransitStatus">In Transit<br /><Tue, id="updateDate">Tue, June 25</span></p>
                    </div>
                    <div class="order-tracking">
                      <span class="is-complete"></span>
                      <p id="deliveredStatus">Delivered<br /><span id="updateDate">Fri, June 28</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              </div>
              
            </div>
           
              
            </div>
          `;
        $("#searchResults").append(productHtml);

        // Add click event to make "Show Details" buttons collapsible
        $(".collapsible-button").click(function () {
          $(this).next(".collapsible-content").slideToggle();
        });
      },
      error: function (error) {
        console.error("Error fetching data:", error);
      },
    });
  });
});
