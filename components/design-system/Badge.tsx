/**
 * Reusable Badge component for status indicators
 */

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info' | 'pending';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({ children, variant = 'info', size = 'md', className = '' }: BadgeProps) {
  const variantStyles = {
    success: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
    error: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800',
    warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
    info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
    pending: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800',
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span className={`inline-flex items-center font-semibold rounded-full ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
}
