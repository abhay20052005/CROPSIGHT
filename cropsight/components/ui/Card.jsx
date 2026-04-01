import { cn } from '@/lib/utils';

export default function Card({ children, className, hover = false, ...props }) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-md p-6',
        hover && 'transition-transform hover:scale-105 hover:shadow-xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
