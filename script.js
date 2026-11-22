function searchVehicle() {
    let number = document.getElementById("vehicleNumber").value;

    if (number === "") {
        alert("Please enter vehicle number");
    } else {
        alert("Vehicle search request submitted: " + number);
    }
}
