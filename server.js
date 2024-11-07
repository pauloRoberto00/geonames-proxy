import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: 'https://cuida-lar.vercel.app',
  methods: ['GET']
}));

app.get('/geonames/findNearby', async (req, res) => {
  const { lat, lng, radius, maxRows, username } = req.query;
  const url = `http://api.geonames.org/findNearbyPlaceNameJSON`;

  try {
    const response = await axios.get(url, {
      params: {
        lat: lat,
        lng: lng,
        username: username,
        radius: radius,
        maxRows: maxRows,
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar dados do GeoNames' });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Proxy server rodando na porta ${PORT}`));