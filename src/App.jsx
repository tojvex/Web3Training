import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CryptoPrices from './components/CryptoPrices';
import WalletConnect from './components/WalletConnect';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Hero />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <CryptoPrices />
          <WalletConnect />
        </div>
      </main>
    </div>
  );
}

export default App;