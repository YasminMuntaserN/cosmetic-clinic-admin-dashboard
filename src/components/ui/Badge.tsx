import { cn } from '../../utils/cn';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'error' |'Male' |'Female'|'info';
    className?: string;
}

export function Badge({
              children,
              variant = 'default',
              className
          }: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                variant === 'success' && 'bg-green-100 text-green-800',
                variant === 'warning' && 'bg-yellow-100 text-yellow-800',
                variant === 'error' && 'bg-red-100 text-red-800',
                variant === 'default' && 'bg-gray-100 text-gray-800',
                variant === 'Female' && 'bg-pink-200 text-gray-800',
                variant === 'Male' && 'bg-blue-200 text-gray-800',
                variant === 'info' && 'bg-yellow-400 text-gray-800',
                className
            )}
        >
      {children}
    </span>
    );
}