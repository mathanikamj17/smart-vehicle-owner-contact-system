// Vehicle Search
function searchVehicle() {
    let number = document.getElementById("vehicleNumber").value.trim();

    if (number === "") {
        alert("Please enter vehicle number!");
    } else {
        document.getElementById("result").innerText =
            "Vehicle search request submitted: " + number;
    }
}

// Vehicle Registration
document.getElementById("vehicleForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let owner = document.getElementById("ownerName").value;
    let vehicle = document.getElementById("regNumber").value;
    let type = document.getElementById("vehicleType").value;

    document.getElementById("registerResult").innerText =
        "Registration request submitted successfully! " +
        "Owner: " + owner + " | Vehicle: " + vehicle +
        " | Type: " + type;

    this.reset();
});
function sendEmergency() {
    let vehicle = document.getElementById("emergencyVehicle").value.trim();
    let message = document.getElementById("emergencyMessage").value.trim();

    if (vehicle === "" || message === "") {
        alert("Please enter vehicle number and message!");
        return;
    }

    document.getElementById("emergencyResult").innerText =
        "Emergency request prepared successfully!";

    document.getElementById("emergencyMessage").value = "";
}
function saveService() {
    let vehicle = document.getElementById("serviceVehicle").value.trim();
    let date = document.getElementById("serviceDate").value;

    if (vehicle === "" || date === "") {
        alert("Please enter all details!");
        return;
    }

    document.getElementById("serviceResult").innerText =
        "Service reminder created for " + vehicle +
        " on " + date;
}
function addServiceReminder() {
  const vehicle = document.getElementById("vehicleName").value;
  const date = document.getElementById("serviceDate").value;

  if (!vehicle || !date) {
    alert("Please enter all details!");
    return;
  }

  const li = document.createElement("li");
  li.textContent = vehicle + " - Service Date: " + date;

  document.getElementById("reminderList").appendChild(li);
}

