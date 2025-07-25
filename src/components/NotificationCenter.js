import React, { useState } from 'react';

export default function NotificationCenter() {
  const [notifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Ребалансировка завершена',
      message: 'Портфель успешно ребалансирован согласно целевым долям',
      time: '5 мин назад',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Отклонение от цели',
      message: 'BTC превысил целевую долю на 5%. Рекомендуется ребалансировка',
      time: '1 час назад',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Новый реферал',
      message: 'Пользователь зарегистрировался по вашей ссылке',
      time: '2 часа назад',
      read: true
    },
    {
      id: 4,
      type: 'error',
      title: 'Ошибка API',
      message: 'Не удалось получить данные с биржи. Проверьте API ключи',
      time: '3 часа назад',
      read: true
    }
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      case 'error': return '❌';
      default: return '📢';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return 'border-green-500 bg-green-500/10';
      case 'warning': return 'border-yellow-500 bg-yellow-500/10';
      case 'info': return 'border-blue-500 bg-blue-500/10';
      case 'error': return 'border-red-500 bg-red-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">🔔 Уведомления</h2>
        <button className="text-sm text-blue-400 hover:text-blue-300">
          Отметить все как прочитанные
        </button>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border-l-4 ${getNotificationColor(notification.type)} ${
              !notification.read ? 'bg-opacity-20' : 'bg-opacity-10'
            }`}
          >
            <div className="flex items-start space-x-3">
              <span className="text-lg">{getNotificationIcon(notification.type)}</span>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className={`font-medium ${!notification.read ? 'text-white' : 'text-gray-300'}`}>
                    {notification.title}
                  </h3>
                  <span className="text-xs text-gray-400">{notification.time}</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

