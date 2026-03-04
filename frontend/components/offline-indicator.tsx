"use client"

import { Badge } from "@/components/ui/badge"
import { useOfflineOS } from "@/hooks/use-offline-os"
import { Cloud, CloudOff, RefreshCw, Wifi, WifiOff } from "lucide-react"

export function OfflineIndicator() {
  const { isOnline, syncStatus, queue, lastSyncError, syncNow } = useOfflineOS()

  const pendingCount = queue.length

  if (isOnline && syncStatus === "idle" && pendingCount === 0) {
    return null
  }

  const getStatusInfo = () => {
    if (!isOnline) {
      return {
        icon: <WifiOff className="h-3 w-3" />,
        text: "Offline",
        variant: "destructive" as const,
      }
    }

    if (syncStatus === "error") {
      return {
        icon: <CloudOff className="h-3 w-3" />,
        text: "Erro no Sync",
        variant: "destructive" as const,
      }
    }

    if (syncStatus === "syncing") {
      return {
        icon: <Cloud className="h-3 w-3 animate-pulse" />,
        text: "Sincronizando...",
        variant: "default" as const,
      }
    }

    if (pendingCount > 0) {
      return {
        icon: <CloudOff className="h-3 w-3" />,
        text: `Pendentes (${pendingCount})`,
        variant: "secondary" as const,
      }
    }

    return {
      icon: <Wifi className="h-3 w-3" />,
      text: "Online",
      variant: "default" as const,
    }
  }

  const statusInfo = getStatusInfo()
  const canForceSync = isOnline && pendingCount > 0 && syncStatus !== "syncing"

  return (
    <Badge
      variant={statusInfo.variant}
      className={`flex items-center gap-1 text-xs ${canForceSync ? "cursor-pointer" : ""}`}
      title={lastSyncError || "Status de sincronização"}
      onClick={() => {
        if (canForceSync) {
          void syncNow()
        }
      }}
    >
      {statusInfo.icon}
      {statusInfo.text}
      {canForceSync && <RefreshCw className="h-3 w-3" />}
    </Badge>
  )
}
