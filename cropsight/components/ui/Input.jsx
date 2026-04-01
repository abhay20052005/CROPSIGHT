import { cn } from '@/lib/utils';

export default function Input({ label, error, className, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-4 py-3 bg-white border-2 rounded-xl transition-colors',
          'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
          error ? 'border-red-500' : 'border-gray-200',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
