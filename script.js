function generateWeather() {
    const API_KEY = "a52efe20fd037580f4063666f5e1ded6";
    const city = document.getElementById("city").value;
    if (!city) {
        alert("Please enter a city name");
        return; // Add return statement to exit the function if no city is entered
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            alert("Error while fetching current weather data. Please try again later.");
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyData(data.list);
        })
        .catch(error => {
            alert("Error while fetching forecast data. Please try again later.");
        });
}

function displayWeather(data) {
    const image = document.getElementById("weather-image");
    const tempDiv = document.getElementById("temp-div");
    const weatherInfo = document.getElementById("weather-info");
    const hourlyForecast = document.getElementById("hourly-forecast");

    tempDiv.innerHTML = '';
    weatherInfo.innerHTML = '';
    hourlyForecast.innerHTML = '';

    if (data.cod == '404') {
        weatherInfo.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const imageUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `<p>${temperature}°C</p>`;

        const weatherHTML = `<p>${cityName}</p>
                             <p>${description}</p>`;

        tempDiv.innerHTML = temperatureHTML;
        weatherInfo.innerHTML = weatherHTML;
        image.src = imageUrl;
        image.alt = description;
        showImage();
    }
}

function showImage() {
    const image = document.getElementById("weather-image");
    const search = document.getElementById("search");
    image.style.display = "block";
    search.style.marginBottom = "10px";
}

function displayHourlyData(hourlyData) {
    const hourlyForecast = document.getElementById("hourly-forecast");

    const next24hrs = hourlyData.slice(0, 8);

    hourlyForecast.innerHTML = ''; // Clear previous data

    next24hrs.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const imageUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        console.log(`Hour: ${hour}, Temperature: ${temperature}°C, Icon URL: ${imageUrl}`);

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${imageUrl}">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecast.innerHTML += hourlyItemHtml;
    });
}

