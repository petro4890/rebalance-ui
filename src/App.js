// Rebalance UI Enhanced - React + Tailwind CSS
// Расширенный личный кабинет с полным функционалом

import React, { useState, useEffect } from 'react';
import NotificationCenter from './components/NotificationCenter';
import Analytics from './components/Analytics';

export default function App() {
  // Состояние для API
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  
  // Состояние для навигации
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Данные пользователя
  const [userData] = useState({
    referralLink: 'https://rebalance.ai/r/123456',
    trustedIP: '123.456.789.000',
    balance: '$3,250.50',
    totalProfit: '+$1,420.30',
    profitPercent: '+18.5%',
    referralEarnings: '$245.80'
  });

  // Портфель
  const [portfolio] = useState([
    { symbol: 'BTC', amount: '0.05234', value: '$3,528.45', allocation: '45%', target: '40%' },
    { symbol: 'ETH', amount: '1.2456', value: '$4,384.32', allocation: '35%', target: '35%' },
    { symbol: 'BNB', amount: '8.7543', value: '$4,552.36', allocation: '20%', target: '25%' }
  ]);

  // История транзакций
  const [transactions] = useState([
    { id: 1, type: 'buy', symbol: 'BTC', amount: '0.01234', price: '$67,420', date: '2024-07-25 14:30', status: 'completed' },
    { id: 2, type: 'sell', symbol: 'ETH', amount: '0.5678', price: '$3,520', date: '2024-07-25 12:15', status: 'completed' },
    { id: 3, type: 'rebalance', symbol: 'BNB', amount: '2.3456', price: '$520', date: '2024-07-25 10:45', status: 'pending' }
  ]);

  // Настройки ребалансировки
  const [rebalanceSettings, setRebalanceSettings] = useState({
    autoRebalance: true,
    threshold: 5,
    frequency: 'daily',
    maxSlippage: 1
  });

  // Криптовалюты с расширенной информацией
  const [cryptoPrices] = useState([
    { symbol: 'BTC', price: '$67,420', change: '+2.5%', volume: '$28.5B' },
    { symbol: 'ETH', price: '$3,520', change: '-1.2%', volume: '$15.2B' },
    { symbol: 'BNB', price: '$520', change: '+0.8%', volume: '$2.1B' },
    { symbol: 'SOL', price: '$156', change: '+5.2%', volume: '$1.8B' },
    { symbol: 'ADA', price: '$0.45', change: '-0.5%', volume: '$890M' },
    { symbol: 'XRP', price: '$0.63', change: '+1.8%', volume: '$1.2B' },
    { symbol: 'AVAX', price: '$28', change: '+3.1%', volume: '$456M' },
    { symbol: 'DOT', price: '$6.30', change: '-2.1%', volume: '$234M' },
    { symbol: 'MATIC', price: '$0.72', change: '+4.2%', volume: '$567M' },
    { symbol: 'LTC', price: '$93', change: '+1.5%', volume: '$1.1B' }
  ]);

  // Функции
  const handleSaveApiKeys = () => {
    if (apiKey && apiSecret) {
      setIsConnected(true);
      alert('API ключи успешно сохранены!');
    }
  };

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(userData.referralLink);
    alert('Реферальная ссылка скопирована!');
  };

  const handleRebalance = () => {
    alert('Запущена ребалансировка портфеля...');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Статистика */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-800 p-4 rounded-xl">
                <h3 className="text-sm text-gray-400">Общий баланс</h3>
                <p className="text-2xl font-bold text-green-400">{userData.balance}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-xl">
                <h3 className="text-sm text-gray-400">Общая прибыль</h3>
                <p className="text-2xl font-bold text-green-400">{userData.totalProfit}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-xl">
                <h3 className="text-sm text-gray-400">Доходность</h3>
                <p className="text-2xl font-bold text-green-400">{userData.profitPercent}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-xl">
                <h3 className="text-sm text-gray-400">Реферальный доход</h3>
                <p className="text-2xl font-bold text-blue-400">{userData.referralEarnings}</p>
              </div>
            </div>

            {/* Портфель */}
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Мой портфель</h2>
                <button 
                  onClick={handleRebalance}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
                >
                  🔄 Ребалансировать
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2">Актив</th>
                      <th className="text-left py-2">Количество</th>
                      <th className="text-left py-2">Стоимость</th>
                      <th className="text-left py-2">Текущая доля</th>
                      <th className="text-left py-2">Целевая доля</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolio.map((asset, index) => (
                      <tr key={index} className="border-b border-gray-700">
                        <td className="py-2 font-semibold">{asset.symbol}</td>
                        <td className="py-2">{asset.amount}</td>
                        <td className="py-2">{asset.value}</td>
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            parseFloat(asset.allocation) > parseFloat(asset.target) 
                              ? 'bg-red-500/20 text-red-400' 
                              : 'bg-green-500/20 text-green-400'
                          }`}>
                            {asset.allocation}
                          </span>
                        </td>
                        <td className="py-2">{asset.target}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'transactions':
        return (
          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">История транзакций</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2">Тип</th>
                    <th className="text-left py-2">Актив</th>
                    <th className="text-left py-2">Количество</th>
                    <th className="text-left py-2">Цена</th>
                    <th className="text-left py-2">Дата</th>
                    <th className="text-left py-2">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-gray-700">
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          tx.type === 'buy' ? 'bg-green-500/20 text-green-400' :
                          tx.type === 'sell' ? 'bg-red-500/20 text-red-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {tx.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-2 font-semibold">{tx.symbol}</td>
                      <td className="py-2">{tx.amount}</td>
                      <td className="py-2">{tx.price}</td>
                      <td className="py-2">{tx.date}</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          tx.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            {/* API Settings */}
            <div className="bg-gray-800 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Настройки API</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">API Key</label>
                  <input
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500"
                    placeholder="Введите API Key"
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                    type="password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">API Secret</label>
                  <input
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500"
                    placeholder="Введите API Secret"
                    value={apiSecret}
                    onChange={e => setApiSecret(e.target.value)}
                    type="password"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Доверенный IP: {userData.trustedIP}</p>
                    <p className="text-sm text-gray-400">
                      Статус: <span className={isConnected ? 'text-green-400' : 'text-red-400'}>
                        {isConnected ? 'Подключено' : 'Не подключено'}
                      </span>
                    </p>
                  </div>
                  <button 
                    onClick={handleSaveApiKeys}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
                  >
                    Сохранить
                  </button>
                </div>
              </div>
            </div>

            {/* Rebalance Settings */}
            <div className="bg-gray-800 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Настройки ребалансировки</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Автоматическая ребалансировка</span>
                  <button 
                    onClick={() => setRebalanceSettings({...rebalanceSettings, autoRebalance: !rebalanceSettings.autoRebalance})}
                    className={`w-12 h-6 rounded-full ${rebalanceSettings.autoRebalance ? 'bg-green-500' : 'bg-gray-600'} relative transition-colors`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${rebalanceSettings.autoRebalance ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Порог отклонения (%)</label>
                  <input
                    type="number"
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
                    value={rebalanceSettings.threshold}
                    onChange={e => setRebalanceSettings({...rebalanceSettings, threshold: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Частота проверки</label>
                  <select 
                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600"
                    value={rebalanceSettings.frequency}
                    onChange={e => setRebalanceSettings({...rebalanceSettings, frequency: e.target.value})}
                  >
                    <option value="hourly">Каждый час</option>
                    <option value="daily">Ежедневно</option>
                    <option value="weekly">Еженедельно</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'referral':
        return (
          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Партнёрская программа</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <h3 className="text-2xl font-bold text-blue-400">12</h3>
                  <p className="text-sm text-gray-400">Приглашённых пользователей</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <h3 className="text-2xl font-bold text-green-400">{userData.referralEarnings}</h3>
                  <p className="text-sm text-gray-400">Заработано</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <h3 className="text-2xl font-bold text-purple-400">15%</h3>
                  <p className="text-sm text-gray-400">Комиссия</p>
                </div>
              </div>
              <div>
                <p className="mb-2 font-medium">Ваша реферальная ссылка:</p>
                <div className="flex gap-2">
                  <code className="flex-1 bg-gray-700 p-3 rounded-lg break-all">{userData.referralLink}</code>
                  <button 
                    onClick={handleCopyReferralLink}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    📋 Копировать
                  </button>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Условия программы:</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• 15% от комиссий приглашённых пользователей</li>
                  <li>• Выплаты каждую неделю</li>
                  <li>• Минимальная сумма для вывода: $10</li>
                  <li>• Бонус $5 за каждого активного реферала</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return <Analytics />;

      case 'notifications':
        return <NotificationCenter />;

      case 'market':
        return (
          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Рыночные данные</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2">Актив</th>
                    <th className="text-left py-2">Цена</th>
                    <th className="text-left py-2">Изменение 24ч</th>
                    <th className="text-left py-2">Объём</th>
                    <th className="text-left py-2">Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {cryptoPrices.map((crypto, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="py-3 font-semibold">{crypto.symbol}</td>
                      <td className="py-3">{crypto.price}</td>
                      <td className="py-3">
                        <span className={`${crypto.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {crypto.change}
                        </span>
                      </td>
                      <td className="py-3 text-gray-400">{crypto.volume}</td>
                      <td className="py-3">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs">
                          Торговать
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">🔁 Rebalance Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <span className="text-gray-400">Баланс: </span>
              <span className="text-green-400 font-semibold">{userData.balance}</span>
            </div>
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <nav className="w-64 bg-gray-800 min-h-screen p-4">
          <ul className="space-y-2">
            {[
              { id: 'dashboard', label: '📊 Дашборд', icon: '📊' },
              { id: 'transactions', label: '📋 Транзакции', icon: '📋' },
              { id: 'analytics', label: '📈 Аналитика', icon: '📈' },
              { id: 'notifications', label: '🔔 Уведомления', icon: '🔔' },
              { id: 'settings', label: '⚙️ Настройки', icon: '⚙️' },
              { id: 'referral', label: '🤝 Рефералы', icon: '🤝' },
              { id: 'market', label: '💹 Рынок', icon: '💹' }
            ].map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}

