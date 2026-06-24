/**
 * RefundAI Assistant Avatar with animations
 */

'use client';

import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

interface AIAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  thinking?: boolean;
  online?: boolean;
}

export function AIAvatar({ size = 'md', thinking = false, online = true }: AIAvatarProps) {
  const sizeMap = {
    sm: { container: 'w-8 h-8', icon: 'w-5 h-5' },
    md: { container: 'w-12 h-12', icon: 'w-6 h-6' },
    lg: { container: 'w-16 h-16', icon: 'w-8 h-8' },
  };

  const { container, icon } = sizeMap[size];

  return (
    <div className="relative inline-flex items-center justify-center">
      <motion.div
        className={`${container} rounded-full bg-gradient-to-br from-blue-500 via-cyan-500 to-emerald-500 flex items-center justify-center text-white shadow-lg`}
        animate={
          thinking
            ? {
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: thinking ? Infinity : 0,
          repeatType: 'loop',
        }}
      >
        <Bot className={icon} />
      </motion.div>

      {/* Online indicator */}
      {online && (
        <motion.div
          className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-lg"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
      )}
    </div>
  );
}
