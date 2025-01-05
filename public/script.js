document.addEventListener('DOMContentLoaded', () => {
    const cityForm = document.getElementById('cityForm');
    cityForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const city = document.getElementById('city').value.trim();

        if (!city) {
            alert('Please enter a city name.');
            return;
        }

        console.log(`Fetching weather data for: ${city}`);

        try {
            // Fetch weather data
            const weatherResponse = await fetch(`/api/weather/${city}`);
            const weatherData = await weatherResponse.json();
            console.log('Weather Data:', weatherData);
            displayWeatherData(weatherData);
            displayMap(weatherData.coordinates.lat, weatherData.coordinates.lon);

            // Fetch news data
            const newsResponse = await fetch(`/api/news/${city}`);
            const newsData = await newsResponse.json();
            if (newsData.error) {
                console.error('News Data Error:', newsData.error);
                alert('Unable to fetch news data.');
            } else {
                console.log('News Data:', newsData);
                displayNewsData(newsData);
            }

            // Fetch currency data
            const currencyResponse = await fetch(`/api/currency/${city}`);
            const currencyData = await currencyResponse.json();
            console.log('Currency Data:', currencyData);
            displayCurrencyData(currencyData);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('An error occurred while fetching data. Please try again.');
        }
    });
});

function displayWeatherData(data) {
    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = `
        <h3>Weather in ${data.city}</h3>
        <p>Temperature: ${data.temperature}°C</p>
        <p>Description: ${data.description}</p>
        <p>Feels Like: ${data.feels_like}°C</p>
        <p>Humidity: ${data.humidity}%</p>
        <p>Pressure: ${data.pressure} hPa</p>
        <p>Wind Speed: ${data.wind_speed} m/s</p>
        <p>Country Code: ${data.country_code}</p>
        <p>Rain Volume (last 3 hours): ${data.rain_volume} mm</p>
        <img src="http://openweathermap.org/img/wn/${data.icon}.png" alt="Weather Icon">
    `;
}

function displayMap(lat, lon) {
    const mapDiv = document.getElementById('map');
    mapDiv.innerHTML = ''; // Clear existing map

    const map = L.map('map').setView([lat, lon], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map)
        .bindPopup('Weather location')
        .openPopup();
}

function displayNewsData(articles) {
    const newsDiv = document.getElementById('news');
    newsDiv.innerHTML = '<h3>Local News</h3>';
    if (Array.isArray(articles)) {
        articles.forEach(article => {
            newsDiv.innerHTML += `
                <div class="news-article">
                    <h4>${article.title}</h4>
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                </div>
            `;
        });
    } else {
        newsDiv.innerHTML = '<p>No news articles available.</p>';
    }
}

function displayCurrencyData(rates) {
    const currencyDiv = document.getElementById('currency');
    currencyDiv.innerHTML = '<h3>Currency Rates</h3>';
    for (const [currency, rate] of Object.entries(rates)) {
        currencyDiv.innerHTML += `<p>${currency}: ${rate}</p>`;
    }
}
