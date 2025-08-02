
       // Weather
      const city = prompt("Enter city name:");
      const API_KEY = "eb8b24d7d6f6c88f7289d9cb858c5594";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

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

      fetch(url)
        .then(res => res.json())
        .then(data => {
          place.innerText = data.name;
          humidity.innerText = `Humidity: ${data.main.humidity}%`;
          temperature.innerText = `${Math.round(data.main.temp - 273)} °C`;
          condition.innerText = data.weather[0].description;

          const weatherMain = data.weather[0].main; 
          weatherImg.src = weatherImages[weatherMain];
          const lat = data.coord.lat;
          const lon = data.coord.lon;

          const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

          fetch(aqiUrl)
            .then(res => res.json())
            .then(aqiData => {
              const aqiIndex = aqiData.list[0].main.aqi; // 1 to 5

              let status = "";
              switch (aqiIndex) {
                case 1:
                  status = "Good😊 (0–50)";
                  break;
                case 2:
                  status = "Fair🙂 (51–100)";
                  break;
                case 3:
                  status = "Moderate😐 (101–150)";
                  break;
                case 4:
                  status = "Poor😷 (151–200)";
                  break;
                case 5:
                  status = "Very Poor☠️ (200+)";
                  break;
                default:
                  status = "Unknown";
              }

              aqi.innerText = `AQI : ${status}`;
            });

        });