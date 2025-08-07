const API_KEY = "eb8b24d7d6f6c88f7289d9cb858c5594";

const weatherImg = document.querySelector('.weather-image');
const temperature = document.querySelector('.temperature');
const place = document.querySelector('.location');
const humidity = document.querySelector('.humidity');
const aqi = document.querySelector('.aqi');
const condition = document.querySelector('.condition');

const weatherImages = {
  "Clear": "images/clear.png",
  "Clouds": "images/clouds.png",
  "Rain": "images/rain.png",
  "Thunderstorm": "images/thunderstorm.png",
  "Snow": "images/snow.png",
  "Mist": "images/mist.png",
};

async function fetchWeatherForCity(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Invalid city");
    const data = await res.json();

    // Show page now that we have valid data
    document.body.classList.add('loaded');

    place.innerText = data.name;
    humidity.innerText = `Humidity: ${data.main.humidity}%`;
    temperature.innerText = `${Math.round(data.main.temp - 273)} °C`;
    condition.innerText = data.weather[0].description;

    const weatherMain = data.weather[0].main;
    weatherImg.src = weatherImages[weatherMain] || "images/default.png";

    const lat = data.coord.lat;
    const lon = data.coord.lon;

    const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const aqiRes = await fetch(aqiUrl);
    const aqiData = await aqiRes.json();
    const aqiIndex = aqiData.list[0].main.aqi;
    const aqiStatus = ["Unknown", "Good😊", "Fair🙂", "Moderate😐", "Poor😷", "Very Poor☠️"];
    aqi.innerText = `AQI: ${aqiStatus[aqiIndex] || "Unknown"}`;

  } catch (error) {
    alert("❌ Invalid city. Please try again.");
    askForCity(); 
  }
}

function askForCity() {
  const city = prompt("Enter a valid city name:");
  if (city) fetchWeatherForCity(city);
  else askForCity(); 
}

// 🔁 Start asking immediately
askForCity();
