const weatherForm = document.querySelector(".weatherForm");
const searchInput = document.querySelector(".searchInput");
const searchButton = document.querySelector(".searchButton");
const city = document.querySelector(".city");
const cityTemperature = document.querySelector(".cityTemperature");
const weathercondition = document.querySelector(".weathercondition");
const humidity = document.querySelector(".humidity");
const pressure = document.querySelector(".pressure");
const temperature = document.querySelector(".temperature");
const showWeather = document.querySelector(".tohide");
const img = document.querySelector(".weatherIcon");

async function getWeather(cityName) {
  try {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1f04563dcabd6e972cc8ee0c2d94c9d4&units=metric`
    );
    const weatherData = await weatherResponse.json();
    console.log(weatherData);
    cityTemperature.textContent = `${weatherData.main.temp}°C`;
    city.textContent = `Location: ${weatherData.name}`;
    temperature.textContent = `Temperature: ${weatherData.main.temp}°C`;
    weathercondition.textContent = `Weather Condition: ${weatherData.weather[0].description}`;
    humidity.textContent = `Humidity: ${weatherData.main.humidity}%`;
    pressure.textContent = `Pressure: ${weatherData.main.pressure}hPa`;
    // fetchStatus.textContent = "Weather data fetched successfully!";
    img.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    );

    fetchStatus.textContent = "";
  } catch (error) {
    fetchStatus.textContent = "Error fetching weather data. Please try again.";
    fetchStatus.style.color = "red";
  }
}

getWeather(searchInput.value);

addEventListener("submit", function (event) {
  event.preventDefault();
  getWeather(searchInput.value);


  //showWeather.classList.remove("tohide");
});

// Load saved city on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedCity = localStorage.getItem("cityName");
  if (savedCity) {
    searchInput.value = savedCity;
    getWeather(savedCity);
  }
});

// Handle form submit
weatherForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const cityName = searchInput.value.trim();
  if (cityName) {
    localStorage.setItem("cityName", cityName);
    getWeather(cityName);
  }
});
/*
"weather": [
    {
      "id": 804,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04d"
    }
*/

/* async function fetchWeather(cityName) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1f04563dcabd6e972cc8ee0c2d94c9d4&units=metric`
    );

   const weatherData = await response.json();

    console.log(weatherData);
    temperatureDisplay.textContent = `Temperature: ${weatherData.main.temp}°C`;
    fetchStatus.textContent = "";
  } catch (error) {
    fetchStatus.textContent = "Error fetching weather data. Please try again.";
    fetchStatus.style.color = "red";
  }
}
fetchWeather(searchInput.value);

weatherForm.addEventListener("submit", function (event) {
  event.preventDefault();
  fetchWeather(searchInput.value);
});
*/
