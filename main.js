let countActive = false;

// Get the components
const daysText = document.getElementById("days");
const hoursText = document.getElementById("hours");
const minutesText = document.getElementById("minutes");
const secondsText = document.getElementById("seconds");
const setupButton = document.getElementById("countdown-setup");
const setupContainer = document.getElementById("countdown-popup-container");
const cancelSetup = document.getElementById("cancel-setup");
const countdownDate = document.getElementById("countdown-date");
const countdownSetupForm = document.getElementById("countdown-setup-form");
const countdownName = document.getElementById("countdown-name");
const countdownNameField = document.getElementById("countdown-name-field");
const cookieCloseButton = document.getElementById("close-cookie-container");
const cookieInformationContainer = document.getElementById("cookie-information-container");

// Compute the dates
let destinationDate;
let currentDate;
let currentName;

let storageItem = localStorage.getItem("destinationDate");
if (storageItem != null) {
    destinationDate = new Date(JSON.parse(storageItem));
    countActive = true;
}

let storageName = localStorage.getItem("name");
if (storageName != null) {
    countdownName.innerText = JSON.parse(storageName);
}

let storageCookieDecision = localStorage.getItem("hide-cookie-information");
if (storageCookieDecision != null) {
    document.body.removeChild(cookieInformationContainer);
}

// Display time
setInterval(e => {
    if (countActive) {
        currentDate = new Date();

        if (destinationDate - currentDate >= 0) {
            let difference = Math.abs(destinationDate - currentDate);
            daysText.innerText = Math.floor(difference / (1000 * 60 * 60 * 24));
            hoursText.innerText = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            minutesText.innerText = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            secondsText.innerText = Math.floor((difference % (1000 * 60)) / 1000);
        } else {
            countActive = false;
        }
    }
}, 1000);

// Enables opening and closing the setup menu
setupButton.addEventListener("click", () => setupContainer.classList.replace("hidden", "active"));
cancelSetup.addEventListener("click", () => setupContainer.classList.replace("active", "hidden"));

countdownSetupForm.addEventListener("submit", e => {
    e.preventDefault()
    destinationDate = new Date(countdownDate.value);
    countdownName.innerText = countdownNameField.value;
    localStorage.setItem("destinationDate", JSON.stringify(destinationDate));
    localStorage.setItem("name", JSON.stringify(countdownNameField.value))
    setupContainer.classList.replace("active", "hidden");
    countActive = true;
});

cookieCloseButton.addEventListener("click", () => {
    document.body.removeChild(cookieInformationContainer);
    localStorage.setItem("hide-cookie-information", JSON.stringify(true));
});