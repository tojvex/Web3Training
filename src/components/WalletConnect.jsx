import React, { useState } from 'react';
import { connectWallet, disconnectWallet } from '../utils/wallet';

function WalletConnect() {
  const [account, setAccount] = useState('');
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async () => {
    try {
      setConnecting(true);
      const address = await connectWallet();
      setAccount(address);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
      setAccount('');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Wallet Connection</h2>
      {!account ? (
        <button
          onClick={handleConnect}
          disabled={connecting}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          {connecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div>
          <p className="mb-4">
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </p>
          <button
            onClick={handleDisconnect}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

export default WalletConnect;