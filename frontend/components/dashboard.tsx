"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Search, Calendar, Users, Wrench, FileText, Bell, Eye, LogOut, Shield, History, AlertCircle } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import NovaOSForm from "@/components/nova-os-form"
import OSDetalhes from "@/components/os-detalhes"
import ClientesPage from "@/components/clientes-page"
import EquipePage from "@/components/equipe-page"
import AgendaPage from "@/components/agenda-page"
import { NotificationCenter } from "@/components/notification-center"
import { ToastContainer } from "@/components/notification-toast"
import { useNotifications } from "@/hooks/use-notifications"
import { AdvancedFilters } from "@/components/advanced-filters"
import { ExportData } from "@/components/export-data"
import { OfflineIndicator } from "@/components/offline-indicator"
import InformativosList from "@/components/informativos-list"
import CriarInformativo from "@/components/criar-informativo"
import AdminConfig from "@/components/admin-config"
import ConfigValores from "@/components/config-valores"
import ConfigDefeitos from "@/components/config-defeitos"
import { useOfflineOS } from "@/hooks/use-offline-os"

export default function OSManagementDashboard() {
  const { user, logout, hasPermission } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showNovaOS, setShowNovaOS] = useState(false)
  const [selectedOS, setSelectedOS] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [showNotifications, setShowNotifications] = useState(false)
  const [advancedFilters, setAdvancedFilters] = useState<any>(null)

  const {
    notifications,
    toasts,
    unreadCount,
    showToast,
    removeToast,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    notifyOSCreated,
    notifyOSStatusChanged,
  } = useNotifications()
  const {
    queue: offlineQueue,
    syncStatus: offlineSyncStatus,
    syncedResults,
    acknowledgeSyncedResults,
    syncNow,
    lastSyncError,
  } = useOfflineOS()

  const [ordens, setOrdens] = useState([
    {
      id: "OS-2024-001",
      numeroOS: "OS-2024-001",
      cliente: "Supermercado Central",
      cnpj: "12.345.678/0001-90",
      endereco: "Rua das Flores, 123 - Centro - São Paulo/SP",
      contato: "José Silva",
      telefone: "(11) 99999-1234",
      status: "em_andamento",
      tecnico: "João Silva",
      tecnico_id: 1,
      cliente_id: 1,
      tipo: "Manutenção Preventiva",
      descricao: "Manutenção preventiva nas gôndulas refrigeradas do setor de laticínios",
      observacoes: "Cliente solicitou prioridade para o setor de congelados",
      dataAbertura: "2024-01-15T08:30:00Z",
      dataInicio: "2024-01-15T14:00:00Z",
      created_by: 2,
      deleted_at: null,
      chamados: [
        {
          numeroSerie: "GR-001-2023",
          defeito: "refrigeracao",
          observacoes: "Gôndula não está resfriando adequadamente, temperatura acima do normal",
        },
      ],
      defeitosTecnicos: [
        {
          numeroSerie: "GR-001-2023",
          categoria: "refrigeracao",
          comp_queimado: false,
          comp_corrente_alta: true,
          vaz_nao_localizado: true,
          ref_regulagem_parametros: true,
        },
      ],
      custos: [
        {
          id: "custo-1",
          name: "Estrutura 1",
          deslocamento: { totalValor: 150.0 },
          horasTrabalhadas: { totalValor: 320.0 },
          quilometragem: { totalValor: 45.0 },
          materiaisTotal: 180.0,
          valorTotal: 695.0,
        },
      ],
      valor_total: 695.0,
    },
    {
      id: "OS-2024-002",
      numeroOS: "OS-2024-002",
      cliente: "Mercado do Bairro",
      cnpj: "98.765.432/0001-10",
      endereco: "Av. Principal, 456 - Vila Nova - São Paulo/SP",
      contato: "Maria Santos",
      telefone: "(11) 88888-5678",
      status: "aberta",
      tecnico: "Maria Santos",
      tecnico_id: 2,
      cliente_id: 2,
      tipo: "Instalação",
      descricao: "Instalação de nova gôndula refrigerada de 3 metros",
      observacoes: "",
      dataAbertura: "2024-01-16T09:15:00Z",
      created_by: 1,
      deleted_at: null,
      chamados: [
        {
          numeroSerie: "GR-NEW-2024",
          defeito: "estrutura",
          observacoes: "Instalação completa de nova gôndula com sistema de refrigeração",
        },
      ],
      defeitosTecnicos: [],
      custos: [
        {
          id: "custo-1",
          name: "Estrutura 1",
          deslocamento: { totalValor: 200.0 },
          horasTrabalhadas: { totalValor: 480.0 },
          quilometragem: { totalValor: 60.0 },
          materiaisTotal: 2500.0,
          valorTotal: 3240.0,
        },
      ],
      valor_total: 3240.0,
    },
    {
      id: "OS-2024-003",
      numeroOS: "OS-2024-003",
      cliente: "Hipermercado Norte",
      cnpj: "11.222.333/0001-44",
      endereco: "Rod. Norte, Km 15 - Distrito Industrial - São Paulo/SP",
      contato: "Carlos Oliveira",
      telefone: "(11) 77777-9012",
      status: "concluida",
      tecnico: "Pedro Costa",
      tecnico_id: 3,
      cliente_id: 3,
      tipo: "Reparo",
      descricao: "Reparo no sistema de refrigeração - compressor com defeito",
      observacoes: "Peça substituída com garantia de 12 meses",
      dataAbertura: "2024-01-10T07:45:00Z",
      dataInicio: "2024-01-10T13:30:00Z",
      dataConclusao: "2024-01-12T16:20:00Z",
      created_by: 2,
      deleted_at: null,
      chamados: [
        {
          numeroSerie: "GR-003-2022",
          defeito: "refrigeracao",
          observacoes: "Compressor fazendo ruído excessivo e não mantendo temperatura",
        },
      ],
      defeitosTecnicos: [
        {
          numeroSerie: "GR-003-2022",
          categoria: "refrigeracao",
          comp_queimado: true,
          comp_nao_parte: false,
          vaz_nao_localizado: false,
        },
      ],
      custos: [
        {
          id: "custo-1",
          name: "Estrutura 1",
          deslocamento: { totalValor: 120.0 },
          horasTrabalhadas: { totalValor: 240.0 },
          quilometragem: { totalValor: 35.0 },
          materiaisTotal: 850.0,
          valorTotal: 1245.0,
        },
      ],
      valor_total: 1245.0,
    },
    {
      id: "OS-2024-004",
      numeroOS: "OS-2024-004",
      cliente: "Loja Exemplo",
      status: "cancelada",
      tecnico: "João Silva",
      tipo: "Cancelada",
      descricao: "OS cancelada pelo cliente",
      dataAbertura: "2024-01-05T10:00:00Z",
      created_by: 1,
      deleted_at: "2024-01-06T15:30:00Z",
      deleted_by: 1,
      chamados: [],
      defeitosTecnicos: [],
      custos: [],
      valor_total: 0.0,
    },
  ])

  const mapFormToOfflineCard = (formData: any = {}, localId: string, createdAt: string) => {
    return {
      ...formData,
      id: localId,
      numeroOS: formData.numeroOS || formData.osNumber || localId,
      cliente: formData.cliente || formData?.clienteData?.nome || "Cliente não informado",
      cliente_id: formData?.clienteData?.id ?? formData?.cliente_id,
      tecnico: formData.tecnico || formData?.tecnicoData?.nome || user?.nome || "Técnico não informado",
      tecnico_id: formData?.tecnicoData?.id ?? formData?.tecnico_id ?? user?.id,
      tipo: formData.tipo || "Ordem de Serviço",
      descricao: formData.descricao || formData?.observacoes || "OS registrada offline",
      status: "pendente_sync",
      dataAbertura: formData.dataAbertura || createdAt,
      valor_total: formData.valorTotalOS || formData.valor_total || 0,
      offlineLocalId: localId,
      offlineCreatedAt: createdAt,
    }
  }

  const mapServerResponseToOS = (response: any = {}, fallback: any = {}) => {
    return {
      ...fallback,
      id: response.id ?? fallback.id ?? response.numeroOs ?? `OS-${Date.now()}`,
      numeroOS: response.numeroOs ?? fallback.numeroOS ?? fallback.id ?? `OS-${Date.now()}`,
      cliente: response.cliente?.nome || fallback.cliente || fallback?.clienteData?.nome || "Cliente não informado",
      cliente_id: response.clienteId ?? fallback.cliente_id,
      tecnico: response.tecnico?.nome || fallback.tecnico || fallback?.tecnicoData?.nome || user?.nome || "Técnico",
      tecnico_id: response.tecnicoId ?? fallback.tecnico_id ?? user?.id,
      status: (response.status || fallback.status || "aberta").toLowerCase(),
      dataAbertura: response.dataAbertura ?? fallback.dataAbertura ?? new Date().toISOString(),
      valor_total:
        response.custoTotal !== undefined && response.custoTotal !== null
          ? Number(response.custoTotal)
          : fallback.valor_total || 0,
    }
  }

  const offlineEntriesMap = useMemo(() => {
    const map = new Map<string, (typeof offlineQueue)[number]>()
    offlineQueue.forEach((entry) => map.set(entry.localId, entry))
    return map
  }, [offlineQueue])

  useEffect(() => {
    if (offlineQueue.length === 0) return
    setOrdens((prev) => {
      const existingIds = new Set(prev.map((os: any) => os.offlineLocalId).filter(Boolean))
      const newEntries = offlineQueue
        .filter((entry) => !existingIds.has(entry.localId))
        .map((entry) => mapFormToOfflineCard(entry.formData, entry.localId, entry.createdAt))

      if (newEntries.length === 0) return prev
      return [...newEntries, ...prev]
    })
  }, [offlineQueue, user])

  useEffect(() => {
    if (syncedResults.length === 0) return
    const syncedIds = syncedResults.map((result) => result.localId)
    setOrdens((prev) =>
      prev.map((os: any) => {
        const match = syncedResults.find((result) => result.localId === os.offlineLocalId)
        if (!match) return os
        const response = match.response || {}
        const syncedOS = mapServerResponseToOS(response, os)
        return {
          ...syncedOS,
          offlineLocalId: undefined,
          offlineSyncedAt: new Date().toISOString(),
        }
      }),
    )
    acknowledgeSyncedResults(syncedIds)
  }, [syncedResults, acknowledgeSyncedResults])

  const getFilteredOrdens = () => {
    let filtered = ordens

    // Role-based filtering
    if (user?.role === "cliente") {
      // Clients can only see their own OS
      filtered = filtered.filter((os) => os.cliente_id === user.empresa_id)
    } else if (user?.role === "tecnico") {
      filtered = filtered.filter((os) => os.tecnico_id === user.id && !os.deleted_at)
    }

    // Admin can see deleted OS if they have permission
    if (!hasPermission("view_deleted")) {
      filtered = filtered.filter((os) => !os.deleted_at)
    }

    // Apply search and status filters
    filtered = filtered.filter((os) => {
      const matchesSearch =
        searchTerm === "" ||
        os.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        os.numeroOS.toLowerCase().includes(searchTerm.toLowerCase()) ||
        os.tecnico.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "todos" || os.status === statusFilter

      // Advanced filters logic
      if (advancedFilters) {
        const matchesCliente =
          !advancedFilters.cliente || os.cliente.toLowerCase().includes(advancedFilters.cliente.toLowerCase())

        const matchesTecnico = advancedFilters.tecnico === "Todos" || os.tecnico === advancedFilters.tecnico

        const matchesAdvancedStatus = advancedFilters.status === "Todos" || os.status === advancedFilters.status

        const matchesTipo =
          advancedFilters.tipo === "Todos" || os.tipo.toLowerCase().includes(advancedFilters.tipo.toLowerCase())

        // Date range filtering
        let matchesDateRange = true
        if (advancedFilters.dataInicio || advancedFilters.dataFim) {
          const osDate = new Date(os.dataAbertura)
          if (advancedFilters.dataInicio && osDate < advancedFilters.dataInicio) {
            matchesDateRange = false
          }
          if (advancedFilters.dataFim && osDate > advancedFilters.dataFim) {
            matchesDateRange = false
          }
        }

        return (
          matchesSearch &&
          matchesStatus &&
          matchesCliente &&
          matchesTecnico &&
          matchesAdvancedStatus &&
          matchesTipo &&
          matchesDateRange
        )
      }

      return matchesSearch && matchesStatus
    })

    return filtered
  }

  const filteredOrdens = getFilteredOrdens()

  const estatisticas = {
    totalOS: filteredOrdens.length,
    abertas: filteredOrdens.filter((os) => os.status === "aberta").length,
    emAndamento: filteredOrdens.filter((os) => os.status === "em_andamento").length,
    concluidas: filteredOrdens.filter((os) => os.status === "concluida").length,
  }

  const getAvailableTabs = () => {
    const tabs = [{ id: "dashboard", label: "Dashboard", icon: FileText, permission: "read_os" }]

    if (user?.role === "tecnico") {
      tabs.push({ id: "informativos", label: "Informativos", icon: Bell, permission: "read_os" })
    }

    if (hasPermission("read_client")) {
      tabs.push({ id: "clientes", label: "Clientes", icon: Wrench, permission: "read_client" })
    }

    if (hasPermission("read_user")) {
      tabs.push({ id: "equipe", label: "Equipe", icon: Users, permission: "read_user" })
    }

    if (hasPermission("read_os")) {
      tabs.push({ id: "agenda", label: "Agenda", icon: Calendar, permission: "read_os" })
    }

    if (user?.role === "admin") {
      tabs.push({ id: "configuracoes", label: "Configurações", icon: Shield, permission: "manage_users" })
    }

    return tabs
  }

  const availableTabs = getAvailableTabs()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aberta":
        return "bg-blue-100 text-blue-800"
      case "em_andamento":
        return "bg-yellow-100 text-yellow-800"
      case "concluida":
        return "bg-green-100 text-green-800"
      case "aprovada":
        return "bg-emerald-100 text-emerald-800"
      case "fechada":
        return "bg-gray-100 text-gray-800"
      case "cancelada":
        return "bg-red-100 text-red-800"
      case "pendente_sync":
        return "bg-orange-100 text-orange-800"
      case "erro_sync":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "aberta":
        return "Aberta"
      case "em_andamento":
        return "Em Andamento"
      case "concluida":
        return "Concluída"
      case "aprovada":
        return "Aprovada"
      case "fechada":
        return "Fechada"
      case "cancelada":
        return "Cancelada"
      case "pendente_sync":
        return "Pendente de Sync"
      case "erro_sync":
        return "Erro de Sync"
      default:
        return status
    }
  }

  const handleAdvancedFiltersChange = (filters: any) => {
    setAdvancedFilters(filters)
  }

  const handleClearAdvancedFilters = () => {
    setAdvancedFilters(null)
  }

  const handleNovaOS = (osData: any) => {
    const numeroOS =
      osData.numeroOS ||
      osData.osNumber ||
      `OS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999) + 1).padStart(4, "0")}`

    const createdOS = {
      ...osData,
      id: osData.id || numeroOS,
      numeroOS,
      status: osData.status || "aberta",
      dataAbertura: osData.dataAbertura || new Date().toISOString(),
    }

    setOrdens((prev) => [createdOS, ...prev])
    notifyOSCreated(createdOS.numeroOS, createdOS.cliente || createdOS?.clienteData?.nome || "Cliente não informado")
    showToast({
      type: "success",
      title: "OS criada",
      message: `OS ${createdOS.numeroOS} adicionada à listagem.`,
    })
  }

  const handleUpdateOS = (updatedOS: any) => {
    const oldOS = ordens.find((os) => os.id === updatedOS.id)
    setOrdens(ordens.map((os) => (os.id === updatedOS.id ? updatedOS : os)))
    setSelectedOS(null)

    if (oldOS && oldOS.status !== updatedOS.status) {
      notifyOSStatusChanged(updatedOS.numeroOS, oldOS.status, updatedOS.status)
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "informativos":
        if (user?.role !== "tecnico") {
          return (
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>Você não tem permissão para acessar esta seção.</AlertDescription>
            </Alert>
          )
        }
        return <InformativosList />

      case "configuracoes":
        if (user?.role !== "admin") {
          return (
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>Você não tem permissão para acessar esta seção.</AlertDescription>
            </Alert>
          )
        }
        return (
          <div className="space-y-6">
            <AdminConfig />
            <ConfigValores />
            <ConfigDefeitos />
          </div>
        )

      case "clientes":
        if (!hasPermission("read_client")) {
          return (
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>Você não tem permissão para acessar esta seção.</AlertDescription>
            </Alert>
          )
        }
        return <ClientesPage ordensServico={ordens} />

      case "equipe":
        if (!hasPermission("read_user")) {
          return (
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>Você não tem permissão para acessar esta seção.</AlertDescription>
            </Alert>
          )
        }
        return <EquipePage ordensServico={ordens} />

      case "agenda":
        return <AgendaPage ordensServico={filteredOrdens} />

      case "dashboard":
      default:
        return (
          <div className="space-y-6">
            {/* Role-based welcome message */}
            {user?.role === "cliente" && (
              <Alert className="bg-blue-50 border-blue-200">
                <Shield className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  Bem-vindo! Você está visualizando apenas as ordens de serviço da sua empresa.
                </AlertDescription>
              </Alert>
            )}

            {user?.role === "tecnico" && (
              <Alert className="bg-green-50 border-green-200">
                <Shield className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Área do Técnico - Visualize e preencha as OS atribuídas a você.
                </AlertDescription>
              </Alert>
            )}

            {/* Estatísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-l-4 border-l-primary shadow-sm">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-primary mb-1">{estatisticas.totalOS}</div>
                  <p className="text-sm font-medium text-muted-foreground">Total de OS</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-secondary shadow-sm">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-secondary mb-1">{estatisticas.abertas}</div>
                  <p className="text-sm font-medium text-muted-foreground">Abertas</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-chart-2 shadow-sm">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-chart-2 mb-1">{estatisticas.emAndamento}</div>
                  <p className="text-sm font-medium text-muted-foreground">Em Andamento</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-accent shadow-sm">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-accent mb-1">{estatisticas.concluidas}</div>
                  <p className="text-sm font-medium text-muted-foreground">Concluídas</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Buscar por cliente, OS ou técnico..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filtrar por status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os Status</SelectItem>
                      <SelectItem value="aberta">Abertas</SelectItem>
                      <SelectItem value="em_andamento">Em Andamento</SelectItem>
                      <SelectItem value="concluida">Concluídas</SelectItem>
                      <SelectItem value="aprovada">Aprovadas</SelectItem>
                      <SelectItem value="fechada">Fechadas</SelectItem>
                      <SelectItem value="cancelada">Canceladas</SelectItem>
                      <SelectItem value="pendente_sync">Pendentes (Offline)</SelectItem>
                      <SelectItem value="erro_sync">Falha na Sync</SelectItem>
                    </SelectContent>
                  </Select>
                  {hasPermission("export_data") && <ExportData />}
                </div>

                {(user?.role === "admin" || user?.role === "funcionario") && (
                  <AdvancedFilters
                    onFiltersChange={handleAdvancedFiltersChange}
                    onClearFilters={handleClearAdvancedFilters}
                  />
                )}

                {offlineQueue.length > 0 && (
                  <Alert
                    className={`border ${
                      offlineSyncStatus === "error"
                        ? "border-red-200 bg-red-50 text-red-900"
                        : "border-orange-200 bg-orange-50 text-orange-900"
                    }`}
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="flex flex-col gap-2">
                      <span>
                        {offlineSyncStatus === "error"
                          ? lastSyncError ||
                            "Não foi possível sincronizar as OS pendentes. Verifique a conexão e tente novamente."
                          : `Existem ${offlineQueue.length} OS aguardando sincronização. Elas serão enviadas automaticamente quando houver conexão.`}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="border-transparent bg-white/40 text-xs">
                          Pendentes: {offlineQueue.length}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs"
                          disabled={offlineSyncStatus === "syncing"}
                          onClick={() => void syncNow()}
                        >
                          {offlineSyncStatus === "syncing" ? "Sincronizando..." : "Sincronizar agora"}
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Ordens de Serviço ({filteredOrdens.length})
                  {hasPermission("view_deleted") && (
                    <Badge variant="outline" className="ml-2">
                      <History className="h-3 w-3 mr-1" />
                      Incluindo excluídas
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  {searchTerm || statusFilter !== "todos"
                    ? `Resultados filtrados de ${ordens.length} OS total`
                    : user?.role === "cliente"
                      ? "Suas ordens de serviço"
                      : "Todas as ordens de serviço"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {filteredOrdens.map((os, index) => {
                    const offlineInfo = os.offlineLocalId ? offlineEntriesMap.get(os.offlineLocalId) : null
                    return (
                      <div
                        key={os.id}
                        className={`p-4 ${index !== filteredOrdens.length - 1 ? "border-b border-border" : ""} ${
                          os.deleted_at ? "bg-red-50 opacity-75" : ""
                        }`}
                      >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="font-medium text-foreground">{os.numeroOS}</div>
                          {os.deleted_at && (
                            <Badge variant="destructive" className="text-xs">
                              Excluída
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(os.status)}>{getStatusText(os.status)}</Badge>
                          {os.offlineLocalId && (
                            <Badge variant="outline" className="border-orange-200 bg-orange-50 text-orange-800 text-xs">
                              Offline
                            </Badge>
                          )}
                          {hasPermission("read_os") && (
                            <Button size="sm" variant="ghost" onClick={() => setSelectedOS(os)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                        <div>
                          <strong>Cliente:</strong> {os.cliente}
                        </div>
                        <div>
                          <strong>Técnico:</strong> {os.tecnico}
                        </div>
                        <div>
                          <strong>Tipo:</strong> {os.tipo}
                        </div>
                        <div>
                          <strong>Abertura:</strong> {new Date(os.dataAbertura).toLocaleDateString("pt-BR")}
                        </div>
                      </div>

                      {os.chamados && os.chamados.length > 0 && (
                        <div className="mb-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <div className="text-sm font-medium text-orange-800 mb-2">Descrição do Chamado:</div>
                          {os.chamados.map((chamado, idx) => (
                            <div key={idx} className="text-sm text-orange-700">
                              <div>
                                <strong>N° Série:</strong> {chamado.numeroSerie}
                              </div>
                              <div>
                                <strong>Defeito:</strong> {chamado.defeito}
                              </div>
                              <div>
                                <strong>Obs:</strong> {chamado.observacoes}
                              </div>
                              {idx < os.chamados.length - 1 && <hr className="my-2 border-orange-300" />}
                            </div>
                          ))}
                        </div>
                      )}

                      {os.defeitosTecnicos && os.defeitosTecnicos.length > 0 && (
                        <div className="mb-3 p-3 bg-red-50 rounded-lg border border-red-200">
                          <div className="text-sm font-medium text-red-800 mb-2">Descrição do Defeito (Técnico):</div>
                          {os.defeitosTecnicos.map((defeito, idx) => (
                            <div key={idx} className="text-sm text-red-700">
                              <div>
                                <strong>N° Série:</strong> {defeito.numeroSerie}
                              </div>
                              <div>
                                <strong>Categoria:</strong> {defeito.categoria}
                              </div>
                              <div className="text-xs mt-1">
                                {defeito.comp_queimado && "• Compressor Queimado "}
                                {defeito.comp_corrente_alta && "• Corrente Alta "}
                                {defeito.vaz_nao_localizado && "• Vazamento Não Localizado "}
                                {defeito.ref_regulagem_parametros && "• Regulagem de Parâmetros "}
                              </div>
                              {idx < os.defeitosTecnicos.length - 1 && <hr className="my-2 border-red-300" />}
                            </div>
                          ))}
                        </div>
                      )}

                      {os.custos && os.custos.length > 0 && (
                        <div className="mb-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                          <div className="text-sm font-medium text-emerald-800 mb-2">Custos do Serviço:</div>
                          {os.custos.map((custo, idx) => (
                            <div key={idx} className="text-sm text-emerald-700">
                              <div>
                                <strong>{custo.name}:</strong>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-xs mt-1">
                                <div>Deslocamento: R$ {custo.deslocamento?.totalValor?.toFixed(2) || "0,00"}</div>
                                <div>Horas Trab.: R$ {custo.horasTrabalhadas?.totalValor?.toFixed(2) || "0,00"}</div>
                                <div>Quilometragem: R$ {custo.quilometragem?.totalValor?.toFixed(2) || "0,00"}</div>
                                <div>Materiais: R$ {custo.materiaisTotal?.toFixed(2) || "0,00"}</div>
                              </div>
                              <div className="font-medium mt-1">Total: R$ {custo.valorTotal?.toFixed(2) || "0,00"}</div>
                              {idx < os.custos.length - 1 && <hr className="my-2 border-emerald-300" />}
                            </div>
                          ))}
                          <div className="text-sm font-bold text-emerald-800 mt-2 pt-2 border-t border-emerald-300">
                            Valor Total da OS: R$ {os.valor_total?.toFixed(2) || "0,00"}
                          </div>
                        </div>
                      )}

                      {os.descricao && (
                        <div className="mt-2 text-sm text-muted-foreground">
                          <strong>Descrição:</strong>{" "}
                          {os.descricao.length > 100 ? `${os.descricao.substring(0, 100)}...` : os.descricao}
                        </div>
                      )}

                      {offlineInfo && (
                        <div className="mt-3 flex items-start gap-2 text-xs text-orange-800 bg-orange-50 border border-orange-200 rounded p-2">
                          <AlertCircle className="h-3.5 w-3.5 mt-0.5" />
                          <span>
                            {offlineInfo.status === "error"
                              ? `Erro ao sincronizar. ${offlineInfo.error || "Tente novamente mais tarde."}`
                              : "Aguardando sincronização. Essa OS será enviada automaticamente quando a conexão for restabelecida."}
                          </span>
                        </div>
                      )}

                      {os.deleted_at && hasPermission("view_deleted") && (
                        <div className="mt-2 text-xs text-red-600 bg-red-100 p-2 rounded">
                          <strong>Excluída em:</strong> {new Date(os.deleted_at).toLocaleString("pt-BR")}
                        </div>
                      )}
                      </div>
                    )
                  })}

                  {filteredOrdens.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhuma ordem de serviço encontrada</p>
                      {searchTerm && <p className="text-sm mt-1">Tente ajustar os filtros de busca</p>}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {(user?.role === "funcionario" || user?.role === "admin") && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Informativos aos Técnicos
                  </CardTitle>
                  <CardDescription>Crie informativos sobre prazos, pagamentos e orientações técnicas</CardDescription>
                </CardHeader>
                <CardContent>
                  <CriarInformativo />
                </CardContent>
              </Card>
            )}
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary border-b border-border px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary-foreground">FAST</h1>
            <p className="text-sm text-primary-foreground/90 font-medium">Sistema de Ordens de Serviço</p>
            <p className="text-xs text-primary-foreground/75">
              {user?.nome} • {user?.role.toUpperCase()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <OfflineIndicator />
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setShowNotifications(true)}
              className="relative bg-white/10 hover:bg-white/20 text-primary-foreground border-white/20"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 text-xs p-0 flex items-center justify-center bg-accent"
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </Badge>
              )}
            </Button>
            {hasPermission("create_os") &&
              (user?.role === "funcionario" || user?.role === "admin") &&
              activeTab === "dashboard" && (
                <Button
                  size="sm"
                  onClick={() => setShowNovaOS(true)}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Nova OS
                </Button>
              )}
            <Button
              size="sm"
              variant="secondary"
              onClick={logout}
              className="bg-white/10 hover:bg-white/20 text-primary-foreground border-white/20"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">{renderContent()}</main>

      {/* Bottom Navigation - Only show available tabs based on permissions */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-primary to-secondary border-t border-border shadow-lg">
        <div className={`grid gap-1`} style={{ gridTemplateColumns: `repeat(${availableTabs.length}, 1fr)` }}>
          {availableTabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-3 px-2 text-xs font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-accent-foreground bg-accent/20 border-t-2 border-t-accent"
                    : "text-primary-foreground/75 hover:text-primary-foreground hover:bg-white/10"
                }`}
              >
                <IconComponent className="h-5 w-5 mb-1" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </nav>

      <div className="h-20"></div>

      {/* Modals */}
      {showNovaOS && hasPermission("create_os") && (user?.role === "funcionario" || user?.role === "admin") && (
        <NovaOSForm onClose={() => setShowNovaOS(false)} onSave={handleNovaOS} />
      )}

      {selectedOS && <OSDetalhes os={selectedOS} onClose={() => setSelectedOS(null)} onUpdate={handleUpdateOS} />}

      <NotificationCenter
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
        onDeleteNotification={deleteNotification}
      />

      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  )
}
