import { ethers } from 'ethers';

const getProvider = () => {
  if (!window.ethereum) {
    throw new Error('No MetaMask found! Please install MetaMask first.');
  }
  return new ethers.BrowserProvider(window.ethereum);
};

export const connectWallet = async () => {
  try {
    const provider = getProvider();
    const accounts = await provider.send("eth_requestAccounts", []);
    return accounts[0];
  } catch (error) {
    console.error('Error connecting to MetaMask:', error);
    throw error;
  }
};

export const disconnectWallet = async () => {
  try {
    if (!window.ethereum) return;
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }]
    });
  } catch (error) {
    console.error('Error disconnecting wallet:', error);
    throw error;
  }
};