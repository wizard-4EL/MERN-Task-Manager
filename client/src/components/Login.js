import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      window.location.href = '/dashboard';
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-12" style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=900&fit=crop")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-900/60 to-slate-950/70 backdrop-blur-sm" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute -bottom-8 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white/10 backdrop-blur-xl text-white mb-4 mx-auto border border-white/20">
            <CheckCircle2 size={24} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">TaskFlow</h1>
          <p className="text-slate-300">Welcome back</p>
        </div>

        {/* Glassmorphism Card */}
        <div className="bg-white/10 dark:bg-slate-900/20 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl p-8 mb-6">
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-lg backdrop-blur-sm">
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/60 hover:text-white transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 active:from-cyan-500 active:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-cyan-500/20"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs font-medium text-white/50">Don't have an account?</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Sign Up Link */}
          <Link
            to="/signup"
            className="block w-full text-center py-3 px-4 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
          >
            Create new account
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-white/50">
          
        </p>
      </div>
    </div>
  );
};

export default Login;

