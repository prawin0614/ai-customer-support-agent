/**
 * Reusable Avatar component with initials or image
 */

interface AvatarProps {
  name?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  type?: 'user' | 'ai' | 'bot';
  online?: boolean;
  className?: string;
}

export function Avatar({
  name,
  initials,
  size = 'md',
  type = 'user',
  online = false,
  className = '',
}: AvatarProps) {
  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const getInitials = () => {
    if (initials) return initials;
    if (name) {
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return 'U';
  };

  const bgColor = type === 'ai' || type === 'bot'
    ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
    : 'bg-gradient-to-br from-purple-500 to-pink-500';

  return (
    <div className={`relative inline-flex items-center justify-center rounded-full font-bold text-white ${sizeStyles[size]} ${bgColor} ${className}`}>
      {getInitials()}
      {online && (
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900"></div>
      )}
    </div>
  );
}
