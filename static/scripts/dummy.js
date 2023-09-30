$(document).ready(function () {
  // Dummy product data (replace with your actual data)
  const dummyData = [
    { id: 1, trackingNumber: "1234", status: "In Transit", name: "Monitor" },
    { id: 2, trackingNumber: "5678", status: "Delivered", name: "15 promax" },
    { id: 3, trackingNumber: "9101", status: "In Transit" },
    { id: 4, trackingNumber: "1213", status: "Shipped" },
    // Add more products as needed
  ];

  // Function to initialize collapsible buttons
  function initializeCollapsibleButtons() {
    $(".collapsible-button").click(function () {
      // Toggle the closest collapsible content within the same section
      $(this).closest("section").find(".collapsible-content").slideToggle();
    });
  }

  // Call the initialization function
  initializeCollapsibleButtons();

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
                    <section class="product-container collapsible-container"  data-product-id="${product.id}">
                        
                        <div class="product-info">
                            <p>Tracking Number: ${product.trackingNumber}</p>
                            <p>Status: ${product.status}</p>
                            <button class="detail-button collapsible-button" >View details</button>
                            <div class="collapsible-content">
                            <p>This is some hidden content that will be revealed when you press the button.</p>
                            </div>
                        </div>
                    </section>
                `;

        $("#searchResults").append(productHtml);
      }
    });
  }

  //This script will redirect the user to the tracking status page
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
1