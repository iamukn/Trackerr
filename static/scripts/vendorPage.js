// Function to generate a random tracking code

document.addEventListener('DOMContentLoaded', function() {
    const trackingForm = document.getElementById('trackingForm');
    const trackingNumberInput = document.getElementById('trackingNumber');
    const updateStatusButton = document.getElementById('updateStatus');
    const filterSelect = document.getElementById('filterSelect');

    trackingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const trackingNumber = trackingNumberInput.value;

        if (isValidTrackingNumber(trackingNumber)) {
            // Create a pop-up message for successful registration
            alert('Item successfully registered');

            // You can add logic here to save the tracking information
            // Set the tracking status to "Pending" in your database, for example
        } else {
            // Create a pop-up message for an invalid tracking number
            alert('Invalid tracking number');
        }
    });

    updateStatusButton.addEventListener('click', function() {
        const selectedOption = filterSelect.value;
        if (selectedOption === 'all') {
            // Create a pop-up message for selecting a status
            alert('Please select a new status for the tracking number');
        } else {
            // Create a pop-up message for updating the status
            alert(`Tracking Number updated to "${selectedOption}"`);
        }
    });

    function isValidTrackingNumber(trackingNumber) {
        // Check if the tracking number has at least 8 characters and contains alphabets
        const isValid = /^[A-Za-z0-9]{8,}$/.test(trackingNumber);
        return isValid;
    }
});