// Show dropdown on profile icon click
document.getElementById('profile-icon').addEventListener('click', function () {
    const dropdown = document.getElementById('profile-dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

// Hide dropdown when clicking outside
window.onclick = function (event) {
    if (!event.target.matches('#profile-icon')) {
        const dropdowns = document.getElementsByClassName("dropdown");
        for (let i = 0; i < dropdowns.length; i++) {
            dropdowns[i].style.display = "none";
        }
    }
}

// Functions to show modals
function showLoginOptions() {
    document.getElementById('loginModal').style.display = 'flex';
}

function showServiceProviderForm() {
    closeModal('loginModal');
    document.getElementById('serviceProviderModal').style.display = 'block';
}

function showMyProfile() {
    document.getElementById('profileModal').style.display = 'flex';
}

function showHelpDesk() {
    document.getElementById('helpDeskModal').style.display = 'flex';
}

function showHistory() {
    document.getElementById('historyModal').style.display = 'flex';
}

// Function to close modals
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function (event) {
    const modals = document.getElementsByClassName("modal");
    for (let i = 0; i < modals.length; i++) {
        if (event.target === modals[i]) {
            modals[i].style.display = "none";
        }
    }
}

function openServiceProviderLogin() {
    // Redirect to the serviceProviderLogin.html page
    window.location.href = 'serviceProviderLogin.html';
}

let cart = [];
let foodItems = [
    { id: 1, name: "Pizza", price: 10 },
    { id: 2, name: "Burger", price: 8 },
    { id: 3, name: "Sushi", price: 12 },
    // Add more food items as needed
];

function displayFoodItems() {
    const foodContainer = document.getElementById('food-items');
    foodContainer.innerHTML = '';
    foodItems.forEach(item => {
        const foodCard = document.createElement('div');
        foodCard.className = 'border p-4 rounded';
        foodCard.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <button onclick="addToCart(${item.id})" class="bg-blue-500 text-white p-2 rounded">Add to Cart</button>
        `;
        foodContainer.appendChild(foodCard);
    });
}

function addToCart(id) {
    const item = foodItems.find(i => i.id === id);
    cart.push(item);
    document.getElementById('cartCount').innerText = cart.length;
}

function showCart() {
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.innerText = `${item.name} - $${item.price}`;
            cartItemsContainer.appendChild(cartItem);
        });
    }
    cartModal.style.display = 'flex';
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function checkout() {
    alert('Proceeding to checkout...');
    closeCart();
}

// Get user location
// Get user location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    reverseGeocode(latitude, longitude);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User  denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

// Reverse Geocoding function using Nominatim
function reverseGeocode(lat, lon) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.display_name) {
                const placeName = data.display_name;
                document.getElementById('locationDisplay').textContent = `Location: ${placeName}`;
            } else {
                alert("Unable to retrieve location information.");
            }
        })
        .catch(error => {
            console.error("Error fetching location data:", error);
            alert("An error occurred while fetching location data.");
        });
}
