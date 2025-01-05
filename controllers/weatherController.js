const axios = require('axios');

exports.getWeather = async (req, res) => {
    const city = req.params.city;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        res.json({
            temperature: data.main.temp,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            coordinates: {
                lat: data.coord.lat,
                lon: data.coord.lon
            },
            feels_like: data.main.feels_like,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind_speed: data.wind.speed,
            country_code: data.sys.country,
            rain_volume: data.rain ? data.rain['3h'] : 0
        });
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch weather data' });
    }
};
