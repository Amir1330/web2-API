const axios = require('axios');

exports.getNews = async (req, res) => {
    const city = req.params.city;
    const apiKey = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/everything?q=${city}&apiKey=${apiKey}`;

    try {
        const response = await axios.get(url);
        const articles = response.data.articles;
        res.json(articles);
    } catch (error) {
        console.error('Error fetching news data:', error);
        res.status(500).json({ error: 'Unable to fetch news data' });
    }
};
