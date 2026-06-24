/**
 * Reusable Card component with glassmorphism effect
 */

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export function Card({ children, className = '', hover = false, glass = true }: CardProps) {
  const glassStyle = glass
    ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border border-white/20 dark:border-slate-800/20'
    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800';

  const hoverStyle = hover ? 'hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:scale-105' : '';

  return (
    <div className={`rounded-2xl shadow-lg dark:shadow-2xl ${glassStyle} ${hoverStyle} ${className}`}>{children}</div>
  );
}

export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-6 py-4 border-b border-slate-200 dark:border-slate-800 ${className}`}>{children}</div>;
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-6 py-4 border-t border-slate-200 dark:border-slate-800 ${className}`}>{children}</div>;
}
