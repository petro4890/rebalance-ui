import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { Mail, Phone, Lock, Eye, EyeOff, LogIn } from 'lucide-react'

const Login = () => {
  const { t } = useLanguage()
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  })
  const [loginType, setLoginType] = useState('email') // 'email' or 'phone'
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.emailOrPhone || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    const credentials = {
      [loginType]: formData.emailOrPhone,
      password: formData.password
    }

    const result = await login(credentials)
    
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error || 'Login failed')
    }
  }

  const handleDemoLogin = async (role = 'user') => {
    const credentials = {
      email: role === 'admin' ? 'admin@rebalance.ai' : 'demo@rebalance.ai',
      password: 'demo123'
    }
    
    const result = await login(credentials)
    if (result.success) {
      navigate(role === 'admin' ? '/admin' : '/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {t('loginTitle')}
          </h2>
          <p className="text-gray-400">
            Welcome back! Please sign in to your account.
          </p>
        </div>

        {/* Login Type Toggle */}
        <div className="flex bg-gray-800 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setLoginType('email')}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              loginType === 'email'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4 mr-2" />
            {t('email')}
          </button>
          <button
            type="button"
            onClick={() => setLoginType('phone')}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              loginType === 'phone'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Phone className="w-4 h-4 mr-2" />
            {t('phone')}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-900/20 border border-red-500/30 p-3 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Email/Phone Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {loginType === 'email' ? t('email') : t('phone')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {loginType === 'email' ? (
                  <Mail className="w-5 h-5 text-gray-400" />
                ) : (
                  <Phone className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <input
                type={loginType === 'email' ? 'email' : 'tel'}
                value={formData.emailOrPhone}
                onChange={(e) => handleInputChange('emailOrPhone', e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder={loginType === 'email' ? 'Enter your email' : 'Enter your phone number'}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t('password')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400 hover:text-white" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400 hover:text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            size="lg"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Signing in...
              </div>
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-2" />
                {t('login')}
              </>
            )}
          </Button>
        </form>

        {/* Demo Buttons */}
        <div className="space-y-3">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-3">Try demo accounts:</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => handleDemoLogin('user')}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
              disabled={loading}
            >
              Demo User
            </Button>
            <Button
              onClick={() => handleDemoLogin('admin')}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
              disabled={loading}
            >
              Demo Admin
            </Button>
          </div>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-gray-400">
            {t('dontHaveAccount')}{' '}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">
              {t('register')}
            </Link>
          </p>
        </div>

        {/* Forgot Password */}
        <div className="text-center">
          <button className="text-sm text-blue-400 hover:text-blue-300">
            Forgot your password?
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login

