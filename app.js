(function() {
const sensorForm = document.getElementById("sensor-form");
const logList = document.getElementById("log-list");
const recordCount = document.getElementById("record-count");
const purgeAllButton = document.getElementById("purge-all");
const errorMessage = document.getElementById("error-message");
let sensorRecords = [];
const STORAGE_KEY = "greenhouseRecords";
function updateRecordCount() {
    recordCount.textContent = sensorRecords.length;
}
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.hidden = false;
}
function clearError() {
    errorMessage.textContent = "";
    errorMessage.hidden = true;
}
function saveRecords() {
   localStorage.setItem(STORAGE_KEY, JSON.stringify(sensorRecords));
}
function loadRecords() {
    const savedRecords = localStorage.getItem(STORAGE_KEY);

    if (savedRecords) {
        sensorRecords = JSON.parse(savedRecords);
        sensorRecords.forEach(function(record) {
    if (!record.id) record.id = crypto.randomUUID();
});
saveRecords();
    }
}
function classifyReading(ph, temp, ec, humidity) {
    const critical =
        (ph < 5.0 || ph > 7.5) &&
        (temp < 55 || temp > 95) &&
        (ec < 0.2 || ec > 4.5) &&
        (humidity < 30 || humidity > 90);

    if (critical) {
        return "Critical Hazard";
    }

    const optimal =
        (ph >= 5.5 && ph <= 6.5) &&
        (temp >= 64.4 && temp <= 71.6) &&
        (ec >= 1.0 && ec <= 2.0) &&
        (humidity >= 50 && humidity <= 70);

    if (optimal) {
        return "Optimal";
    }

    return "Warning";
}
function displayRecords() {
    logList.innerHTML = "";
    const fragment = document.createDocumentFragment();
    sensorRecords.forEach(function(record) {
        const card = document.createElement("div");
        card.className = "log-card";
        const status = record.status || classifyReading(record.ph, record.temp, record.ec, record.humidity);
        if (status === "Optimal") {
    card.classList.add("status-optimal");
} else if (status === "Warning") {
    card.classList.add("status-warning");
} else if (status === "Critical Hazard") {
    card.classList.add("status-critical");
}
        card.textContent = "Greenhouse Bay: " + record.bay;
        card.textContent += " | pH: " + record.ph;
        card.textContent += " | EC: " + record.ec + " mS/cm";
        card.textContent += " | Temperature: " + record.temp + " °F";
        card.textContent += " | Humidity: " + record.humidity + "%";
        card.textContent += " | Status: " + (record.status || classifyReading(record.ph, record.temp, record.ec, record.humidity));
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
    sensorRecords = sensorRecords.filter(function(item) {
        return item.id !== record.id;
    });
    saveRecords();
    displayRecords();
});
        card.appendChild(deleteButton);
        fragment.appendChild(card);
    });
    logList.appendChild(fragment);
    updateRecordCount();
}
sensorForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const bay = document.getElementById("bay").value.trim();
    const ph = Number(document.getElementById("ph").value);
    const ec = Number(document.getElementById("ec").value);
    const temp = Number(document.getElementById("temp").value);
    const humidity = Number(document.getElementById("humidity").value);
    clearError();
    if (["ph", "ec", "temp", "humidity"].some(id => document.getElementById(id).value.trim() === "")) {
    showError("Please fill in all sensor readings.");
    return;
}
    if (bay === "") {
    showError("Please enter a greenhouse bay.");
    return;
}
if (!Number.isFinite(ph) || ph < 0 || ph > 14) {
    showError("Please enter a valid pH level between 0 and 14.");
    return;
}
if (!Number.isFinite(ec) || ec < 0) {
    showError("Please enter a valid EC value of 0 or greater.");
    return;
}
if (!Number.isFinite(temp)) {
    showError("Please enter a valid temperature.");
    return;
}
if (!Number.isFinite(humidity) || humidity < 0 || humidity > 100) {
    showError("Please enter a valid humidity between 0 and 100.");
    return;
}
const newRecord = {
    id: crypto.randomUUID(),
    bay: bay,
    ph: ph,
    ec: ec,
    temp: temp,
    humidity: humidity,
    status: classifyReading(ph, temp, ec, humidity)
};
sensorRecords.push(newRecord);
saveRecords();
displayRecords();
sensorForm.reset();
});

loadRecords();
displayRecords();
purgeAllButton.addEventListener("click", function() {
    sensorRecords = [];
    saveRecords();
    displayRecords();
});

const sensorInputs = ["ph", "ec", "temp", "humidity"];
sensorInputs.forEach(function(id) {
    const input = document.getElementById(id);
    input.addEventListener("input", function() {
        if (input.value.trim() === "") {
    clearError();
    input.classList.remove("invalid");
} else if (!input.checkValidity()) {
    showError("Please enter a valid value for " + id + ".");
    input.classList.add("invalid");
} else {
    clearError();
    input.classList.remove("invalid");
}
    });
});
})();