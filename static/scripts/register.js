document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const checkbox = document.getElementById("invalidCheck"); // Get the checkbox input
    const successMessage = document.getElementById("registrationSuccessMessage"); // Get the success message element

    form.addEventListener("submit", function(event) {
        console.log("Form submitted");
        const inputs = form.querySelectorAll("input[required], textarea[required], select[required]");
        let isValid = true;

        inputs.forEach(function(input) {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add("is-invalid");
            } else {
                input.classList.remove("is-invalid");
            }
        });

        if (!checkbox.checked) { // Check if the checkbox is not checked
            isValid = false;
            checkbox.classList.add("is-invalid");
        } else {
            checkbox.classList.remove("is-invalid");
        }

        if (!isValid) {
            event.preventDefault();
        } else {
            // If the form is valid, display the success message, prevent the form from submitting,
            // and hide the form
            event.preventDefault();
            successMessage.style.display = "block";
            form.style.display = "none";
        }
    });

});


// Define an object that maps states to their respective cities

const citiesByState = {
    "Ghana": ["Accra"],
    "Nigeria": ["Abuja"],
    "South Africa": ["Pretoria"],
    "Rwanda": ["Kigali"],
    "Malawi": ["Lilongwe"],
};


const stateSelect = document.getElementById("validationCustom04");
const citySelect = document.getElementById("validationCustom03");

function updateCities() {
    const selectedState = stateSelect.value;
    const cities = citiesByState[selectedState] || [];

    citySelect.innerHTML = '<option selected disabled value="">Choose...</option>';

    cities.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
}

stateSelect.addEventListener("change", updateCities);

updateCities();