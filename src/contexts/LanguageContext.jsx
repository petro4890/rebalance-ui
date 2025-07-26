import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

const translations = {
  en: {
    // Header
    home: 'Home',
    calculator: 'Calculator',
    login: 'Login',
    register: 'Register',
    dashboard: 'Dashboard',
    
    // Landing page
    heroTitle: 'Smart Crypto Portfolio Rebalancing',
    heroSubtitle: 'Maximize your returns with automated rebalancing. Keep your funds safe on your exchange account.',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    
    // Features
    featuresTitle: 'Why Choose Rebalancing?',
    feature1Title: 'Funds Stay Safe',
    feature1Desc: 'Your money never leaves your exchange account. We only connect via API.',
    feature2Title: 'Automated Trading',
    feature2Desc: 'Set your target allocation and let our algorithms do the work.',
    feature3Title: 'Supported Exchanges',
    feature3Desc: 'Works with Binance and Bybit. More exchanges coming soon.',
    
    // Calculator
    calculatorTitle: 'Rebalancing vs Holding Calculator',
    calculatorDesc: 'See the difference between holding and rebalancing your portfolio',
    initialAmount: 'Initial Amount ($)',
    timeframe: 'Timeframe (months)',
    rebalanceFreq: 'Rebalance Frequency',
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    calculate: 'Calculate',
    holdingResult: 'Holding Result',
    rebalancingResult: 'Rebalancing Result',
    difference: 'Difference',
    
    // Auth
    email: 'Email',
    phone: 'Phone',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    loginTitle: 'Login to Your Account',
    registerTitle: 'Create New Account',
    loginWith: 'Login with',
    registerWith: 'Register with',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    
    // Dashboard
    portfolio: 'Portfolio',
    balance: 'Balance',
    profit: 'Profit',
    settings: 'Settings',
    apiKeys: 'API Keys',
    rebalanceSettings: 'Rebalance Settings',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success'
  },
  ru: {
    // Header
    home: 'Главная',
    calculator: 'Калькулятор',
    login: 'Вход',
    register: 'Регистрация',
    dashboard: 'Панель',
    
    // Landing page
    heroTitle: 'Умная ребалансировка криптопортфеля',
    heroSubtitle: 'Максимизируйте доходность с автоматической ребалансировкой. Ваши средства остаются в безопасности на бирже.',
    getStarted: 'Начать',
    learnMore: 'Узнать больше',
    
    // Features
    featuresTitle: 'Почему стоит выбрать ребалансировку?',
    feature1Title: 'Средства в безопасности',
    feature1Desc: 'Ваши деньги никогда не покидают биржевой счет. Подключение только через API.',
    feature2Title: 'Автоматическая торговля',
    feature2Desc: 'Установите целевое распределение и позвольте алгоритмам работать.',
    feature3Title: 'Поддерживаемые биржи',
    feature3Desc: 'Работает с Binance и Bybit. Скоро добавим больше бирж.',
    
    // Calculator
    calculatorTitle: 'Калькулятор: Ребалансировка vs Холдинг',
    calculatorDesc: 'Посмотрите разницу между холдингом и ребалансировкой портфеля',
    initialAmount: 'Начальная сумма ($)',
    timeframe: 'Период (месяцы)',
    rebalanceFreq: 'Частота ребалансировки',
    daily: 'Ежедневно',
    weekly: 'Еженедельно',
    monthly: 'Ежемесячно',
    calculate: 'Рассчитать',
    holdingResult: 'Результат холдинга',
    rebalancingResult: 'Результат ребалансировки',
    difference: 'Разница',
    
    // Auth
    email: 'Email',
    phone: 'Телефон',
    password: 'Пароль',
    confirmPassword: 'Подтвердите пароль',
    loginTitle: 'Вход в аккаунт',
    registerTitle: 'Создать новый аккаунт',
    loginWith: 'Войти через',
    registerWith: 'Зарегистрироваться через',
    alreadyHaveAccount: 'Уже есть аккаунт?',
    dontHaveAccount: 'Нет аккаунта?',
    
    // Dashboard
    portfolio: 'Портфель',
    balance: 'Баланс',
    profit: 'Прибыль',
    settings: 'Настройки',
    apiKeys: 'API ключи',
    rebalanceSettings: 'Настройки ребалансировки',
    
    // Common
    save: 'Сохранить',
    cancel: 'Отмена',
    loading: 'Загрузка...',
    error: 'Ошибка',
    success: 'Успешно'
  }
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = (key) => {
    return translations[language][key] || key
  }

  const value = {
    language,
    setLanguage,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

