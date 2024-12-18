const users = [
    { username: "ticketperson first", password: "busstation09" },
    { username: "ticketperson second", password: "busstation19" }
]; // List of users with credentials for authentication

const buses = [
    { bus_name: "Cubao", destination: "Cubao", seats: Array(30).fill(null) },
    { bus_name: "Baguio", destination: "Baguio", seats: Array(30).fill(null) },
    { bus_name: "Pasay", destination: "Pasay", seats: Array(30).fill(null) }
]; // Array of buses with destinations and seat availability initialized as null

// Function to authenticate a user based on username and password
function authenticateUser() {
    const username = prompt("Enter username: "); // Prompt for username
    const password = prompt("Enter password: "); // Prompt for password
    // Check if username and password match any user in the users array
    return users.some(user => user.username === username && user.password === password);
}

// Function to display the seats of a bus with their status
function displaySeats(bus) {
    console.log(`Seats for bus to ${bus.destination}:`); // Log bus destination
    bus.seats.forEach((seat, index) => {
        const status = seat === null ? "AVAILABLE" : `Reserved: ${seat}`; // Determine seat status
        console.log(`Seat ${index + 1}: ${status}`); // Log seat number and status
    });
}

// Function to get a sorted list of available seats for a bus
function sortAvailableSeats(bus) {
    // Map seat indexes where the seat is null and filter out unavailable ones
    return bus.seats.map((seat, index) => seat === null ? index + 1 : null).filter(seat => seat !== null);
}

// Menu for ticket person to manage buses
function ticketPersonMenu() {
    while (true) {
        const choice = prompt("1. Logout\n2. View Buses\n3. Manage Bus\nChoose an option: "); // Prompt for menu choice
        
        if (choice === '1') return; // Logout
        if (choice === '2') viewBuses(); // View buses and their seats
        if (choice === '3') manageBus(); // Manage specific bus operations
    }
}

// Function to view all buses and their seat statuses
function viewBuses() {
    buses.forEach(bus => displaySeats(bus)); // Display seats for each bus
    if (prompt("Enter 'c' to cancel view.") === 'c') return; // Option to cancel viewing
}

// Function to manage a specific bus (add/remove reservations)
function manageBus() {
    const busIndex = parseInt(prompt("Which bus to manage? (1 for Cubao, 2 for Baguio, 3 for Pasay): ")) - 1; // Select bus
    const bus = buses[busIndex]; // Get the selected bus

    while (true) {
        const choice = prompt("1. Add Reservation\n2. Remove Reservation\n3. Go Back\nChoose an option: "); // Menu options
        
        if (choice === '1') addReservation(bus); // Add a reservation
        if (choice === '2') removeReservation(bus); // Remove a reservation
        if (choice === '3') return; // Go back to the previous menu
    }
}

// Function to add a reservation to a bus
function addReservation(bus) {
    const availableSeats = sortAvailableSeats(bus); // Get available seats
    if (availableSeats.length === 0) {
        alert("Sorry, the bus is fully booked."); // Inform if no seats are available
        return;
    }

    alert(`Available seats: ${availableSeats.join(', ')}`); // Show available seats
    const seatChoice = parseInt(prompt("Enter seat number to reserve: ")) - 1; // Choose a seat

    if (bus.seats[seatChoice] === null) {
        const customerName = prompt("Enter customer name: "); // Get customer name
        bus.seats[seatChoice] = customerName; // Reserve the seat
        alert(`Reservation confirmed for ${customerName} on Seat ${seatChoice + 1}`); // Confirmation message
    } else {
        alert("Seat already taken."); // Inform if seat is occupied
    }

    if (prompt("Do you want to add more reservations? (y/n): ").toLowerCase() !== 'y') {
        return; // Exit if no more reservations are to be made
    }
}

// Function to remove a reservation from a bus
function removeReservation(bus) {
    const customerName = prompt("Enter the customer name to remove reservation: "); // Get customer name
    
    const seatIndex = bus.seats.indexOf(customerName); // Find the seat index for the customer
    if (seatIndex !== -1) {
        bus.seats[seatIndex] = null; // Remove the reservation
        alert(`Reservation for ${customerName} on Seat ${seatIndex + 1} has been removed.`); // Confirmation message
    } else {
        alert(`No reservation found for ${customerName}.`); // Inform if no reservation is found
    }

    if (prompt("Do you want to remove more reservations? (y/n): ").toLowerCase() !== 'y') {
        return; // Exit if no more reservations are to be removed
    }
}

// Menu for customer operations
function customerMenu() {
    while (true) {
        const choice = prompt("1. Reserve Seat\n2. Cancel Reservation\n3. Cancel\nChoose an option: "); // Customer menu
        
        if (choice === '1') reserveSeat(); // Reserve a seat
        if (choice === '2') cancelReservation(); // Cancel a reservation
        if (choice === '3') return; // Exit the customer menu
    }
}

// Function to reserve a seat as a customer
function reserveSeat() {
    alert("Available Buses:"); // List available buses
    buses.forEach((bus, index) => {
        alert(`${index + 1}. ${bus.destination}`);
    });

    const busIndex = parseInt(prompt("Choose bus (1 for Cubao, 2 for Baguio, 3 for Pasay): ")) - 1; // Select a bus
    const bus = buses[busIndex]; // Get the selected bus

    const availableSeats = sortAvailableSeats(bus); // Get available seats
    if (availableSeats.length === 0) {
        alert("Sorry, this bus is fully booked."); // Inform if no seats are available
        return;
    }

    alert(`Available seats: ${availableSeats.join(', ')}`); // Show available seats
    const seatChoice = parseInt(prompt("Enter seat number to reserve: ")) - 1; // Choose a seat

    if (bus.seats[seatChoice] === null) {
        const customerName = prompt("Enter your name: "); // Get customer name
        bus.seats[seatChoice] = customerName; // Reserve the seat
        alert(`Reservation confirmed for ${customerName} on Seat ${seatChoice + 1}`); // Confirmation message
    } else {
        alert("Seat is already taken."); // Inform if seat is occupied
    }
}

// Function to cancel a reservation as a customer
function cancelReservation() {
    alert("Which bus did you reserve a seat on?"); // Ask for bus
    buses.forEach((bus, index) => {
        alert(`${index + 1}. ${bus.destination}`);
    });

    const busIndex = parseInt(prompt("Choose bus (1 for Cubao, 2 for Baguio, 3 for Pasay): ")) - 1; // Select bus
    const bus = buses[busIndex]; // Get the selected bus

    const customerName = prompt("Enter your name: "); // Get customer name
    const seatIndex = bus.seats.indexOf(customerName); // Find the seat index for the customer

    if (seatIndex !== -1) {
        if (prompt(`Are you sure you want to cancel the reservation for ${customerName} on Seat ${seatIndex + 1}? (y/n): `).toLowerCase() === 'y') {
            bus.seats[seatIndex] = null; // Cancel the reservation
            alert(`Reservation for ${customerName} on Seat ${seatIndex + 1} has been canceled.`); // Confirmation message
        }
    } else {
        alert(`No reservation found for ${customerName}.`); // Inform if no reservation is found
    }
}

// Main function to start the program
function main() {
    while (true) {
        const choice = prompt("1. Ticket Person\n2. Customer\n3. Exit\nChoose an option: "); // Main menu
        
        if (choice === '1') {
            if (authenticateUser()) { // Authenticate user
                alert("Welcome, Ticket Person!");
                ticketPersonMenu(); // Ticket person menu
            } else {
                alert("Invalid credentials."); // Invalid credentials
            }
        } else if (choice === '2') {
            customerMenu(); // Customer menu
        } else if (choice === '3') {
            alert("Exiting program."); // Exit program
            break;
        }
    }
}

main(); // Start the program
