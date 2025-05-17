import React, { useEffect, useRef, useState } from 'react';

// Generate initial dummy data
function generateInitialData(points = 30, start = 100) {
  let data = [];
  let price = start;
  for (let i = 0; i < points; i++) {
    price += (Math.random() - 0.5) * 2;
    data.push({
      time: new Date(Date.now() - (points - i) * 5000),
      price: parseFloat(price.toFixed(2))
    });
  }
  return data;
}

const StockChart = ({ symbol = 'AAPL' }) => {
  const [data, setData] = useState(() => generateInitialData());
  const [current, setCurrent] = useState(data[data.length - 1].price);
  const chartRef = useRef();

  // Simulate real-time updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const last = prev[prev.length - 1];
        let nextPrice = last.price + (Math.random() - 0.5) * 2;
        nextPrice = parseFloat(nextPrice.toFixed(2));
        setCurrent(nextPrice);
        return [
          ...prev.slice(1),
          { time: new Date(), price: nextPrice }
        ];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Draw chart using canvas
  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw axes
    ctx.strokeStyle = '#e9ecef';
    ctx.beginPath();
    ctx.moveTo(40, 10);
    ctx.lineTo(40, 190);
    ctx.lineTo(390, 190);
    ctx.stroke();
    // Draw line
    ctx.strokeStyle = '#3861fb';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const min = Math.min(...data.map(d => d.price));
    const max = Math.max(...data.map(d => d.price));
    for (let i = 0; i < data.length; i++) {
      const x = 40 + (i * (350 / (data.length - 1)));
      const y = 190 - ((data[i].price - min) / (max - min || 1)) * 160;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    // Draw current price
    ctx.fillStyle = '#3861fb';
    ctx.font = 'bold 16px Arial';
    ctx.fillText(`$${current}`, 320, 30);
    ctx.fillStyle = '#172b4d';
    ctx.font = '14px Arial';
    ctx.fillText(symbol, 40, 30);
  }, [data, current, symbol]);

  return (
    <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.08)', padding: 16 }}>
      <canvas ref={chartRef} width={400} height={200} style={{ width: '100%', maxWidth: 400, height: 200 }} />
      <div style={{ textAlign: 'right', color: '#6c757d', fontSize: 12, marginTop: 4 }}>
        Updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default StockChart;
