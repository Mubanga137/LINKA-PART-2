"use client"

import { useNotificationAnimation } from '@/hooks/use-animations'
import { X, CheckCircle, AlertCircle, Info, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

interface NotificationSystemProps {
  className?: string
}

export function NotificationSystem({ className }: NotificationSystemProps) {
  const { notifications, removeNotification } = useNotificationAnimation()

  return (
    <div className={`fixed top-6 right-6 z-50 space-y-3 ${className}`}>
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onRemove={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  )
}

interface NotificationCardProps {
  notification: {
    id: string
    message: string
    type: 'success' | 'error' | 'info'
    timestamp: number
  }
  onRemove: () => void
}

function NotificationCard({ notification, onRemove }: NotificationCardProps) {
  const { type, message } = notification

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getGradient = () => {
    switch (type) {
      case 'success':
        return 'from-green-400 to-emerald-500'
      case 'error':
        return 'from-red-400 to-rose-500'
      case 'info':
        return 'from-blue-400 to-indigo-500'
    }
  }

  useEffect(() => {
    const timer = setTimeout(onRemove, 5000)
    return () => clearTimeout(timer)
  }, [onRemove])

  return (
    <div className="notification-glow rounded-xl p-4 max-w-sm min-w-[300px] relative overflow-hidden group">
      {/* Animated Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${getGradient()} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
      
      {/* Floating Sparkle */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Sparkles className="h-3 w-3 text-purple-400 animate-spin-slow" />
      </div>

      <div className="relative z-10 flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-800 leading-relaxed">
            {message}
          </p>
        </div>
        
        <Button
          onClick={onRemove}
          size="sm"
          variant="ghost"
          className="h-6 w-6 p-0 text-slate-400 hover:text-slate-600 hover:bg-slate-100/50 rounded-full flex-shrink-0"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-slate-200/50 w-full">
        <div 
          className={`h-full bg-gradient-to-r ${getGradient()} rounded-full`}
          style={{
            animation: 'notificationProgress 5s linear forwards'
          }}
        />
      </div>

      <style jsx>{`
        @keyframes notificationProgress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  )
}

// Hook to access notification system from any component
export function useNotifications() {
  const { addNotification } = useNotificationAnimation()
  
  const showSuccess = (message: string) => addNotification(message, 'success')
  const showError = (message: string) => addNotification(message, 'error')
  const showInfo = (message: string) => addNotification(message, 'info')
  
  return { showSuccess, showError, showInfo }
}
