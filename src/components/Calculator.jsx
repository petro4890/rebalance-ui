import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '../contexts/LanguageContext'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Calculator as CalcIcon, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'

const Calculator = () => {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    initialAmount: 10000,
    timeframe: 12,
    rebalanceFreq: 'weekly'
  })
  const [results, setResults] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const simulatePortfolioPerformance = (rebalance = false) => {
    const { initialAmount, timeframe, rebalanceFreq } = formData
    const data = []
    let portfolioValue = initialAmount
    
    // Simulate crypto allocation: 40% BTC, 35% ETH, 25% ALT
    let btcAllocation = 0.4
    let ethAllocation = 0.35
    let altAllocation = 0.25
    
    const targetBtc = 0.4
    const targetEth = 0.35
    const targetAlt = 0.25
    
    // Simulate monthly price changes (more volatile for crypto)
    const generatePriceChange = () => ({
      btc: (Math.random() - 0.5) * 0.4, // -20% to +20% monthly
      eth: (Math.random() - 0.5) * 0.5, // -25% to +25% monthly
      alt: (Math.random() - 0.5) * 0.6  // -30% to +30% monthly
    })
    
    for (let month = 0; month <= timeframe; month++) {
      if (month === 0) {
        data.push({
          month,
          value: portfolioValue,
          btcValue: portfolioValue * btcAllocation,
          ethValue: portfolioValue * ethAllocation,
          altValue: portfolioValue * altAllocation
        })
        continue
      }
      
      // Generate price changes
      const priceChanges = generatePriceChange()
      
      // Calculate new values based on price changes
      let btcValue = data[month - 1].btcValue * (1 + priceChanges.btc)
      let ethValue = data[month - 1].ethValue * (1 + priceChanges.eth)
      let altValue = data[month - 1].altValue * (1 + priceChanges.alt)
      
      portfolioValue = btcValue + ethValue + altValue
      
      // Update allocations
      btcAllocation = btcValue / portfolioValue
      ethAllocation = ethValue / portfolioValue
      altAllocation = altValue / portfolioValue
      
      // Rebalancing logic
      if (rebalance) {
        const shouldRebalance = 
          (rebalanceFreq === 'weekly' && month % 0.25 === 0) ||
          (rebalanceFreq === 'monthly' && month % 1 === 0) ||
          (rebalanceFreq === 'daily' && true) ||
          Math.abs(btcAllocation - targetBtc) > 0.05 ||
          Math.abs(ethAllocation - targetEth) > 0.05 ||
          Math.abs(altAllocation - targetAlt) > 0.05
        
        if (shouldRebalance) {
          // Rebalance to target allocations
          btcValue = portfolioValue * targetBtc
          ethValue = portfolioValue * targetEth
          altValue = portfolioValue * targetAlt
          
          btcAllocation = targetBtc
          ethAllocation = targetEth
          altAllocation = targetAlt
          
          // Small fee for rebalancing (0.1%)
          portfolioValue *= 0.999
          btcValue *= 0.999
          ethValue *= 0.999
          altValue *= 0.999
        }
      }
      
      data.push({
        month,
        value: portfolioValue,
        btcValue,
        ethValue,
        altValue
      })
    }
    
    return {
      finalValue: portfolioValue,
      data: data,
      totalReturn: ((portfolioValue - initialAmount) / initialAmount) * 100,
      maxDrawdown: calculateMaxDrawdown(data)
    }
  }
  
  const calculateMaxDrawdown = (data) => {
    let maxDrawdown = 0
    let peak = data[0].value
    
    for (let point of data) {
      if (point.value > peak) {
        peak = point.value
      }
      const drawdown = ((peak - point.value) / peak) * 100
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown
      }
    }
    
    return maxDrawdown
  }

  const calculateResults = async () => {
    setIsCalculating(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const holdingResults = simulatePortfolioPerformance(false)
    const rebalancingResults = simulatePortfolioPerformance(true)
    
    // Combine data for chart
    const chartData = holdingResults.data.map((point, index) => ({
      month: point.month,
      holding: point.value,
      rebalancing: rebalancingResults.data[index].value
    }))
    
    setResults({
      holding: holdingResults,
      rebalancing: rebalancingResults,
      chartData,
      difference: rebalancingResults.finalValue - holdingResults.finalValue,
      differencePercent: ((rebalancingResults.finalValue - holdingResults.finalValue) / holdingResults.finalValue) * 100
    })
    
    setIsCalculating(false)
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatPercent = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <CalcIcon className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('calculatorTitle')}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('calculatorDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Calculator Settings</h2>
              
              <div className="space-y-6">
                {/* Initial Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('initialAmount')}
                  </label>
                  <input
                    type="number"
                    value={formData.initialAmount}
                    onChange={(e) => handleInputChange('initialAmount', parseInt(e.target.value) || 0)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    min="1000"
                    max="1000000"
                    step="1000"
                  />
                </div>

                {/* Timeframe */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('timeframe')}
                  </label>
                  <input
                    type="range"
                    value={formData.timeframe}
                    onChange={(e) => handleInputChange('timeframe', parseInt(e.target.value))}
                    className="w-full"
                    min="3"
                    max="36"
                    step="3"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-1">
                    <span>3 months</span>
                    <span className="font-semibold text-blue-400">{formData.timeframe} months</span>
                    <span>36 months</span>
                  </div>
                </div>

                {/* Rebalance Frequency */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('rebalanceFreq')}
                  </label>
                  <select
                    value={formData.rebalanceFreq}
                    onChange={(e) => handleInputChange('rebalanceFreq', e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="daily">{t('daily')}</option>
                    <option value="weekly">{t('weekly')}</option>
                    <option value="monthly">{t('monthly')}</option>
                  </select>
                </div>

                {/* Calculate Button */}
                <Button
                  onClick={calculateResults}
                  disabled={isCalculating}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                  size="lg"
                >
                  {isCalculating ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Calculating...
                    </div>
                  ) : (
                    t('calculate')
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            {results ? (
              <div className="space-y-6">
                {/* Chart */}
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4">Portfolio Performance</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={results.chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                          dataKey="month" 
                          stroke="#9CA3AF"
                          label={{ value: 'Months', position: 'insideBottom', offset: -10 }}
                        />
                        <YAxis 
                          stroke="#9CA3AF"
                          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip 
                          formatter={(value) => [formatCurrency(value), '']}
                          labelFormatter={(label) => `Month ${label}`}
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="holding" 
                          stroke="#EF4444" 
                          strokeWidth={2}
                          name="Holding Strategy"
                          dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="rebalancing" 
                          stroke="#10B981" 
                          strokeWidth={2}
                          name="Rebalancing Strategy"
                          dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Results Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Holding Results */}
                  <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-xl">
                    <div className="flex items-center mb-4">
                      <TrendingDown className="w-6 h-6 text-red-400 mr-2" />
                      <h3 className="text-xl font-bold text-red-400">{t('holdingResult')}</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Final Value:</span>
                        <span className="text-white font-semibold">{formatCurrency(results.holding.finalValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Total Return:</span>
                        <span className={`font-semibold ${results.holding.totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {formatPercent(results.holding.totalReturn)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Max Drawdown:</span>
                        <span className="text-red-400 font-semibold">-{results.holding.maxDrawdown.toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Rebalancing Results */}
                  <div className="bg-green-900/20 border border-green-500/30 p-6 rounded-xl">
                    <div className="flex items-center mb-4">
                      <TrendingUp className="w-6 h-6 text-green-400 mr-2" />
                      <h3 className="text-xl font-bold text-green-400">{t('rebalancingResult')}</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Final Value:</span>
                        <span className="text-white font-semibold">{formatCurrency(results.rebalancing.finalValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Total Return:</span>
                        <span className={`font-semibold ${results.rebalancing.totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {formatPercent(results.rebalancing.totalReturn)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Max Drawdown:</span>
                        <span className="text-red-400 font-semibold">-{results.rebalancing.maxDrawdown.toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Difference */}
                <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <DollarSign className="w-6 h-6 text-blue-400 mr-2" />
                    <h3 className="text-xl font-bold text-blue-400">{t('difference')}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-gray-300 mb-2">Additional Profit</p>
                      <p className={`text-2xl font-bold ${results.difference >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {results.difference >= 0 ? '+' : ''}{formatCurrency(results.difference)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-300 mb-2">Performance Improvement</p>
                      <p className={`text-2xl font-bold ${results.differencePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatPercent(results.differencePercent)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 p-12 rounded-xl border border-gray-700 text-center">
                <CalcIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">Ready to Calculate</h3>
                <p className="text-gray-500">
                  Adjust your settings and click "Calculate" to see the comparison between holding and rebalancing strategies.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-yellow-900/20 border border-yellow-500/30 p-6 rounded-xl">
          <h4 className="text-lg font-semibold text-yellow-400 mb-2">⚠️ Disclaimer</h4>
          <p className="text-gray-300 text-sm">
            This calculator provides simulated results based on historical patterns and should not be considered as financial advice. 
            Past performance does not guarantee future results. Cryptocurrency investments carry significant risks including total loss of capital. 
            Always do your own research and consider consulting with a financial advisor.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Calculator

