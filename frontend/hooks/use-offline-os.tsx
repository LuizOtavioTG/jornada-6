"use client"

import type { ReactNode } from "react"
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"

type SyncStatus = "idle" | "pending" | "syncing" | "error"

interface OrdemServicoRequestPayload {
  titulo: string
  descricao?: string
  clienteId: number
  unidadeId: number
  tecnicoId?: number | null
  tipoServicoId?: number | null
  prioridade?: string | null
  emGarantia?: boolean | null
  slaLimite?: string | null
  chamados?: Array<{ equipamentoId?: number | null; descricaoOriginal?: string }>
}

interface OfflineOSEntry {
  localId: string
  createdAt: string
  status: "pending" | "syncing" | "error"
  formData: any
  requestPayload: OrdemServicoRequestPayload
  error?: string
}

interface SyncedResult {
  localId: string
  response: any
}

interface SubmitResult {
  status: "queued" | "synced"
  offlineEntry?: OfflineOSEntry
  response?: any
  error?: string
}

interface OfflineOSContextValue {
  isOnline: boolean
  queue: OfflineOSEntry[]
  syncStatus: SyncStatus
  lastSyncAt: string | null
  lastSyncError: string | null
  submitOS: (formData: any) => Promise<SubmitResult>
  syncNow: () => Promise<void>
  removeFromQueue: (localId: string) => void
  syncedResults: SyncedResult[]
  acknowledgeSyncedResults: (localIds: string[]) => void
}

const OfflineOSContext = createContext<OfflineOSContextValue | undefined>(undefined)

const STORAGE_KEY = "offline_os_queue:v1"
const ANDROID_EMULATOR_API_URL = "http://10.0.2.2:8080"
const WEB_FALLBACK_API_URL = "http://localhost:3000"

const getApiBaseUrl = () => {
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || WEB_FALLBACK_API_URL
  }

  const envApiUrl = process.env.NEXT_PUBLIC_API_URL
  if (envApiUrl) return envApiUrl

  const isAndroidWebView = typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent)
  return isAndroidWebView ? ANDROID_EMULATOR_API_URL : window.location.origin
}

export function OfflineOSProvider({ children }: { children: ReactNode }) {
  const value = useProvideOfflineOS()
  return <OfflineOSContext.Provider value={value}>{children}</OfflineOSContext.Provider>
}

export function useOfflineOS() {
  const context = useContext(OfflineOSContext)
  if (!context) {
    throw new Error("useOfflineOS must be used within OfflineOSProvider")
  }
  return context
}

function useProvideOfflineOS(): OfflineOSContextValue {
  const [queue, setQueue] = useState<OfflineOSEntry[]>([])
  const [syncedResults, setSyncedResults] = useState<SyncedResult[]>([])
  const [isOnline, setIsOnline] = useState<boolean>(() => (typeof navigator !== "undefined" ? navigator.onLine : true))
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("idle")
  const [lastSyncAt, setLastSyncAt] = useState<string | null>(null)
  const [lastSyncError, setLastSyncError] = useState<string | null>(null)
  const isSyncingRef = useRef(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setQueue(JSON.parse(stored))
      } catch (error) {
        console.error("Falha ao carregar fila offline", error)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(queue))
    if (queue.length > 0 && syncStatus === "idle" && !isOnline) {
      setSyncStatus("pending")
    }
    if (queue.length === 0 && syncStatus === "pending") {
      setSyncStatus("idle")
    }
  }, [queue, isOnline, syncStatus])

  useEffect(() => {
    if (typeof window === "undefined") return
    const handleOnline = () => {
      setIsOnline(true)
    }
    const handleOffline = () => {
      setIsOnline(false)
      if (queue.length > 0) {
        setSyncStatus("pending")
      }
    }
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [queue.length])

  const mapFormToRequest = useCallback((formData: any): OrdemServicoRequestPayload => {
    const descricoesChamado = Array.isArray(formData?.descricoesChamado) ? formData.descricoesChamado : []

    return {
      titulo: formData?.titulo || formData?.descricao || formData?.numeroOS || "Ordem de Serviço",
      descricao: formData?.observacoesTecnicas || formData?.descricao || formData?.observacoes || "",
      clienteId: formData?.clienteData?.id ?? formData?.cliente_id ?? 1,
      unidadeId: formData?.clienteData?.unidade_id ?? formData?.cliente_id ?? 1,
      tecnicoId: formData?.tecnicoData?.id ?? formData?.tecnico_id ?? null,
      tipoServicoId: formData?.tipoServicoId ?? null,
      prioridade: formData?.prioridade ?? null,
      emGarantia: formData?.garantia ? formData.garantia !== "fora" : null,
      slaLimite: formData?.slaLimite || formData?.data2Visita || null,
      chamados: descricoesChamado.map((chamado: any) => ({
        equipamentoId: chamado?.equipamentoId ?? null,
        descricaoOriginal: chamado?.observacoes || chamado?.descricao || "",
      })),
    }
  }, [])

  const addToQueue = useCallback(
    (formData: any, requestPayload: OrdemServicoRequestPayload, error?: string) => {
      const entry: OfflineOSEntry = {
        localId: `offline-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        createdAt: new Date().toISOString(),
        status: "pending",
        formData,
        requestPayload,
        error,
      }
      setQueue((prev) => [entry, ...prev])
      setSyncStatus("pending")
      return entry
    },
    [],
  )

  const persistSyncedResult = useCallback((localId: string, response: any) => {
    setSyncedResults((prev) => [...prev, { localId, response }])
  }, [])

  const removeFromQueue = useCallback((localId: string) => {
    setQueue((prev) => prev.filter((entry) => entry.localId !== localId))
  }, [])

  const sendToApi = useCallback(async (payload: OrdemServicoRequestPayload) => {
    const response = await fetch(`${getApiBaseUrl()}/api/ordens-servico`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(text || "Falha ao sincronizar ordem de serviço")
    }

    return response.json()
  }, [])

  const syncNow = useCallback(async () => {
    if (!isOnline || queue.length === 0 || isSyncingRef.current) return
    isSyncingRef.current = true
    setSyncStatus("syncing")
    setLastSyncError(null)

    for (const entry of [...queue].reverse()) {
      setQueue((prev) =>
        prev.map((item) => (item.localId === entry.localId ? { ...item, status: "syncing", error: undefined } : item)),
      )

      try {
        const response = await sendToApi(entry.requestPayload)
        setQueue((prev) => prev.filter((item) => item.localId !== entry.localId))
        persistSyncedResult(entry.localId, response)
      } catch (error) {
        const message = error instanceof Error ? error.message : "Erro ao sincronizar"
        setQueue((prev) =>
          prev.map((item) => (item.localId === entry.localId ? { ...item, status: "error", error: message } : item)),
        )
        setLastSyncError(message)
        setSyncStatus("error")
        isSyncingRef.current = false
        return
      }
    }

    setLastSyncAt(new Date().toISOString())
    setSyncStatus("idle")
    isSyncingRef.current = false
  }, [isOnline, queue, sendToApi, persistSyncedResult])

  useEffect(() => {
    if (isOnline && queue.length > 0) {
      void syncNow()
    }
  }, [isOnline, queue.length, syncNow])

  const submitOS = useCallback(
    async (formData: any): Promise<SubmitResult> => {
      try {
        const payload = mapFormToRequest(formData)

        if (!isOnline) {
          const offlineEntry = addToQueue(formData, payload)
          return { status: "queued", offlineEntry }
        }

        try {
          const response = await sendToApi(payload)
          return { status: "synced", response }
        } catch (error) {
          const message = error instanceof Error ? error.message : "Erro ao enviar OS"
          const offlineEntry = addToQueue(formData, payload, message)
          setLastSyncError(message)
          return { status: "queued", offlineEntry, error: message }
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Erro ao preparar OS"
        const fallbackPayload: OrdemServicoRequestPayload = {
          titulo: formData?.titulo || formData?.descricao || formData?.numeroOS || "Ordem de Serviço",
          descricao: formData?.observacoesTecnicas || formData?.descricao || formData?.observacoes || "",
          clienteId: formData?.clienteData?.id ?? formData?.cliente_id ?? 1,
          unidadeId: formData?.clienteData?.unidade_id ?? formData?.cliente_id ?? 1,
          tecnicoId: formData?.tecnicoData?.id ?? formData?.tecnico_id ?? null,
          tipoServicoId: formData?.tipoServicoId ?? null,
          prioridade: formData?.prioridade ?? null,
          emGarantia: formData?.garantia ? formData.garantia !== "fora" : null,
          slaLimite: formData?.slaLimite || formData?.data2Visita || null,
          chamados: [],
        }
        const offlineEntry = addToQueue(formData, fallbackPayload, message)
        setLastSyncError(message)
        return { status: "queued", offlineEntry, error: message }
      }
    },
    [addToQueue, isOnline, mapFormToRequest, sendToApi],
  )

  const acknowledgeSyncedResults = useCallback((localIds: string[]) => {
    if (!localIds.length) return
    setSyncedResults((prev) => prev.filter((result) => !localIds.includes(result.localId)))
  }, [])

  return useMemo(
    () => ({
      isOnline,
      queue,
      syncStatus,
      lastSyncAt,
      lastSyncError,
      submitOS,
      syncNow,
      removeFromQueue,
      syncedResults,
      acknowledgeSyncedResults,
    }),
    [acknowledgeSyncedResults, isOnline, lastSyncAt, lastSyncError, queue, removeFromQueue, submitOS, syncNow, syncStatus, syncedResults],
  )
}
