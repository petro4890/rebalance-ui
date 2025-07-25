// Rebalance UI MVP - React + Tailwind CSS
// Структура: Landing + Личный кабинет + Подключение API + Партнёрская программа

import React, { useState } from 'react';

export default function App() {
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [referralLink] = useState('https://rebalance.ai/r/123456');
  const [trustedIP] = useState('123.456.789.000');
  const [balance] = useState('$3,250.50');

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6 font-sans">
      <h1 className="text-3xl font-bold mb-4">🔁 Rebalance Dashboard</h1>

      {/* API Key Connection */}
      <div className="bg-gray-800 p-4 rounded-xl mb-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Подключение API ключей</h2>
        <input
          className="w-full mb-2 p-2 rounded bg-gray-700"
          placeholder="API Key"
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
        />
        <input
          className="w-full mb-2 p-2 rounded bg-gray-700"
          placeholder="API Secret"
          value={apiSecret}
          onChange={e => setApiSecret(e.target.value)}
        />
        <p className="text-sm text-gray-400">Доверенный IP: {trustedIP}</p>
        <button className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          Сохранить ключи
        </button>
      </div>

      {/* Balance Section */}
      <div className="bg-gray-800 p-4 rounded-xl mb-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Баланс аккаунта</h2>
        <p className="text-2xl">{balance}</p>
      </div>

      {/* Partner Program */}
      <div className="bg-gray-800 p-4 rounded-xl mb-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Партнёрская программа</h2>
        <p className="mb-2">Ваша реферальная ссылка:</p>
        <code className="block bg-gray-700 p-2 rounded mb-2 break-all">{referralLink}</code>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Скопировать ссылку
        </button>
      </div>

      {/* Top 10 Crypto */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Курсы топ-10 монет</h2>
        <ul className="grid grid-cols-2 gap-4 text-sm">
          <li>BTC: $67,420</li>
          <li>ETH: $3,520</li>
          <li>BNB: $520</li>
          <li>SOL: $156</li>
          <li>ADA: $0.45</li>
          <li>XRP: $0.63</li>
          <li>AVAX: $28</li>
          <li>DOT: $6.30</li>
          <li>MATIC: $0.72</li>
          <li>LTC: $93</li>
        </ul>
      </div>
    </div>
  );
}
