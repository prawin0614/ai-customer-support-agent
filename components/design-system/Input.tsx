/**
 * Reusable Input component with validation states
 */

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Input({
  label,
  error,
  icon,
  fullWidth = false,
  className = '',
  ...props
}: InputProps) {
  const baseStyles = 'px-4 py-2.5 rounded-lg font-medium transition-all duration-200';
  const lightStyles =
    'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';
  const errorStyles = error ? 'border-red-500 focus:ring-red-500' : '';
  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <div className={widthStyle}>
      {label && (
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-600">
            {icon}
          </div>
        )}
        <input
          className={`${baseStyles} ${lightStyles} ${errorStyles} ${icon ? 'pl-10' : ''} ${className} ${widthStyle}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400 mt-1.5">{error}</p>
      )}
    </div>
  );
}
