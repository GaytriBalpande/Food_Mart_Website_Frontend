// Function to handle restaurant registration
document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const restaurantName = document.getElementById('restaurantName').value;
    const restaurantAddress = document.getElementById('restaurantAddress').value;
    const contactNumber = document.getElementById('contactNumber').value;

    // Create a new restaurant object
    const newRestaurant = {
        name: restaurantName,
        address: restaurantAddress,
        contact: contactNumber
    };

    // Store the restaurant data (in a real app, this would be sent to a server)
    localStorage.setItem('newRestaurant', JSON.stringify(newRestaurant));

    // Display success message
    document.getElementById('message').innerText = `${restaurantName} has been registered successfully!`;

    // Optionally, clear the form
    document.getElementById('register-form').reset();
});
