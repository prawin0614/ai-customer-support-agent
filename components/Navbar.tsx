/**
 * Global navigation bar component
 */

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Brain, LogOut, Menu, Moon, Sun } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useState } from 'react';
import { Button } from '@/components/ui';

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent hidden sm:inline">
              RefundAI
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {!isAuthenticated ? (
              <>
                <Link
                  href="/chat"
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
                >
                  Chat
                </Link>
                <Link
                  href="/admin/login"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors"
                >
                  Admin Portal
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/admin"
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/approve"
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
                >
                  Approvals
                </Link>
                <button
                  onClick={logout}
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {!isAuthenticated ? (
              <>
                <Link
                  href="/chat"
                  className="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Chat
                </Link>
                <Link
                  href="/admin/login"
                  className="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Admin Portal
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/admin"
                  className="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/approve"
                  className="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Approvals
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
