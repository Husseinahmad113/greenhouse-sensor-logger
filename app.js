const sensorForm = document.getElementById("sensor-form");
const logList = document.getElementById("log-list");
const recordCount = document.getElementById("record-count");
const purgeAllButton = document.getElementById("purge-all");
const errorMessage = document.getElementById("error-message");
let sensorRecords = [];
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
    localStorage.setItem("greenhouseRecords", JSON.stringify(sensorRecords));
}
function loadRecords() {
    const savedRecords = localStorage.getItem("greenhouseRecords");

    if (savedRecords) {
        sensorRecords = JSON.parse(savedRecords);
    }
}
function displayRecords() {
    logList.innerHTML = "";
    sensorRecords.forEach(function(record) {
        const card = document.createElement("div");
        card.className = "log-card";
        card.textContent = "Greenhouse Bay: " + record.bay;
        card.textContent += " | pH: " + record.ph;
        card.textContent += " | EC: " + record.ec + " mS/cm";
        card.textContent += " | Temperature: " + record.temp + " °F";
        card.textContent += " | Humidity: " + record.humidity + "%";
        logList.appendChild(card);
    });
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
});
