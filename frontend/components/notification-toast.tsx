"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, CheckCircle, AlertCircle, Info } from "lucide-react"

interface ToastNotification {
  id: string
  type: "info" | "success" | "warning" | "error"
  title: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface NotificationToastProps {
  notification: ToastNotification
  onClose: (id: string) => void
}

export function NotificationToast({ notification, onClose }: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose(notification.id), 300)
    }, notification.duration || 5000)

    return () => clearTimeout(timer)
  }, [notification.id, notification.duration, onClose])

  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <Info className="h-5 w-5 text-blue-600" />
    }
  }

  const getBorderColor = () => {
    switch (notification.type) {
      case "success":
        return "border-l-green-500"
      case "warning":
        return "border-l-yellow-500"
      case "error":
        return "border-l-red-500"
      default:
        return "border-l-blue-500"
    }
  }

  return (
    <Card
      className={`
        fixed top-4 right-4 w-80 z-50 border-l-4 ${getBorderColor()}
        transition-all duration-300 transform
        ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
      `}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {getIcon()}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm font-medium">{notification.title}</h4>
              <Button variant="ghost" size="sm" onClick={() => onClose(notification.id)} className="h-6 w-6 p-0">
                <X className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
            {notification.action && (
              <Button
                variant="outline"
                size="sm"
                onClick={notification.action.onClick}
                className="text-xs bg-transparent"
              >
                {notification.action.label}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface ToastContainerProps {
  toasts: ToastNotification[]
  onRemoveToast: (id: string) => void
}

export function ToastContainer({ toasts, onRemoveToast }: ToastContainerProps) {
  return (
    <div className="fixed top-0 right-0 z-50 pointer-events-none">
      <div className="space-y-2 p-4 pointer-events-auto">
        {toasts.map((toast) => (
          <NotificationToast key={toast.id} notification={toast} onClose={onRemoveToast} />
        ))}
      </div>
    </div>
  )
}
