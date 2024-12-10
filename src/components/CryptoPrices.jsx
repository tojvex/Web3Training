import React, { useState, useEffect } from 'react';
import { getCryptoPrices } from '../utils/api';
import CryptoPrice from './CryptoPrice';

function CryptoPrices() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    let mounted = true;
    let intervalId = null;

    const fetchPrices = async () => {
      try {
        setLoading(true);
        const data = await getCryptoPrices();
        if (mounted) {
          setPrices(data);
          setLastUpdated(new Date());
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to fetch crypto prices. Please try again later.');
          console.error('Error fetching prices:', err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Initial fetch
    fetchPrices();

    // Set up interval for subsequent fetches
    intervalId = setInterval(fetchPrices, 30000);

    // Cleanup function
    return () => {
      mounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  if (loading && !prices.length) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Loading prices...</h2>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p className="text-red-500 mb-4">{error}</p>
        <p className="text-sm text-gray-500">
          {lastUpdated && `Last successful update: ${lastUpdated.toLocaleTimeString()}`}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Top 5 Cryptocurrencies</h2>
        {lastUpdated && (
          <span className="text-sm text-gray-500">
            Updated: {lastUpdated.toLocaleTimeString()}
          </span>
        )}
      </div>
      <div className="space-y-4">
        {prices.map((crypto) => (
          <CryptoPrice key={crypto.id} crypto={crypto} />
        ))}
      </div>
    </div>
  );
}

export default CryptoPrices;