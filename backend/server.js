const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

const openWeatherApiKey = 'DEIN_OPENWEATHERMAP_API_KEY'; // Ersetze mit deinem echten API-Schlüssel
const newsApiKey = 'DEIN_NEWSAPI_API_KEY'; // Ersetze mit deinem echten API-Schlüssel

// Route für Wetterdaten
app.get('/api/weather', async (req, res) => {
    const city = req.query.city || 'Berlin';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=metric`;

    try {
        const response = await axios.get(weatherUrl);
        res.json(response.data);
    } catch (error) {
        console.error('Fehler beim Abrufen der Wetterdaten:', error.message); // Fehlerprotokollierung
        res.status(500).json({ error: 'Fehler beim Abrufen der Wetterdaten' });
    }
});

// Route für Nachrichten
app.get('/api/news', async (req, res) => {
    const newsUrl = `https://newsapi.org/v2/top-headlines?country=de&apiKey=${newsApiKey}`;

    try {
        const response = await axios.get(newsUrl);
        res.json(response.data);
    } catch (error) {
        console.error('Fehler beim Abrufen der Nachrichten:', error.message); // Fehlerprotokollierung
        res.status(500).json({ error: 'Fehler beim Abrufen der Nachrichten' });
    }
});

// Server starten
app.listen(PORT, () => {
    console.log(`Backend läuft auf http://localhost:${PORT}`);
});
