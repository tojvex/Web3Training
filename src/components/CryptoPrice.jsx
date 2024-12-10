import React from 'react';

function CryptoPrice({ crypto }) {
  if (!crypto || typeof crypto !== 'object') {
    return null;
  }

  return (
    <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
      <div className="flex items-center">
        <img 
          src={crypto.image} 
          alt={crypto.name} 
          className="w-8 h-8 mr-2"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+PHBhdGggZD0iTTkuMDkgOWEzIDMgMCAwIDEgNS44MyAxYzAgMi0zIDMtMyAzIi8+PGxpbmUgeDE9IjEyIiB5MT0iMTciIHgyPSIxMi4wMSIgeTI9IjE3Ii8+PC9zdmc+'
          }}
        />
        <div>
          <span className="font-medium">{crypto.name}</span>
          <span className="text-gray-500 text-sm ml-2">{crypto.symbol.toUpperCase()}</span>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold">${typeof crypto.current_price === 'number' ? crypto.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}</div>
        <div className={`text-sm ${Number(crypto.price_change_24h) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {typeof crypto.price_change_percentage_24h === 'number' ? `${crypto.price_change_percentage_24h.toFixed(2)}%` : '0.00%'}
        </div>
      </div>
    </div>
  );
}

export default CryptoPrice;