"use client"

import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; reset: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details but don't crash the app for HMR-related errors
    if (error.message.includes('Failed to fetch') && 
        (error.stack?.includes('webpack') || error.stack?.includes('_next'))) {
      console.warn('HMR-related error (non-critical):', error.message)
    } else {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return <this.props.fallback error={this.state.error} reset={this.reset} />
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center p-8 max-w-md">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Something went wrong
            </h2>
            <p className="text-muted-foreground mb-6">
              {this.state.error?.message?.includes('Failed to fetch') 
                ? 'There was a connection issue. This might be temporary.'
                : 'An unexpected error occurred. Please try again.'}
            </p>
            <button
              onClick={this.reset}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook-based error boundary for functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: React.ErrorInfo) => {
    if (error.message.includes('Failed to fetch') && 
        (error.stack?.includes('webpack') || error.stack?.includes('_next'))) {
      console.warn('HMR-related error (non-critical):', error.message)
    } else {
      console.error('Error caught by useErrorHandler:', error, errorInfo)
    }
  }
}
