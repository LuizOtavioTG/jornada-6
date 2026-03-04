"use client"

import { useState, useCallback } from "react"

interface Notification {
  id: string
  type: "info" | "success" | "warning" | "error"
  title: string
  message: string
  timestamp: string
  read: boolean
  osId?: string
  userId?: string
  action?: {
    label: string
    onClick: () => void
  }
}

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

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "info",
      title: "Nova OS Atribuída",
      message: "OS-2024-004 foi atribuída para você - Supermercado Vila Nova",
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      read: false,
      osId: "OS-2024-004",
      action: {
        label: "Ver OS",
        onClick: () => console.log("Ver OS-2024-004"),
      },
    },
    {
      id: "2",
      type: "success",
      title: "OS Aprovada",
      message: "OS-2024-001 foi aprovada pelo cliente com assinatura digital",
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      read: false,
      osId: "OS-2024-001",
    },
    {
      id: "3",
      type: "warning",
      title: "OS Atrasada",
      message: "OS-2024-002 está com prazo vencido há 2 dias",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: true,
      osId: "OS-2024-002",
    },
  ])

  const [toasts, setToasts] = useState<ToastNotification[]>([])

  const addNotification = useCallback((notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
    }

    setNotifications((prev) => [newNotification, ...prev])

    // Also show as toast
    showToast({
      type: notification.type,
      title: notification.title,
      message: notification.message,
      action: notification.action,
    })
  }, [])

  const showToast = useCallback((toast: Omit<ToastNotification, "id">) => {
    const newToast: ToastNotification = {
      ...toast,
      id: Date.now().toString(),
    }

    setToasts((prev) => [...prev, newToast])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }, [])

  const deleteNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  // Notification generators for common OS events
  const notifyOSCreated = useCallback(
    (osNumber: string, cliente: string) => {
      addNotification({
        type: "info",
        title: "Nova OS Criada",
        message: `${osNumber} criada para ${cliente}`,
        osId: osNumber,
      })
    },
    [addNotification],
  )

  const notifyOSStatusChanged = useCallback(
    (osNumber: string, oldStatus: string, newStatus: string) => {
      const statusMessages = {
        em_andamento: "iniciada",
        concluida: "concluída",
        aprovada: "aprovada pelo cliente",
        fechada: "fechada",
        cancelada: "cancelada",
      }

      addNotification({
        type: newStatus === "aprovada" ? "success" : "info",
        title: "Status da OS Alterado",
        message: `OS ${osNumber} foi ${statusMessages[newStatus as keyof typeof statusMessages] || newStatus}`,
        osId: osNumber,
      })
    },
    [addNotification],
  )

  const notifyOSAssigned = useCallback(
    (osNumber: string, tecnico: string, cliente: string) => {
      addNotification({
        type: "info",
        title: "OS Atribuída",
        message: `${osNumber} atribuída para ${tecnico} - ${cliente}`,
        osId: osNumber,
        action: {
          label: "Ver OS",
          onClick: () => console.log(`Ver ${osNumber}`),
        },
      })
    },
    [addNotification],
  )

  const notifyOSOverdue = useCallback(
    (osNumber: string, days: number) => {
      addNotification({
        type: "warning",
        title: "OS Atrasada",
        message: `${osNumber} está atrasada há ${days} dia${days > 1 ? "s" : ""}`,
        osId: osNumber,
      })
    },
    [addNotification],
  )

  return {
    notifications,
    toasts,
    unreadCount,
    addNotification,
    showToast,
    removeToast,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    // Helper functions
    notifyOSCreated,
    notifyOSStatusChanged,
    notifyOSAssigned,
    notifyOSOverdue,
  }
}
