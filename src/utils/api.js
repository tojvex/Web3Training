import axios from 'axios';

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

// Create axios instance with default config
const api = axios.create({
  baseURL: COINGECKO_API_BASE,
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

export const getCryptoPrices = async () => {
  try {
    console.log('Fetching crypto prices...');
    const response = await api.get('/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 5,
        page: 1,
        sparkline: false,
        locale: 'en',
        precision: 2
      }
    });

    console.log('API Response:', response.data);

    if (!response.data || !Array.isArray(response.data)) {
      console.error('Invalid API response format:', response.data);
      return [];
    }

    return response.data.map(coin => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      current_price: Number(coin.current_price) || 0,
      price_change_24h: Number(coin.price_change_24h) || 0,
      price_change_percentage_24h: Number(coin.price_change_percentage_24h) || 0,
      image: coin.image
    }));
  } catch (error) {
    if (error.response) {
      console.error('API Error Response:', error.response.data);
      console.error('API Error Status:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};