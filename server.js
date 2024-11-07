import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/geonames/findNearby', async (req, res) => {
  const { lat, lng, radius, maxRows, username } = req.query;
  const url = `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lng}&radius=${radius}&maxRows=${maxRows}&username=${username}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar dados do GeoNames' });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Proxy server rodando na porta ${PORT}`));