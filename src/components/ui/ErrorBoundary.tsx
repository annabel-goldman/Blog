"use client"

import { Component, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-parchment-50 px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h1 className="text-display text-2xl font-semibold text-charcoal-900 mb-2">
                Something went wrong
              </h1>
              <p className="text-body text-charcoal-600 mb-6">
                We apologize for the inconvenience. The collection seems to have encountered an unexpected error.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-charcoal-900 text-parchment-50 text-sm font-medium rounded hover:bg-charcoal-800 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
              
              <Link
                href="/"
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-parchment-100 border border-parchment-300 text-charcoal-900 text-sm font-medium rounded hover:bg-parchment-200 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Return Home</span>
              </Link>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-xs text-charcoal-500 cursor-pointer hover:text-charcoal-700">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 p-3 bg-parchment-100 border border-parchment-300 rounded text-xs text-charcoal-700 overflow-auto">
                  {this.state.error.message}
                  {'\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Simple error component for use in components
export function ErrorMessage({ 
  title = "Error", 
  message = "Something went wrong",
  onRetry
}: {
  title?: string
  message?: string
  onRetry?: () => void
}) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <AlertTriangle className="w-6 h-6 text-red-600" />
      </div>
      <h3 className="text-display text-lg font-semibold text-charcoal-900 mb-2">
        {title}
      </h3>
      <p className="text-body text-charcoal-600 mb-4">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-charcoal-900 text-parchment-50 text-sm font-medium rounded hover:bg-charcoal-800 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  )
}

// Not found component
export function NotFoundMessage({ 
  title = "Not Found", 
  message = "The requested item could not be found in our collection.",
  showHomeLink = true
}: {
  title?: string
  message?: string
  showHomeLink?: boolean
}) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-12 h-12 bg-charcoal-100 rounded-full flex items-center justify-center mb-4">
        <AlertTriangle className="w-6 h-6 text-charcoal-600" />
      </div>
      <h3 className="text-display text-lg font-semibold text-charcoal-900 mb-2">
        {title}
      </h3>
      <p className="text-body text-charcoal-600 mb-4">
        {message}
      </p>
      {showHomeLink && (
        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-charcoal-900 text-parchment-50 text-sm font-medium rounded hover:bg-charcoal-800 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      )}
    </div>
  )
} 