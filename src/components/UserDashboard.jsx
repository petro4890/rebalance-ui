import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Settings, 
  Key, 
  BarChart3,
  RefreshCw,
  Eye,
  EyeOff,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const UserDashboard = () => {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [showApiKeys, setShowApiKeys] = useState(false)
  const [portfolios, setPortfolios] = useState([])
  const [selectedPortfolio, setSelectedPortfolio] = useState(null)

  // Mock data
  const mockPortfolioData = [
    { name: 'Jan', value: 10000 },
    { name: 'Feb', value: 12000 },
    { name: 'Mar', value: 11500 },
    { name: 'Apr', value: 14000 },
    { name: 'May', value: 13500 },
    { name: 'Jun', value: 16000 }
  ]

  const mockAllocation = [
    { name: 'BTC', value: 40, color: '#F7931A' },
    { name: 'ETH', value: 35, color: '#627EEA' },
    { name: 'BNB', value: 15, color: '#F3BA2F' },
    { name: 'SOL', value: 10, color: '#9945FF' }
  ]

  const mockApiKeys = [
    {
      id: 1,
      exchange: 'Binance',
      name: 'Main Trading Account',
      status: 'active',
      lastUsed: '2024-07-25T10:30:00Z',
      permissions: ['read', 'trade']
    },
    {
      id: 2,
      exchange: 'Bybit',
      name: 'Secondary Account',
      status: 'inactive',
      lastUsed: '2024-07-20T15:45:00Z',
      permissions: ['read']
    }
  ]

  const mockRebalanceHistory = [
    {
      id: 1,
      date: '2024-07-25T09:15:00Z',
      type: 'Automatic',
      status: 'completed',
      transactions: 3,
      volume: 2500
    },
    {
      id: 2,
      date: '2024-07-24T14:30:00Z',
      type: 'Manual',
      status: 'completed',
      transactions: 2,
      volume: 1800
    },
    {
      id: 3,
      date: '2024-07-23T11:20:00Z',
      type: 'Automatic',
      status: 'failed',
      transactions: 0,
      volume: 0,
      error: 'Insufficient balance'
    }
  ]

  useEffect(() => {
    // Mock portfolio data
    setPortfolios([
      {
        id: 1,
        name: 'Main Portfolio',
        balance: 16000,
        profit: 6000,
        profitPercent: 60,
        lastRebalance: '2024-07-25T09:15:00Z',
        status: 'active'
      }
    ])
    setSelectedPortfolio(0)
  }, [])

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400'
      case 'inactive': return 'text-gray-400'
      case 'completed': return 'text-green-400'
      case 'failed': return 'text-red-400'
      case 'pending': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'failed': return <AlertTriangle className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      default: return null
    }
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'portfolio', name: 'Portfolio', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'rebalance', name: 'Rebalancing', icon: <RefreshCw className="w-4 h-4" /> },
    { id: 'api-keys', name: 'API Keys', icon: <Key className="w-4 h-4" /> },
    { id: 'settings', name: 'Settings', icon: <Settings className="w-4 h-4" /> }
  ]

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-400">
            Manage your crypto portfolio and rebalancing strategies
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Balance</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(16000)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Profit</p>
                <p className="text-2xl font-bold text-green-400">+{formatCurrency(6000)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Return</p>
                <p className="text-2xl font-bold text-green-400">+60%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Last Rebalance</p>
                <p className="text-sm font-semibold text-white">2 hours ago</p>
              </div>
              <RefreshCw className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-700 mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Portfolio Performance Chart */}
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Portfolio Performance</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockPortfolioData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                      <Tooltip 
                        formatter={(value) => [formatCurrency(value), 'Portfolio Value']}
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Asset Allocation */}
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Asset Allocation</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mockAllocation}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {mockAllocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Allocation']}
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {mockAllocation.map((asset, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: asset.color }}
                      />
                      <span className="text-gray-300 text-sm">{asset.name}: {asset.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              {/* Portfolio List */}
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">Your Portfolios</h3>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Portfolio
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {portfolios.map((portfolio, index) => (
                    <div key={portfolio.id} className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-lg font-semibold text-white">{portfolio.name}</h4>
                          <p className="text-gray-400 text-sm">
                            Last rebalanced: {formatDate(portfolio.lastRebalance)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-white">{formatCurrency(portfolio.balance)}</p>
                          <p className={`text-sm font-semibold ${portfolio.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {portfolio.profit >= 0 ? '+' : ''}{formatCurrency(portfolio.profit)} ({portfolio.profitPercent >= 0 ? '+' : ''}{portfolio.profitPercent}%)
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-400 border-red-400 hover:bg-red-900/20">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rebalance' && (
            <div className="space-y-6">
              {/* Rebalance Controls */}
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Rebalancing Controls</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Rebalance Now
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure Auto-Rebalance
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Strategy
                  </Button>
                </div>
              </div>

              {/* Rebalance History */}
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Rebalance History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Date</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Type</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Transactions</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Volume</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockRebalanceHistory.map((rebalance) => (
                        <tr key={rebalance.id} className="border-b border-gray-700/50">
                          <td className="py-3 px-4 text-white">{formatDate(rebalance.date)}</td>
                          <td className="py-3 px-4 text-gray-300">{rebalance.type}</td>
                          <td className="py-3 px-4">
                            <div className={`flex items-center space-x-2 ${getStatusColor(rebalance.status)}`}>
                              {getStatusIcon(rebalance.status)}
                              <span className="capitalize">{rebalance.status}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-300">{rebalance.transactions}</td>
                          <td className="py-3 px-4 text-gray-300">
                            {rebalance.volume > 0 ? formatCurrency(rebalance.volume) : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'api-keys' && (
            <div className="space-y-6">
              {/* API Keys Management */}
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">API Keys</h3>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add API Key
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {mockApiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h4 className="text-lg font-semibold text-white">{apiKey.exchange}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              apiKey.status === 'active' 
                                ? 'bg-green-900/30 text-green-400 border border-green-500/30' 
                                : 'bg-gray-900/30 text-gray-400 border border-gray-500/30'
                            }`}>
                              {apiKey.status}
                            </span>
                          </div>
                          <p className="text-gray-300 mt-1">{apiKey.name}</p>
                          <p className="text-gray-400 text-sm">
                            Last used: {formatDate(apiKey.lastUsed)}
                          </p>
                          <div className="flex space-x-2 mt-2">
                            {apiKey.permissions.map((permission) => (
                              <span key={permission} className="px-2 py-1 bg-blue-900/30 text-blue-400 text-xs rounded border border-blue-500/30">
                                {permission}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-400 border-red-400 hover:bg-red-900/20">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Account Settings */}
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-6">Account Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      value={user?.name || ''}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      readOnly
                    />
                  </div>
                  <div className="flex space-x-4">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Update Profile
                    </Button>
                    <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                      Change Password
                    </Button>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-6">Notification Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Rebalance Notifications</p>
                      <p className="text-gray-400 text-sm">Get notified when rebalancing is completed</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Price Alerts</p>
                      <p className="text-gray-400 text-sm">Get notified about significant price changes</p>
                    </div>
                    <input type="checkbox" className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Weekly Reports</p>
                      <p className="text-gray-400 text-sm">Receive weekly portfolio performance reports</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard

