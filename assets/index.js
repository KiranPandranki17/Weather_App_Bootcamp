// Function to initialize the weather dashboard page
function initializeWeatherDashboard() {
  // DOM elements
  const inputCity = document.getElementById("search-input");
  const historyList = document.getElementById("history");
  const todaySection = document.getElementById("today");
  const forecastSection = document.getElementById("forecast");
  const searchForm = document.getElementById("search-form");

  // Retrieve search history from local storage or initialize an empty array
  let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

  // OpenWeatherMap API key
  const apiKey = "7ca8c991dc4c4cf5a9012c5a6b9731be";

  // Function to fetch weather data from the OpenWeatherMap API
  function getWeatherData(cityName) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

    // Make API request
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Process and display current weather
        displayCurrentWeather(data);

        // Fetch and display 5-day forecast
        return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`);
      })
      .then((response) => response.json())
      .then((data) => {
        // Process and display 5-day forecast
        displayFiveDayForecast(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }

  // Function to display current weather
  function displayCurrentWeather(data) {
    todaySection.innerHTML = ""; // Clear previous content
    todaySection.classList.remove("hidden");
    const cityName = data.name;
    const date = new Date(data.dt * 1000);
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const weatherIcon = data.weather[0].icon;

    // Create and append HTML elements
    const currentWeatherHTML = `
        <h2>${cityName} (${dayjs(date).format("MM/DD/YYYY")})</h2>
        <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="${data.weather[0].description}">
        <p>Temperature: ${temperature} &#176;C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
      `;

    todaySection.innerHTML = currentWeatherHTML;
  }
  
}