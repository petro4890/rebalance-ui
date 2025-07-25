import React, { useState } from 'react';

export default function Analytics() {
  const [timeframe, setTimeframe] = useState('7d');
  
  const performanceData = {
    '24h': { profit: '+$45.20', percentage: '+1.4%', color: 'text-green-400' },
    '7d': { profit: '+$312.80', percentage: '+9.6%', color: 'text-green-400' },
    '30d': { profit: '+$1,420.30', percentage: '+18.5%', color: 'text-green-400' },
    '1y': { profit: '+$8,950.60', percentage: '+275.2%', color: 'text-green-400' }
  };

  const portfolioHistory = [
    { date: '2024-07-18', value: 12500 },
    { date: '2024-07-19', value: 12750 },
    { date: '2024-07-20', value: 12400 },
    { date: '2024-07-21', value: 12900 },
    { date: '2024-07-22', value: 13200 },
    { date: '2024-07-23', value: 13100 },
    { date: '2024-07-24', value: 13450 },
    { date: '2024-07-25', value: 13650 }
  ];

  const rebalanceHistory = [
    { date: '2024-07-25', action: 'Продажа BTC', amount: '0.01234', reason: 'Превышение целевой доли' },
    { date: '2024-07-24', action: 'Покупка ETH', amount: '0.5678', reason: 'Недостаток в портфеле' },
    { date: '2024-07-23', action: 'Покупка BNB', amount: '2.3456', reason: 'Ребалансировка' },
    { date: '2024-07-22', action: 'Продажа SOL', amount: '15.789', reason: 'Превышение целевой доли' }
  ];

  const SimpleChart = ({ data, height = 200 }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const range = maxValue - minValue;
    
    return (
      <div className="relative" style={{ height }}>
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
            <line
              key={i}
              x1="0"
              y1={height * ratio}
              x2="100%"
              y2={height * ratio}
              stroke="#374151"
              strokeWidth="1"
              opacity="0.3"
            />
          ))}
          
          {/* Chart line */}
          <polyline
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            points={data.map((point, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = height - ((point.value - minValue) / range) * height;
              return `${x}%,${y}`;
            }).join(' ')}
          />
          
          {/* Fill area */}
          <polygon
            fill="url(#gradient)"
            points={`0,${height} ${data.map((point, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = height - ((point.value - minValue) / range) * height;
              return `${x}%,${y}`;
            }).join(' ')} 100%,${height}`}
          />
          
          {/* Data points */}
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = height - ((point.value - minValue) / range) * height;
            return (
              <circle
                key={index}
                cx={`${x}%`}
                cy={y}
                r="3"
                fill="#3B82F6"
                className="hover:r-4 transition-all"
              />
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">📈 Производительность портфеля</h2>
          <div className="flex space-x-2">
            {['24h', '7d', '30d', '1y'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-3 py-1 rounded text-sm ${
                  timeframe === period 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <p className="text-sm text-gray-400">Прибыль за {timeframe}</p>
              <p className={`text-2xl font-bold ${performanceData[timeframe].color}`}>
                {performanceData[timeframe].profit}
              </p>
              <p className={`text-lg ${performanceData[timeframe].color}`}>
                {performanceData[timeframe].percentage}
              </p>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Лучший день:</span>
                <span className="text-green-400">+$245.60 (+1.8%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Худший день:</span>
                <span className="text-red-400">-$89.30 (-0.7%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Волатильность:</span>
                <span className="text-yellow-400">12.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Коэф. Шарпа:</span>
                <span className="text-blue-400">1.85</span>
              </div>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-400 mb-2">График стоимости портфеля</p>
            <SimpleChart data={portfolioHistory} />
          </div>
        </div>
      </div>

      {/* Rebalance History */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">🔄 История ребалансировок</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2">Дата</th>
                <th className="text-left py-2">Действие</th>
                <th className="text-left py-2">Количество</th>
                <th className="text-left py-2">Причина</th>
              </tr>
            </thead>
            <tbody>
              {rebalanceHistory.map((item, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-3">{item.date}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.action.includes('Покупка') 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {item.action}
                    </span>
                  </td>
                  <td className="py-3 font-mono">{item.amount}</td>
                  <td className="py-3 text-gray-400">{item.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">⚠️ Метрики риска</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-sm text-gray-400 mb-2">VaR (95%)</h3>
            <p className="text-xl font-bold text-red-400">-$456.20</p>
            <p className="text-xs text-gray-400">Максимальные потери за день</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-sm text-gray-400 mb-2">Максимальная просадка</h3>
            <p className="text-xl font-bold text-orange-400">-8.5%</p>
            <p className="text-xs text-gray-400">Наибольшее падение от пика</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-sm text-gray-400 mb-2">Бета коэффициент</h3>
            <p className="text-xl font-bold text-blue-400">0.85</p>
            <p className="text-xs text-gray-400">Корреляция с рынком</p>
          </div>
        </div>
      </div>
    </div>
  );
}

