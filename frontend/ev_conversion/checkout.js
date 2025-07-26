document.addEventListener("DOMContentLoaded", function () {
  // Create a new URLSearchParams object to get parameters from the URL
  const urlParams = new URLSearchParams(window.location.search);

  // Get the value of the 'vehicle' parameter
  const vehicleName = urlParams.get("vehicle");

  // Find the element where we want to display the vehicle name
  const selectedVehicleElement = document.getElementById("selected-vehicle");

  // If a vehicle name was found in the URL and the element exists
  if (vehicleName && selectedVehicleElement) {
    // Update the text content of the element
    // decodeURIComponent reverses the encoding we did earlier
    selectedVehicleElement.textContent = decodeURIComponent(vehicleName);
  }
});