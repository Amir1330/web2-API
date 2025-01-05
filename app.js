const express = require('express');
const app = express();
const weatherRoute = require('./routes/weather');
const newsRoute = require('./routes/news');
const currencyRoute = require('./routes/currency');
require('dotenv').config();

app.use(express.json());
app.use(express.static('public'));

app.use('/api/weather', weatherRoute);
app.use('/api/news', newsRoute);
app.use('/api/currency', currencyRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
