## Greenhouse Sensor Logger
Assignment 2b- Greenhouse Senssor Logger UI Dashboard 

## Project Overview 
The Greenhouse Sensor Logger is a responsive online application created with vanilla JavaScript, HTML5, and CSS3.

Users can record pH, electrical conductivity (EC), temperature, and relative humidity values from greenhouse sensors using the program. Every reading is categorized as either Critical Hazard, Warning, or Optimal.

Sensor readings are saved using localStorage and shown in a log history so they are accessible even after the page has been refreshed.

### Project Documents
The HTML structure and sensor entry form are located in `index.html`.- `styles.css`: Visual feedback and responsive styling.
Validation, classification, event handling, DOM manipulation, and local storage are all included in `app.js`.
- `README.md`: Assignment 2A architecture and project documentation.

## How to Run

1. In Visual Studio Code, open the project folder.
2. Use Live Server to access `index.html`.
3. Enter the necessary sensor readings and a greenhouse bay.
4. To save a valid reading, click Record Reading.
5. Check out Log History to see the recorded readings.
6. To delete a specific record, use Delete; to clean the history, use Purge All.

# Architecture in Assignment 2A

## User Journey in Section 4.1 

## Initial State

The Greenhouse Sensor Logger UI loads with a section for previously recorded telemetry logs and a sensor insertion form for a specific greenhouse bay. Any logs that are presently kept in localStorage are loaded and shown.

## First Action

The pH, temperature, relative humidity, and electrical conductivity (EC) values are entered by the user into the form. JavaScript instantly shows invalid or out-of-bound values after verifying the inputs as they are entered.

## Step 2

When the user clicks the Record Reading button, the form data are confirmed. The system records the reading, ascertains its environmental status, and saves the entry to localStorage if the data is genuine.

## Step 3

The telemetry record with its assigned status tag—Optimal, Warning, or Critical Hazard—is shown on the user interface after submission. It is not necessary to refresh the page in order for the new log to appear in the active log history.

## Action 4
 The user has the option to delete a single log or the complete log history. In order to prevent deleted records from reappearing after a browser refresh, these methods also update localStorage.

## Terminal State
 The remaining telemetry recordings and associated status tags are shown on the interface. The current log history is kept in localStorage, and the system is ready for another sensor reading.

 ## Section 4.2: Interaction Design 
 
 ## Execution Gulf

A field label for pH, temperature, relative humidity, and electrical conductivity (EC) identifies each sensor input.

The intended data format is explained by measurement units such mS/cm for EC, °F for temperature, and % for humidity. Additionally, each input has a placeholder that shows an example value.

By assisting users in understanding what information they need to enter and how to enter it, these design decisions lessen the Gulf of Execution.

### Evaluation Gulf

After evaluating the sensor values submitted, JavaScript modifies the DOM to display a status tag for every reading.

Depending on the classification conditions, the status tag shows Optimal, Warning, or Critical Hazard.

Because the user can rapidly comprehend the greenhouse's environmental situation, this instant input lowers the Gulf of Evaluation. 

### System Constraints

The program makes use of HTML numeric inputs with built-in validation features including needed, step, max, and min.

For instance, the pH input has a step value of 0.1, a maximum value of 14, and a minimum value of 0.

Additionally, JavaScript checks the input values before to submission and stops erroneous sensor data from being stored in localStorage or added to the application state.

## State of Visual Feedback

JavaScript checks to see if a sensor value is within the allowed range.

An error class is added to the input field when an invalid value is provided, altering its appearance with an error styling or highlighted border.

The error style disappears after the user fixes or removes the incorrect value.

Before the form is submitted, this offers instant feedback.

## Recovering Errors

There is a Delete button in every telemetry log that enables users to eliminate a single inaccurate or undesired record.

Additionally, a Purge All button on the UI allows you to erase the whole log history.

In order to prevent deleted entries from reappearing after a page refresh, both actions update the visible records and localStorage.

## Section 4.3: Decomposition of Semantic Components

There are both static and dynamic elements in the Greenhouse Sensor Logger interface.

## Static Elements
The main page container is called "body."
- `header`: The header of the application.
The title of the Greenhouse Sensor Logger is `h1`.
- `main`: The primary material of the application.
The part for sensor insertion is called "section."
- `h2`: The heading for Record Reading.
- `form`: A form for sensor entry that has a submit event.
- `input type="text"`— input from Greenhouse Bay.- `label` — pH label.
- `input type="number"` — pH input with step=0.1, max=14, and min=0.
The label for electrical conductivity is called "label."
- `input type="number"` — EC input with step=0.1 and min=0.
- `label`: Temperature label.
- `input type="number"` — Step=0.1 temperature input.
The label for relative humidity is called "label."
- `input type="number"` — Humidity input with step=0.1, max=100, and min=0.
- `button type="submit"`— The button to record reading.
- `section`: The Log History section.
- `h2`: The heading for Log History.
- `button`: The Purge All button.The application footer is located at `footer`.

## Dynamic Elements

Log List: A container that shows telemetry data.Individual sensor reading card; log entry.
Identification of Greenhouse Bay through Bay Reading.
Electrical conductivity is measured using the EC value.
pH measurement and pH value.
Temperature Value: The measurement of temperature.
Humidity Value: A measure of relative humidity.
The Delete button eliminates a specific log.
Optimal, Warning, or Critical Hazard are displayed via the Status Tag.

## Manipulation of DOM

The log entry cards are dynamically created and updated using JavaScript.

Event listeners are used by the application to validate input, submit forms, delete specific data, and purge all records.

The log history is rendered effectively using a DocumentFragment.

## Data Schema in Section 4.4

The following characteristics are present in every greenhouse sensor record:

  --- javascript
const sensorReadingSchema = {
    id: "string",
    bay: "string",
    ph: "number",
    ec: "number",
    temp: "number",
    humidity: "number",
    status: "string"
};
---
## Descriptions of Properties

- `id`: Every sensor record has a unique identification.
- `bay` — The name of the greenhouse bay under observation.- `ph`: The pH sensor's reading.
Electrical conductivity is measured in mS/cm.- `temp`: The temperature of the air in degrees Fahrenheit.
- `humidity`: The percentage of relative humidity.
Environmental classification: Optimal, Warning, or Critical Hazard.

## Conclusion

The Greenhouse Sensor Logger uses vanilla JavaScript, HTML5, and CSS3 to implement the architecture established in Assignment 2A.

Sensor input validation, real-time visual feedback, sensor reading classification, dynamic log history, individual record deletion, record purging, and permanent storage via localStorage are all included in the program.

Greenhouse sensor measurements can be managed in an orderly manner and with clear feedback thanks to the interface.