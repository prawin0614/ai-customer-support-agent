/**
 * Design System - Reusable UI Components
 * Consistent spacing, typography, and interactions across the app
 */

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// ============================================
// BUTTON COMPONENT
// ============================================
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantStyles = {
      primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500',
      secondary: 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-gray-400',
      ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-gray-300',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {loading && <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
        {props.children}
      </button>
    );
  },
);
Button.displayName = 'Button';

// ============================================
// CARD COMPONENT
// ============================================
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, ...props }, ref) => (
    <div
      ref={ref}
      className={`rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm ${
        hover ? 'hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200' : ''
      } ${className}`}
      {...props}
    />
  ),
);
Card.displayName = 'Card';

// ============================================
// BADGE COMPONENT
// ============================================
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'error' | 'warning' | 'info' | 'default';
  size?: 'sm' | 'md';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const variantStyles = {
      success: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      error: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
      warning: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
      info: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      default: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
    };

    const sizeStyles = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1.5 text-sm',
    };

    return (
      <span
        ref={ref}
        className={`inline-flex items-center font-medium rounded-full ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      />
    );
  },
);
Badge.displayName = 'Badge';

// ============================================
// INPUT COMPONENT
// ============================================
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">{icon}</div>}
        <input
          ref={ref}
          className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            icon ? 'pl-10' : ''
          } ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  ),
);
Input.displayName = 'Input';

// ============================================
// AVATAR COMPONENT
// ============================================
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  initials?: string;
  status?: 'online' | 'offline' | 'busy';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  gradient?: boolean;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, initials = 'AI', status, size = 'md', gradient = false, ...props }, ref) => {
    const sizeStyles = {
      sm: 'w-8 h-8 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-12 h-12 text-base',
      xl: 'w-16 h-16 text-xl',
    };

    const statusColors = {
      online: 'bg-green-400',
      offline: 'bg-gray-400',
      busy: 'bg-red-400',
    };

    return (
      <div ref={ref} className={`relative inline-flex items-center justify-center ${sizeStyles[size]} rounded-full font-semibold ${className}`} {...props}>
        <div
          className={`w-full h-full rounded-full flex items-center justify-center text-white ${
            gradient ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-to-br from-blue-600 to-blue-700'
          }`}
        >
          {initials}
        </div>
        {status && (
          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${statusColors[status]}`} />
        )}
      </div>
    );
  },
);
Avatar.displayName = 'Avatar';

// ============================================
// MODAL COMPONENT
// ============================================
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full mx-4">
        {title && (
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <span className="text-2xl">×</span>
            </button>
          </div>
        )}

        <div className="px-6 py-4">{children}</div>

        {footer && <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex gap-3 justify-end">{footer}</div>}
      </div>
    </div>
  );
};

// ============================================
// LOADING SKELETON
// ============================================
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ count = 1, className, ...props }) => (
  <div {...props}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 ${className}`} />
    ))}
  </div>
);

// ============================================
// ALERT COMPONENT
// ============================================
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  icon?: React.ReactNode;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', icon, children, ...props }, ref) => {
    const variantStyles = {
      info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
      success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
      warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
      error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
    };

    return (
      <div ref={ref} className={`rounded-lg border p-4 flex gap-3 ${variantStyles[variant]} ${className}`} {...props}>
        {icon && <div className="flex-shrink-0">{icon}</div>}
        <div className="flex-grow">{children}</div>
      </div>
    );
  },
);
Alert.displayName = 'Alert';
