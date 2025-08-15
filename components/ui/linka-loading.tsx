'use client';

import LinkaLogo from './linka-logo';

interface LinkaLoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullScreen?: boolean;
  className?: string;
}

export default function LinkaLoading({ 
  message = 'Loading...', 
  size = 'lg',
  fullScreen = false,
  className = ''
}: LinkaLoadingProps) {
  const containerClasses = fullScreen 
    ? "fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 backdrop-blur-sm"
    : `flex items-center justify-center p-12 ${className}`;

  return (
    <div className={containerClasses}>
      <div className="text-center space-y-6">
        {/* Animated Logo */}
        <div className="relative">
          <LinkaLogo 
            size={size}
            variant="loading"
            animated={true}
            className="animate-linka-float"
          />
          
          {/* Pulsing Glow Ring */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-400/20 via-teal-400/30 to-orange-400/20 blur-xl animate-linka-pulse-brand" />
          
          {/* Rotating Border */}
          <div className="absolute -inset-2 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-500 via-teal-500 to-orange-500 animate-spin" 
               style={{ 
                 background: 'linear-gradient(45deg, transparent, transparent, rgba(59, 130, 246, 0.3), transparent, transparent)',
                 mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                 maskComposite: 'xor'
               }} />
        </div>

        {/* Loading Message */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-800 animate-pulse">
            {message}
          </h3>
          
          {/* Loading Dots */}
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>

        {/* Brand Tagline */}
        <p className="text-sm text-slate-500 font-medium animate-pulse">
          Powered by Linka
        </p>
      </div>
    </div>
  );
}

// Quick Loading Overlay
export function LinkaLoadingOverlay({ message = 'Please wait...', onClose }: { 
  message?: string; 
  onClose?: () => void; 
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 mx-4 max-w-sm w-full border border-slate-200">
        <LinkaLoading message={message} size="md" />
        {onClose && (
          <button 
            onClick={onClose}
            className="mt-4 w-full text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

// Skeleton Loading with Logo
export function LinkaSkeletonLoader({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center space-x-3">
        <LinkaLogo size="sm" variant="default" animated={false} />
        <div className="h-4 bg-slate-200 rounded animate-pulse flex-1 max-w-32" />
      </div>
      
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-slate-200 rounded animate-pulse" style={{ width: `${Math.random() * 40 + 60}%` }} />
          <div className="h-4 bg-slate-200 rounded animate-pulse" style={{ width: `${Math.random() * 30 + 50}%` }} />
        </div>
      ))}
    </div>
  );
}
