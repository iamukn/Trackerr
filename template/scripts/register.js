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
    "Bayelsa": ["Yenagoa", "Brass", "Sagbama", "Ekeremor", "Southern Ijaw", "Nembe", "Ogbia", "Kolokuma/Opokuma", "Yenagoa"],
    "Benue": ["Makurdi", "Gboko", "Otukpo", "Katsina-Ala", "Adikpo", "Ukum", "Vandeikya", "Agatu", "Gwer East", "Obi"],
    "Borno": ["Maiduguri", "Jere", "Mafa", "Konduga", "Bama", "Dikwa", "Gwoza", "Kaga", "Ngala", "Biu"],
    "Cross River": ["Calabar", "Akamkpa", "Ogoja", "Ikom", "Obudu", "Ugep", "Obubra", "Bekwara", "Yakurr"],
    "Delta": ["Asaba", "Warri", "Ughelli", "Sapele", "Agbor", "Burutu", "Effurun", "Ozoro", "Abraka", "Udu"],
    "Ebonyi": ["Abakaliki", "Afikpo", "Onueke", "Izzi", "Ohaukwu", "Ishielu", "Ezza", "Afikpo South", "Ezza North"],
    "Edo": ["Benin City", "Auchi", "Ekpoma", "Irrua", "Uromi", "Igarra", "Afuze", "Ubiaja", "Okada", "Igueben"],
    "Ekiti": ["Ado-Ekiti", "Ikere-Ekiti", "Ikole-Ekiti", "Aramoko-Ekiti", "Oye-Ekiti", "Ido-Ekiti", "Emure-Ekiti", "Ijero-Ekiti", "Ilawe-Ekiti", "Ise-Ekiti"],
    "Enugu": ["Enugu", "Nsukka", "Agbani", "Nsukka", "Awgu", "Udi", "Nkpor", "Oji River", "Igbo Etiti", "Enugu South"],
    "Gombe": ["Gombe", "Dukku", "Kaltungo", "Nafada", "Yamaltu/Deba", "Gombe", "Balanga", "Billiri", "Gombe", "Kumo"],
    "Imo": ["Owerri", "Orlu", "Okigwe", "Mgbidi", "Oguta", "Aboh Mbaise", "Nkwerre", "Oru East", "Ohaji/Egbema"],
    "Jigawa": ["Dutse", "Hadejia", "Gumel", "Birnin Kudu", "Kazaure", "Ringim", "Gwaram", "Maigatari", "Babura", "Sule Tankarkar"],
    "Kaduna": ["Kaduna", "Zaria", "Kafanchan", "Soba", "Ikara", "Kaura", "Makarfi", "Kajuru", "Kachia", "Zangon Kataf"],
    "Kano": ["Kano", "Dutse", "Kankia", "Wudil", "Danbatta", "Sumaila", "Bebeji", "Dawakin Kudu", "Garun Malam", "Madobi"],
    "Katsina": ["Katsina", "Daura", "Funtua", "Malumfashi", "Mani", "Kankara", "Zango", "Kafur", "Baure", "Dutsi"],
    "Kebbi": ["Birnin Kebbi", "Sakaba", "Jega", "Yauri", "Gwandu", "Argungu", "Bunza", "Bagudo", "Kalgo", "Birnin Kebbi South"],
    "Kogi": ["Lokoja", "Idah", "Okene", "Kabba", "Ogidi", "Ajaokuta", "Ankpa", "Dekina", "Ibaji", "Kogi"],
    "Kwara": ["Ilorin", "Offa", "Share", "Omu-Aran", "Jebba", "Pategi", "Lafiagi", "Kaiama", "Kwara", "Baruten"],
    "Lagos": ["Lagos", "Ikeja", "Lekki", "Ikoyi", "Victoria Island", "Ajah", "Apapa", "Surulere", "Badagry", "Ikorodu"],
    "Nasarawa": ["Lafia", "Keffi", "Akwanga", "Nasarawa", "Keffi", "Doma", "Lafia", "Toto", "Karu", "Nasarawa Eggon"],
    "Niger": ["Minna", "Bida", "Suleja", "Kontagora", "New Bussa", "Lapai", "Zungeru", "Agaie", "Wushishi", "Rijau"],
    "Ogun": ["Abeokuta", "Ijebu-Ode", "Sagamu", "Ota", "Ilaro", "Ago-Iwoye", "Ijebu Igbo", "Ifo", "Owode", "Ewekoro"],
    "Ondo": ["Akure", "Ondo", "Owo", "Ikare Akoko", "Okitipupa", "Odigbo", "Idanre", "Irele", "Akoko North-East", "Ilaje"],
    "Osun": ["Osogbo", "Ile-Ife", "Ila Orangun", "Iwo", "Ede", "Ijebu-Jesa", "Ikire", "Ejigbo", "Otan Ayegbaju", "Ipetumodu"],
    "Oyo": ["Ibadan", "Ogbomoso", "Iseyin", "Eruwa", "Saki", "Okeho", "Igboho", "Ibarapa", "Lalupon", "Ilero"],
    "Plateau": ["Jos", "Bukuru", "Pankshin", "Langtang", "Mangu", "Shendam", "Barkin Ladi", "Riyom", "Bokkos", "Langtang South"],
    "Rivers": ["Port Harcourt", "Obio-Akpor", "Aba", "Emohua", "Eleme", "Okrika", "Ikwerre", "Etche", "Oyigbo", "Tai"],
    "Sokoto": ["Sokoto", "Wurno", "Kware", "Rabah", "Tambuwal", "Isa", "Gada", "Binji", "Ilela", "Silame"],
    "Taraba": ["Jalingo", "Bali", "Karim Lamido", "Ibi", "Wukari", "Balinga", "Zing", "Takum", "Lau", "Gashaka"],
    "Yobe": ["Damaturu", "Gashua", "Nguru", "Potiskum", "Bade", "Gujba", "Jakusko", "Nangere", "Fika", "Machina"],
    "Zamfara": ["Gusau", "Birnin Magaji", "Anka", "Talata Mafara", "Maru", "Bungudu", "Kaura Namoda", "Shinkafi", "Gummi", "Bakura"],
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