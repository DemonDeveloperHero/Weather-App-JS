const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Get free API key from https://openweathermap.org/api
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherResult = document.getElementById("weather-result");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        weatherResult.innerHTML = "Please enter a city name.";
        return;
    }
    getWeather(city);
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            weatherResult.innerHTML = "City not found.";
            return;
        }

        const { name, main, weather } = data;
        weatherResult.innerHTML = `
            <h2>${name}</h2>
            <p>Temperature: ${main.temp}°C</p>
            <p>Condition: ${weather[0].description}</p>
            <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Weather icon">
        `;
    } catch (error) {
        weatherResult.innerHTML = "Error fetching weather data.";
    }
}