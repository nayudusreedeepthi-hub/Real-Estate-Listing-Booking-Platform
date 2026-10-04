```javascript
// Property Data

let properties = [

    {
        id: 1,
        name: "Modern 2BHK Apartment",
        location: "Chennai",
        type: "Apartment",
        price: 65,
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
    },

    {
        id: 2,
        name: "Luxury Villa",
        location: "Bangalore",
        type: "Villa",
        price: 145,
        bedrooms: 4,
        bathrooms: 3,
        area: 2800,
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d"
    },

    {
        id: 3,
        name: "Premium Family House",
        location: "Hyderabad",
        type: "House",
        price: 85,
        bedrooms: 3,
        bathrooms: 2,
        area: 1800,
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde"
    },

    {
        id: 4,
        name: "City View Apartment",
        location: "Mumbai",
        type: "Apartment",
        price: 120,
        bedrooms: 3,
        bathrooms: 2,
        area: 1600,
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea"
    },

    {
        id: 5,
        name: "Affordable 2BHK Home",
        location: "Chennai",
        type: "House",
        price: 48,
        bedrooms: 2,
        bathrooms: 2,
        area: 1100,
        image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00"
    },

    {
        id: 6,
        name: "Elegant Garden Villa",
        location: "Bangalore",
        type: "Villa",
        price: 150,
        bedrooms: 4,
        bathrooms: 4,
        area: 3200,
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811"
    }

];


// Load Favorites

let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];


// Load Bookings

let bookings =
    JSON.parse(localStorage.getItem("bookings")) || [];


// HTML Elements

const propertyContainer =
    document.getElementById("propertyContainer");

const searchInput =
    document.getElementById("searchInput");

const locationFilter =
    document.getElementById("locationFilter");

const typeFilter =
    document.getElementById("typeFilter");

const priceFilter =
    document.getElementById("priceFilter");

const bookingProperty =
    document.getElementById("bookingProperty");


// Display Properties

function displayProperties() {

    propertyContainer.innerHTML = "";

    const searchText =
        searchInput.value.toLowerCase();

    const selectedLocation =
        locationFilter.value;

    const selectedType =
        typeFilter.value;

    const selectedPrice =
        priceFilter.value;


    const filteredProperties =
        properties.filter(property => {

            const matchesSearch =
                property.name
                    .toLowerCase()
                    .includes(searchText) ||

                property.location
                    .toLowerCase()
                    .includes(searchText);


            const matchesLocation =
                selectedLocation === "all" ||
                property.location === selectedLocation;


            const matchesType =
                selectedType === "all" ||
                property.type === selectedType;


            let matchesPrice = true;

            if (selectedPrice !== "all") {

                matchesPrice =
                    property.price <=
                    Number(selectedPrice);

            }


            return (
                matchesSearch &&
                matchesLocation &&
                matchesType &&
                matchesPrice
            );

        });


    if (filteredProperties.length === 0) {

        propertyContainer.innerHTML = `
    < p style = "text-align:center; grid-column:1/-1;" >
        No properties found.
            </p >
    `;

        return;
    }


    filteredProperties.forEach(property => {

        const isFavorite =
            favorites.includes(property.id);


        const card =
            document.createElement("div");

        card.className =
            "property-card";


        card.innerHTML = `

    < img
src = "${property.image}"
class="property-image"
alt = "${property.name}"
    >

    <div class="property-info">

        <h3>
            ${property.name}
        </h3>

        <div class="location">
            📍 ${property.location}
        </div>

        <div class="price">
            ₹${property.price} Lakh
        </div>

        <div class="details">

            🛏️ ${property.bedrooms} Bedrooms
            <br>

                🚿 ${property.bathrooms} Bathrooms
                <br>

                    📐 ${property.area} sq.ft
                    <br>

                        🏠 ${property.type}

                    </div>

                    <div class="property-buttons">

                        <button
                            class="book-btn"
                            onclick="selectProperty(${property.id})"
                        >
                            📅 Book Visit
                        </button>

                        <button
                            class="favorite-btn
                        ${isFavorite ? "active" : ""}"
                        onclick="toggleFavorite(${property.id})"
                    >
                        ❤️
                    </button>

                </div>

        </div>
        `;


        propertyContainer.appendChild(card);

    });


        updateStatistics();

}


        // Select property for booking

        function selectProperty(id) {

    const property =
        properties.find(p => p.id === id);


        bookingProperty.value =
        property.name;


        document
        .getElementById("booking")
        .scrollIntoView({
            behavior: "smooth"
        });

}


        // Toggle Favorite

        function toggleFavorite(id) {

    if (favorites.includes(id)) {

            favorites =
            favorites.filter(
                favoriteId => favoriteId !== id
            );

    } else {

            favorites.push(id);

    }


        localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
        );


        displayProperties();

}


        // Add properties to booking dropdown

        function loadBookingProperties() {

            bookingProperty.innerHTML = `
        <option value="">
            Select a property
        </option>
    `;


    properties.forEach(property => {

        const option =
        document.createElement("option");

        option.value =
        property.name;

        option.textContent =
        `${property.name} - ${property.location}`;

        bookingProperty.appendChild(option);

    });

}


        // Booking Form

        document
        .getElementById("bookingForm")
        .addEventListener("submit", function(event) {

            event.preventDefault();


        const booking = {

            id: Date.now(),

        name:
        document.getElementById(
        "customerName"
        ).value,

        email:
        document.getElementById(
        "customerEmail"
        ).value,

        phone:
        document.getElementById(
        "customerPhone"
        ).value,

        property:
        bookingProperty.value,

        date:
        document.getElementById(
        "visitDate"
        ).value,

        time:
        document.getElementById(
        "visitTime"
        ).value

        };


        bookings.push(booking);


        localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
        );


        alert(
        "🎉 Property visit booked successfully!"
        );


        this.reset();


        updateStatistics();

    });


        // Update Statistics

        function updateStatistics() {

            document.getElementById(
                "propertyCount"
            ).textContent =
            properties.length;


        const locations =
        new Set(
        properties.map(
                property => property.location
        )
        );

        document.getElementById(
        "locationCount"
        ).textContent =
        locations.size;


        document.getElementById(
        "favoriteCount"
        ).textContent =
        favorites.length;


        document.getElementById(
        "bookingCount"
        ).textContent =
        bookings.length;

}


        // Search and Filters

        searchInput.addEventListener(
        "input",
        displayProperties
        );

        locationFilter.addEventListener(
        "change",
        displayProperties
        );

        typeFilter.addEventListener(
        "change",
        displayProperties
        );

        priceFilter.addEventListener(
        "change",
        displayProperties
        );


        // Initialize

        loadBookingProperties();

        displayProperties();

        updateStatistics();
        ```
