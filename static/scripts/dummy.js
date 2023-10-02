$(document).ready(function () {
  // Dummy product data (replace with your actual data)
  const dummyData = [
    { id: 1, trackingNumber: "1234", status: "In Transit", name: "Monitor" },
    { id: 2, trackingNumber: "5678", status: "Delivered", name: "15 promax" },
    { id: 3, trackingNumber: "9101", status: "In Transit" },
    { id: 4, trackingNumber: "1213", status: "Shipped" },
    // Add more products as needed
  ];

  // Function to perform product search
  function performProductSearch(searchTerm) {
    // Clear previous search results and product details
    $("#searchResults").empty();
    $("#productDetails").empty();

    let data = dummyData;

    // Process the received data (dummyData)
    data.forEach(function (product) {
      if (product.trackingNumber.toLowerCase().includes(searchTerm)) {
        // Display matching products within a section container
        let productHtml = `
          
          <div class="product-container collapsible-container" data-product-id="${product.id}">
          <div class="product-info">
              
              <p  class="item">Tracking Number: ${product.trackingNumber}</p>
              <p class="item">Status: ${product.status}</p>
              <button class="detail-button collapsible-button item">View details</button>
              <div class="collapsible-content item">
              <div class="container animate__animated animate__zoomInDown">
              <div class="row">
                <div class="col-12 col-md-10 hh-grayBox pt45 pb20">
                  <div class="row justify-content-between">
                    <div class="order-tracking completed">
                      <span class="is-complete"></span>
                      <p id="#shippedStatus">Shipped<br /><span id="#updateDate">Mon, June 24</span></p>
                    </div>
                    <div class="order-tracking completed">
                      <span class="is-complete"></span>
                      <p id="inTransitStatus">In Transit<br /><Tue, id="#updateDate">Tue, June 25</span></p>
                    </div>
                    <div class="order-tracking">
                      <span class="is-complete"></span>
                      <p id="deliveredStatus">Delivered<br /><span id="#updateDate">Fri, June 28</span></p>
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
      }
    });

    // Add click event to make "Show Details" buttons collapsible
    $(".collapsible-button").click(function () {
      $(this).next(".collapsible-content").slideToggle();
    });
  }

  // This script will redirect the user to the tracking status page
  $("#detail-button").click(function () {
    const trackingNumber = $("#searchInput").val().toLowerCase();

    // Redirect to the tracking status page with the tracking number as a URL parameter
    window.location.href = `./trackingStatus.html?trackingNumber=${trackingNumber}`;
  });

  // Event listener for the "Track" button
  $("#trackButton").click(function () {
    let searchTerm = $("#searchInput").val().trim().toLowerCase();

    if (searchTerm === "") {
      // Display a message below the input field to prompt the user to enter a tracking number
      $("#searchInput").addClass("invalid");
      $("#searchInput").attr("placeholder", "Please enter a tracking number");
      return;
    }

    // Clear any previous error messages
    $("#searchInput").removeClass("invalid");
    $("#searchInput").attr("placeholder", "Enter your tracking number");

    // Call the function to perform the product search
    performProductSearch(searchTerm);
  });
});
