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
        logList.appendChild(card);
    });
    updateRecordCount();
}
