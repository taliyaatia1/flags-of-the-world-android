const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the "public" directory

app.get('/api/flags', async (req, res) => {
    const countryName = req.query.country;
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags');
        let countries = response.data;
        
        // Filter countries if countryName is provided
        if (countryName) {
            countries = countries.filter(country => country.name.common.toLowerCase().includes(countryName.toLowerCase()));
        }

        res.json(countries);
    } catch (error) {
        console.error('Error fetching data from REST Countries API:', error);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
