/**
 * Theme utilities for dark/light mode support
 */

export const THEME_COLORS = {
  light: {
    bg: 'bg-white',
    bgSecondary: 'bg-slate-50',
    text: 'text-slate-900',
    textSecondary: 'text-slate-600',
    border: 'border-slate-200',
    card: 'bg-white',
    hover: 'hover:bg-slate-100',
  },
  dark: {
    bg: 'bg-slate-950',
    bgSecondary: 'bg-slate-900',
    text: 'text-white',
    textSecondary: 'text-slate-300',
    border: 'border-slate-800',
    card: 'bg-slate-900',
    hover: 'hover:bg-slate-800',
  },
};

export const GRADIENT_COLORS = {
  primary:
    'from-blue-600 via-blue-500 to-cyan-500',
  secondary: 'from-purple-600 to-pink-500',
  success: 'from-emerald-500 to-teal-500',
  warning: 'from-amber-500 to-orange-500',
  danger: 'from-red-500 to-rose-500',
};

export const ACCENT_COLORS = {
  blue: '#3B82F6',
  purple: '#A855F7',
  emerald: '#10B981',
  amber: '#F59E0B',
  rose: '#F43F5E',
};
