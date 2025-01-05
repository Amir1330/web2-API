const axios = require('axios');

exports.getCurrency = async (req, res) => {
    const city = req.params.city;
    const apiKey = process.env.CURRENCY_API_KEY;
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    try {
        const response = await axios.get(url);
        const rates = response.data.conversion_rates;
        res.json(rates);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch currency data' });
    }
};
