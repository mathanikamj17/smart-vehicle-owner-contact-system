let currentStep = 0;

const steps = document.querySelectorAll(".form-step");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const vehicleForm = document.getElementById("vehicleForm");

function showStep() {
    steps.forEach((step, index) => {
        step.classList.toggle("active", index === currentStep);
    });

    document.getElementById("stepText").innerText =
        "Step " + (currentStep + 1) + " of 5";

    prevBtn.disabled = currentStep === 0;

    nextBtn.style.display =
        currentStep === 3 || currentStep === 4 ? "none" : "inline-block";
}

function changeStep(direction) {
    if (direction === 1) {
        const currentFields =
            steps[currentStep].querySelectorAll("input, select");

        for (let field of currentFields) {
            if (!field.checkValidity()) {
                field.reportValidity();
                return;
            }
        }
    }

    currentStep += direction;

    if (currentStep === 3) {
        showReview();
    }

    showStep();
}

function showReview() {
    const fields = [
        ["Owner Name", "ownerName"],
        ["Email", "ownerEmail"],
        ["Phone", "ownerPhone"],
        ["Vehicle Number", "regNumber"],
        ["Vehicle Type", "vehicleType"],
        ["Vehicle Model", "vehicleModel"],
        ["City", "city"],
        ["Address", "address"]
    ];

    const review = document.getElementById("reviewDetails");

    review.innerHTML = "";

    fields.forEach(([label, id]) => {
        const p = document.createElement("p");
        p.textContent =
            label + ": " + document.getElementById(id).value;
        review.appendChild(p);
    });
}

vehicleForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const vehicle = {
        owner: document.getElementById("ownerName").value,
        email: document.getElementById("ownerEmail").value,
        phone: document.getElementById("ownerPhone").value,
        number: document.getElementById("regNumber").value.toUpperCase(),
        type: document.getElementById("vehicleType").value,
        model: document.getElementById("vehicleModel").value,
        city: document.getElementById("city").value,
        address: document.getElementById("address").value
    };

    let vehicles = JSON.parse(
        localStorage.getItem("vehicles") || "[]"
    );

    if (vehicles.some(v => v.number === vehicle.number)) {
        alert("This vehicle is already registered!");
        return;
    }

    vehicles.push(vehicle);

    localStorage.setItem("vehicles", JSON.stringify(vehicles));

    document.getElementById("registerResult").innerText =
        "Registration completed successfully!";

    alert("Vehicle Registration Successful!");

    vehicleForm.reset();
    currentStep = 0;
    showStep();
});

showStep();

// VEHICLE SEARCH
function searchVehicle() {
    const number = document.getElementById("vehicleNumber")
        .value.trim().toUpperCase();

    const vehicles = JSON.parse(
        localStorage.getItem("vehicles") || "[]"
    );

    const found = vehicles.find(v => v.number === number);

    document.getElementById("result").innerText = found
        ? "Owner: " + found.owner + " | Vehicle: " + found.type
        : "Vehicle not found!";
}

// EMERGENCY REQUEST
function sendEmergency() {
    const number = document.getElementById("emergencyVehicle")
        .value.trim().toUpperCase();

    const message = document.getElementById("emergencyMessage")
        .value.trim();

    if (!number || !message) {
        alert("Enter vehicle number and message!");
        return;
    }

    const requests = JSON.parse(
        localStorage.getItem("emergencyRequests") || "[]"
    );

    requests.push({
        vehicle: number,
        message: message,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(
        "emergencyRequests", JSON.stringify(requests)
    );

    document.getElementById("emergencyResult").innerText =
        "Emergency request saved successfully.";

    document.getElementById("emergencyMessage").value = "";
}

// SERVICE REMINDER
function saveService() {
    const vehicle = document.getElementById("serviceVehicle")
        .value.trim().toUpperCase();

    const date = document.getElementById("serviceDate").value;

    if (!vehicle || !date) {
        alert("Enter all service details!");
        return;
    }

    const reminders = JSON.parse(
        localStorage.getItem("serviceReminders") || "[]"
    );

    reminders.push({ vehicle, date });

    localStorage.setItem(
        "serviceReminders", JSON.stringify(reminders)
    );

    document.getElementById("serviceResult").innerText =
        "Service reminder saved for " + vehicle + " on " + date;
}
    
   
