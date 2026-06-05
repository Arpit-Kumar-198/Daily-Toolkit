// Select elements once
const dayElement = document.querySelector(".day");
const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date-box .date");

// Days array
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Function to update day, time and date
function updateDateTime() {
  const currentDate = new Date();

  // Day
  dayElement.innerText = days[currentDate.getDay()];

  // Time
  let hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  const period = hours >= 12 ? "PM" : "AM";

  // If you want 12-hour format
  hours = hours % 12 || 12;

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  timeElement.innerText = `${formattedHours}:${formattedMinutes} ${period}`;

  // Date
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();

  dateElement.innerText = `${day} / ${month} / ${year}`;
}

// Initial call
updateDateTime();

// Update every second
setInterval(updateDateTime, 1000);