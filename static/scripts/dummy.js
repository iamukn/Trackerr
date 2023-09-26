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

    // Simulate an AJAX GET request to retrieve product data
    // In this case, there's no actual server request; we use the dummyData array
    // Replace this with your actual AJAX request when using a real server
    let data = dummyData;

    // Process the received data (dummyData)
    data.forEach(function (product) {
      if (product.trackingNumber.toLowerCase().includes(searchTerm)) {
        // Display matching products within a section container
        let productHtml = `
                    <section class="product-container"  data-product-id="${product.id}">
                        
                        <div class="product-info">
                            <p>Product: ${product.name}</p>
                            <p>Status: ${product.status}</p>
                            <button class="detail-button">View details</button>
                        </div>
                    </section>
                `;
        $("#searchResults").append(productHtml);
      }
    });

    // Add click event to "Track" buttons for more details
    $(".track-button").click(function () {
      // Get the product ID from the parent section's data attribute
      let productId = $(this).closest("section").data("product-id");

      // Simulate an AJAX GET request to fetch product details based on the productId
      // Again, this is simulated; you should replace it with a real server request
      let productDetails = getDummyProductDetails(productId);

      // Display product details on a separate page or modal
      let detailsHtml = `<h2>${productDetails.trackingNumber}</h2>`;
      detailsHtml += `<p>Status: ${productDetails.status}</p>`;
      // You can include more details as needed
      $("#productDetails").html(detailsHtml);
    });
  }

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

  // Simulated function to get product details based on productId
  function getDummyProductDetails(productId) {
    // Simulated product details (replace with your actual data)
    const productDetails = dummyData.find(
      (product) => product.id === productId
    );
    return productDetails || {}; // Return an empty object if not found
  }
});
