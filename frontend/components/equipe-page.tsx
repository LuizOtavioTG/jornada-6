"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, User, Eye, Users, Award, TrendingUp, UserCheck } from "lucide-react"
import TecnicoForm from "./tecnico-form"
import TecnicoDetalhes from "./tecnico-detalhes"

interface EquipePageProps {
  ordensServico: any[]
}

export default function EquipePage({ ordensServico }: EquipePageProps) {
  const [showNovoTecnico, setShowNovoTecnico] = useState(false)
  const [selectedTecnico, setSelectedTecnico] = useState(null)
  const [editingTecnico, setEditingTecnico] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [especialidadeFilter, setEspecialidadeFilter] = useState("todas")
  const [statusFilter, setStatusFilter] = useState("todos")

  const [tecnicos, setTecnicos] = useState([
    {
      id: "tecnico-1",
      nome: "João Silva",
      email: "joao.silva@empresa.com",
      telefone: "(11) 99999-1234",
      especialidade: "Refrigeração Comercial",
      nivel: "senior",
      ativo: true,
      observacoes: "Especialista em sistemas de grande porte, certificado em refrigeração industrial",
      createdAt: "2023-06-15T08:00:00Z",
      updatedAt: "2024-01-10T14:30:00Z",
    },
    {
      id: "tecnico-2",
      nome: "Maria Santos",
      email: "maria.santos@empresa.com",
      telefone: "(11) 88888-5678",
      especialidade: "Instalação de Equipamentos",
      nivel: "pleno",
      ativo: true,
      observacoes: "Excelente em instalações complexas, boa comunicação com clientes",
      createdAt: "2023-08-20T10:15:00Z",
      updatedAt: "2024-01-15T09:45:00Z",
    },
    {
      id: "tecnico-3",
      nome: "Pedro Costa",
      email: "pedro.costa@empresa.com",
      telefone: "(11) 77777-9012",
      especialidade: "Manutenção Preventiva",
      nivel: "senior",
      ativo: true,
      observacoes: "Muito detalhista, especialista em diagnósticos precisos",
      createdAt: "2023-05-10T16:20:00Z",
      updatedAt: "2024-01-08T11:10:00Z",
    },
    {
      id: "tecnico-4",
      nome: "Ana Oliveira",
      email: "ana.oliveira@empresa.com",
      telefone: "(11) 66666-3456",
      especialidade: "Sistemas de Ar Condicionado",
      nivel: "junior",
      ativo: true,
      observacoes: "Técnica em formação, muito dedicada e pontual",
      createdAt: "2023-11-01T09:00:00Z",
      updatedAt: "2024-01-12T16:00:00Z",
    },
    {
      id: "tecnico-5",
      nome: "Carlos Ferreira",
      email: "carlos.ferreira@empresa.com",
      telefone: "(11) 55555-7890",
      especialidade: "Reparos Elétricos",
      nivel: "especialista",
      ativo: false,
      observacoes: "Aposentado, disponível para consultorias especiais",
      createdAt: "2022-01-15T08:00:00Z",
      updatedAt: "2023-12-20T15:30:00Z",
    },
  ])

  const especialidades = [
    "Refrigeração Comercial",
    "Sistemas de Ar Condicionado",
    "Manutenção Preventiva",
    "Instalação de Equipamentos",
    "Reparos Elétricos",
    "Diagnóstico Técnico",
  ]

  const filteredTecnicos = tecnicos.filter((tecnico) => {
    const matchesSearch =
      searchTerm === "" ||
      tecnico.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tecnico.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tecnico.especialidade.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesEspecialidade = especialidadeFilter === "todas" || tecnico.especialidade === especialidadeFilter

    const matchesStatus =
      statusFilter === "todos" ||
      (statusFilter === "ativo" && tecnico.ativo) ||
      (statusFilter === "inativo" && !tecnico.ativo)

    return matchesSearch && matchesEspecialidade && matchesStatus
  })

  const handleNovoTecnico = (tecnicoData: any) => {
    setTecnicos([tecnicoData, ...tecnicos])
  }

  const handleEditTecnico = (tecnicoData: any) => {
    setTecnicos(tecnicos.map((t) => (t.id === tecnicoData.id ? tecnicoData : t)))
    setEditingTecnico(null)
  }

  const getTecnicoOSCount = (tecnicoNome: string) => {
    return ordensServico.filter((os) => os.tecnico === tecnicoNome).length
  }

  const getTecnicoLastOS = (tecnicoNome: string) => {
    const osTecnico = ordensServico.filter((os) => os.tecnico === tecnicoNome)
    if (osTecnico.length === 0) return null
    return osTecnico.sort((a, b) => new Date(b.dataAbertura).getTime() - new Date(a.dataAbertura).getTime())[0]
  }

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case "junior":
        return "bg-blue-100 text-blue-800"
      case "pleno":
        return "bg-yellow-100 text-yellow-800"
      case "senior":
        return "bg-green-100 text-green-800"
      case "especialista":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getNivelText = (nivel: string) => {
    switch (nivel) {
      case "junior":
        return "Júnior"
      case "pleno":
        return "Pleno"
      case "senior":
        return "Sênior"
      case "especialista":
        return "Especialista"
      default:
        return nivel
    }
  }

  const calcularEstatisticasGerais = () => {
    const totalTecnicos = tecnicos.length
    const tecnicosAtivos = tecnicos.filter((t) => t.ativo).length
    const totalOS = ordensServico.length
    const osMediaPorTecnico = tecnicosAtivos > 0 ? Math.round(totalOS / tecnicosAtivos) : 0

    return { totalTecnicos, tecnicosAtivos, totalOS, osMediaPorTecnico }
  }

  const stats = calcularEstatisticasGerais()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Equipe</h2>
          <p className="text-muted-foreground">Gerencie sua equipe de técnicos</p>
        </div>
        <Button onClick={() => setShowNovoTecnico(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Técnico
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{stats.totalTecnicos}</div>
                <p className="text-sm text-muted-foreground">Total Técnicos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{stats.tecnicosAtivos}</div>
                <p className="text-sm text-muted-foreground">Técnicos Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{stats.osMediaPorTecnico}</div>
                <p className="text-sm text-muted-foreground">OS por Técnico</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{especialidades.length}</div>
                <p className="text-sm text-muted-foreground">Especialidades</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar por nome, email ou especialidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={especialidadeFilter} onValueChange={setEspecialidadeFilter}>
              <SelectTrigger className="w-full sm:w-56">
                <SelectValue placeholder="Filtrar por especialidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas Especialidades</SelectItem>
                {especialidades.map((esp) => (
                  <SelectItem key={esp} value={esp}>
                    {esp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="ativo">Ativos</SelectItem>
                <SelectItem value="inativo">Inativos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Técnicos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Lista de Técnicos ({filteredTecnicos.length})
          </CardTitle>
          <CardDescription>
            {searchTerm || especialidadeFilter !== "todas" || statusFilter !== "todos"
              ? `Resultados filtrados de ${tecnicos.length} técnicos total`
              : "Todos os técnicos cadastrados"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {filteredTecnicos.length > 0 ? (
            <div className="space-y-0">
              {filteredTecnicos.map((tecnico, index) => {
                const osCount = getTecnicoOSCount(tecnico.nome)
                const lastOS = getTecnicoLastOS(tecnico.nome)

                return (
                  <div
                    key={tecnico.id}
                    className={`p-4 ${index !== filteredTecnicos.length - 1 ? "border-b border-border" : ""}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-medium text-foreground break-words">{tecnico.nome}</h3>
                          <Badge className={getNivelColor(tecnico.nivel)}>{getNivelText(tecnico.nivel)}</Badge>
                          {!tecnico.ativo && <Badge variant="secondary">Inativo</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground break-words">{tecnico.email}</p>
                      </div>
                      <div className="flex items-center gap-2 sm:self-start">
                        <div className="text-right min-w-[110px]">
                          <div className="text-sm font-medium text-primary">{osCount} OS</div>
                          <div className="text-xs text-muted-foreground">
                            {lastOS ? `Última: ${new Date(lastOS.dataAbertura).toLocaleDateString("pt-BR")}` : "Sem OS"}
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => setSelectedTecnico(tecnico)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div>
                        <strong>Especialidade:</strong> {tecnico.especialidade}
                      </div>
                      {tecnico.telefone && (
                        <div>
                          <strong>Telefone:</strong> {tecnico.telefone}
                        </div>
                      )}
                    </div>

                    {tecnico.observacoes && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        <strong>Observações:</strong>{" "}
                        {tecnico.observacoes.length > 100
                          ? `${tecnico.observacoes.substring(0, 100)}...`
                          : tecnico.observacoes}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum técnico encontrado</p>
              {searchTerm && <p className="text-sm mt-1">Tente ajustar os filtros de busca</p>}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      {showNovoTecnico && <TecnicoForm onClose={() => setShowNovoTecnico(false)} onSave={handleNovoTecnico} />}

      {editingTecnico && (
        <TecnicoForm tecnico={editingTecnico} onClose={() => setEditingTecnico(null)} onSave={handleEditTecnico} />
      )}

      {selectedTecnico && (
        <TecnicoDetalhes
          tecnico={selectedTecnico}
          ordensServico={ordensServico}
          onClose={() => setSelectedTecnico(null)}
          onEdit={(tecnico) => {
            setSelectedTecnico(null)
            setEditingTecnico(tecnico)
          }}
        />
      )}
    </div>
  )
}
