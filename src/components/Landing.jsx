import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useLanguage } from '../contexts/LanguageContext'
import { 
  Shield, 
  Zap, 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  Lock,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

const Landing = () => {
  const { t } = useLanguage()

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-400" />,
      title: t('feature1Title'),
      description: t('feature1Desc')
    },
    {
      icon: <Zap className="w-8 h-8 text-green-400" />,
      title: t('feature2Title'),
      description: t('feature2Desc')
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-400" />,
      title: t('feature3Title'),
      description: t('feature3Desc')
    }
  ]

  const advantages = [
    {
      title: 'Higher Returns',
      description: 'Rebalancing can increase returns by 1-3% annually compared to holding',
      icon: <TrendingUp className="w-6 h-6 text-green-400" />
    },
    {
      title: 'Risk Management',
      description: 'Automatically sell high and buy low, reducing portfolio volatility',
      icon: <BarChart3 className="w-6 h-6 text-blue-400" />
    },
    {
      title: 'Discipline',
      description: 'Remove emotions from trading with systematic approach',
      icon: <CheckCircle className="w-6 h-6 text-purple-400" />
    },
    {
      title: 'Time Saving',
      description: 'Set it once and let automation handle the rest',
      icon: <Zap className="w-6 h-6 text-yellow-400" />
    }
  ]

  const exchanges = [
    {
      name: 'Binance',
      logo: '🟡',
      description: 'World\'s largest crypto exchange'
    },
    {
      name: 'Bybit',
      logo: '🟠',
      description: 'Leading derivatives exchange'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  {t('getStarted')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/calculator">
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  {t('learnMore')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('featuresTitle')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-900 p-8 rounded-xl border border-gray-700">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rebalancing vs Holding Comparison */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Rebalancing vs Holding
            </h2>
            <p className="text-xl text-gray-300">
              See why rebalancing outperforms simple holding strategy
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Holding Strategy */}
            <div className="bg-red-900/20 border border-red-500/30 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-red-400 mb-6">📉 Holding Strategy</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">❌</span>
                  <span className="text-gray-300">Portfolio allocation drifts over time</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">❌</span>
                  <span className="text-gray-300">Miss opportunities to buy low, sell high</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">❌</span>
                  <span className="text-gray-300">Emotional decision making</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">❌</span>
                  <span className="text-gray-300">Higher volatility and risk</span>
                </li>
              </ul>
            </div>

            {/* Rebalancing Strategy */}
            <div className="bg-green-900/20 border border-green-500/30 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-green-400 mb-6">📈 Rebalancing Strategy</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✅</span>
                  <span className="text-gray-300">Maintains target allocation automatically</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✅</span>
                  <span className="text-gray-300">Systematically buys low, sells high</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✅</span>
                  <span className="text-gray-300">Removes emotions from trading</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✅</span>
                  <span className="text-gray-300">Lower volatility, higher returns</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/calculator">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Try Our Calculator
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Rebalancing Works
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-xl border border-gray-700 text-center">
                <div className="mb-4 flex justify-center">{advantage.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{advantage.title}</h3>
                <p className="text-gray-400 text-sm">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Exchanges */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Supported Exchanges
            </h2>
            <p className="text-xl text-gray-300">
              Connect your existing exchange accounts via secure API
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {exchanges.map((exchange, index) => (
              <div key={index} className="bg-gray-800 p-8 rounded-xl border border-gray-700 text-center">
                <div className="text-6xl mb-4">{exchange.logo}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{exchange.name}</h3>
                <p className="text-gray-400">{exchange.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">More exchanges coming soon...</p>
            <div className="flex justify-center space-x-4 opacity-50">
              <span className="text-2xl">🔵</span>
              <span className="text-2xl">🟣</span>
              <span className="text-2xl">🔴</span>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Lock className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your Security is Our Priority
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">API Only</h3>
              <p className="text-gray-400">We never store your funds. Only API access for trading.</p>
            </div>
            <div className="text-center">
              <Lock className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Encrypted Storage</h3>
              <p className="text-gray-400">All API keys are encrypted with military-grade security.</p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Read-Only Option</h3>
              <p className="text-gray-400">Start with read-only access to monitor your portfolio.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Rebalancing?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who are already maximizing their crypto returns
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/calculator">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Try Calculator
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing

