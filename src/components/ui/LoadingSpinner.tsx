interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
}

export default function LoadingSpinner({ 
  size = 'md', 
  className = "",
  text = "Loading..."
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <div className={`${sizeClasses[size]} animate-spin`}>
        <svg
          className="w-full h-full text-charcoal-900"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
      {text && (
        <p className="text-body text-sm text-charcoal-600 italic">
          {text}
        </p>
      )}
    </div>
  )
}

// Full page loading component
export function FullPageLoader({ text = "Loading the collection..." }: { text?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment-50">
      <div className="text-center">
        <LoadingSpinner size="lg" text={text} />
        <div className="mt-8 text-center">
          <div className="text-display text-2xl font-semibold text-charcoal-900 mb-2">
            Diamond Street Collective
          </div>
          <p className="text-body text-charcoal-600">
            Preparing your aristocratic experience...
          </p>
        </div>
      </div>
    </div>
  )
}

// Skeleton loading component
export function SkeletonCard() {
  return (
    <div className="bg-parchment-50 border border-parchment-300 rounded-lg overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-parchment-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-parchment-200 rounded w-3/4" />
        <div className="h-3 bg-parchment-200 rounded w-1/2" />
        <div className="h-3 bg-parchment-200 rounded w-2/3" />
        <div className="flex space-x-2">
          <div className="h-6 bg-parchment-200 rounded-full w-16" />
          <div className="h-6 bg-parchment-200 rounded-full w-20" />
        </div>
      </div>
    </div>
  )
}

// Skeleton grid for multiple cards
export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  )
} 