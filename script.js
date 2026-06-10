const apiKey = `92a6009ea355d30ef9216612bf9140b6`;

const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity-percent");
const visibility = document.querySelector(".visibility-distance");
const descriptionText = document.querySelector(".description-text");
const day_date = document.querySelector(".day-date");
const descriptionIcon = document.querySelector(".description i");
const errorMessage = document.querySelector(".error-message");
const body = document.getElementById("weather-body");

/* Loader */
window.addEventListener("load", () => {
    document.getElementById("loader").style.display = "none";
});

async function fetchWeatherData(city) {

    try {

        errorMessage.innerHTML = "";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        updateWeatherUI(data);

    } catch (err) {

        errorMessage.innerHTML = err.message;
    }
}

function updateWeatherUI(data) {

    cityElement.innerHTML = data.name;
    temperature.innerHTML = `${Math.round(data.main.temp)}°`;
    windSpeed.innerHTML = `${Math.round(data.wind.speed)} KM/H`;
    humidity.innerHTML = `${data.main.humidity}%`;
    visibility.innerHTML = `${data.visibility / 1000} KM`;
    descriptionText.innerHTML = data.weather[0].description;

    const currentDate = new Date();
    day_date.innerHTML = currentDate.toDateString();

    const weatherMain = data.weather[0].main;

    const weatherIconName = getWeatherIconName(weatherMain);
    descriptionIcon.innerHTML = weatherIconName;

    changeBackground(weatherMain);
}

function getWeatherIconName(condition) {

    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "cloud",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud"
    };

    return iconMap[condition] || "help";
}

function changeBackground(condition){

    switch(condition){

        case "Clear":
            body.style.background = "#4facfe";
            break;

        case "Clouds":
            body.style.background = "#757f9a";
            break;

        case "Rain":
            body.style.background = "#314755";
            break;

        case "Snow":
            body.style.background = "#83a4d4";
            break;

        default:
            body.style.background = "#063b5c";
    }
}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener("submit", function(e){

    e.preventDefault();

    const city = inputElement.value.trim();

    if(city !== ""){
        fetchWeatherData(city);
        inputElement.value = "";
    }
});

/* Default City */
fetchWeatherData("Delhi");

