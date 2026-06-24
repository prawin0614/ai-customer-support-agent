/**
 * Admin Login Page - Fixed
 * Route: /admin/login
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { Card, Button, Input, Alert } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = login(username.trim(), pin.trim());
      if (success) {
        router.push('/admin');
      } else {
        setError('Invalid username or PIN. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-bounce"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Admin Portal</h1>
          <p className="text-slate-600 dark:text-slate-400">Secure access to refund management</p>
        </div>

        {/* Login Card */}
        <Card className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username */}
            <Input
              label="Username"
              type="text"
              placeholder="Enter admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon={<User className="w-5 h-5" />}
              required
              disabled={loading}
            />

            {/* PIN */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Admin PIN
              </label>
              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  placeholder="••••"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-2.5 pl-10 pr-10 rounded-lg font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-600 w-5 h-5 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors disabled:opacity-50"
                >
                  {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <Alert variant="error">
                {error}
              </Alert>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              disabled={loading || !username || !pin}
              className="w-full"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </Card>

        {/* Footer Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
