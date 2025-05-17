import React, { useState } from 'react';
import { placeTrade } from '../../services/ibApiService';

const TradeForm = () => {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState('market');
  const [limitPrice, setLimitPrice] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const tradeData = {
        symbol,
        quantity: parseFloat(quantity),
        orderType,
        limitPrice: orderType === 'limit' ? parseFloat(limitPrice) : undefined
      };
      const response = await placeTrade(tradeData);
      setResult(response);
    } catch (err) {
      setResult({ success: false, message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Place a Trade</h2>
      <div>
        <label>Stock Symbol:</label>
        <input
          type="text"
          value={symbol}
          onChange={e => setSymbol(e.target.value.toUpperCase())}
          required
        />
      </div>
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Order Type:</label>
        <select value={orderType} onChange={e => setOrderType(e.target.value)}>
          <option value="market">Market</option>
          <option value="limit">Limit</option>
        </select>
      </div>
      {orderType === 'limit' && (
        <div>
          <label>Limit Price:</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={limitPrice}
            onChange={e => setLimitPrice(e.target.value)}
            required={orderType === 'limit'}
          />
        </div>
      )}
      <button type="submit" disabled={loading} style={{ marginTop: 16 }}>
        {loading ? 'Placing Trade...' : 'Place Trade'}
      </button>
      {result && (
        <div style={{ marginTop: 16, color: result.success ? 'green' : 'red' }}>
          {result.message}
        </div>
      )}
    </form>
  );
};

export default TradeForm;
