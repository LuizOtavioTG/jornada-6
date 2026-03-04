"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Wrench, MapPin, Star, Clock } from "lucide-react"

interface Tecnico {
  id: number
  nome: string
  email: string
  telefone: string
  empresa: string
  contato: string
  cidade: string
  uf: string
  especialidade: string
  regioes_atendimento: string[]
  nivel_experiencia: string
  disponibilidade: string
  avaliacao: number
  total_os_concluidas: number
}

interface TechnicianSearchProps {
  onTechnicianSelect: (technician: Tecnico) => void
  selectedTechnician: Tecnico | null
  clientRegion?: string
}

export default function TechnicianSearch({
  onTechnicianSelect,
  selectedTechnician,
  clientRegion,
}: TechnicianSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showNewTechnicianForm, setShowNewTechnicianForm] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [filteredTechnicians, setFilteredTechnicians] = useState<Tecnico[]>([])

  const mockTechnicians: Tecnico[] = [
    {
      id: 1,
      nome: "João Silva",
      email: "joao.silva@fast.com",
      telefone: "(11) 91234-5678",
      empresa: "FAST Refrigeração",
      contato: "João Silva",
      cidade: "São Paulo",
      uf: "SP",
      especialidade: "Refrigeração Comercial",
      regioes_atendimento: ["Centro", "Zona Norte"],
      nivel_experiencia: "Sênior",
      disponibilidade: "Disponível",
      avaliacao: 4.8,
      total_os_concluidas: 245,
    },
    {
      id: 2,
      nome: "Maria Santos",
      email: "maria.santos@fast.com",
      telefone: "(11) 92345-6789",
      empresa: "FAST Refrigeração",
      contato: "Maria Santos",
      cidade: "São Paulo",
      uf: "SP",
      especialidade: "Sistemas Elétricos",
      regioes_atendimento: ["Centro", "Zona Sul"],
      nivel_experiencia: "Pleno",
      disponibilidade: "Disponível",
      avaliacao: 4.6,
      total_os_concluidas: 189,
    },
    {
      id: 3,
      nome: "Carlos Oliveira",
      email: "carlos.oliveira@fast.com",
      telefone: "(11) 93456-7890",
      empresa: "FAST Refrigeração",
      contato: "Carlos Oliveira",
      cidade: "São Paulo",
      uf: "SP",
      especialidade: "Refrigeração Industrial",
      regioes_atendimento: ["Zona Norte", "Grande SP"],
      nivel_experiencia: "Sênior",
      disponibilidade: "Ocupado",
      avaliacao: 4.9,
      total_os_concluidas: 312,
    },
    {
      id: 4,
      nome: "Ana Costa",
      email: "ana.costa@fast.com",
      telefone: "(11) 94567-8901",
      empresa: "FAST Refrigeração",
      contato: "Ana Costa",
      cidade: "São Paulo",
      uf: "SP",
      especialidade: "Manutenção Preventiva",
      regioes_atendimento: ["Zona Sul", "Zona Oeste"],
      nivel_experiencia: "Pleno",
      disponibilidade: "Disponível",
      avaliacao: 4.7,
      total_os_concluidas: 156,
    },
    {
      id: 5,
      nome: "Roberto Lima",
      email: "roberto.lima@fast.com",
      telefone: "(11) 95678-9012",
      empresa: "FAST Refrigeração",
      contato: "Roberto Lima",
      cidade: "São Paulo",
      uf: "SP",
      especialidade: "Eletrônica e Controles",
      regioes_atendimento: ["Zona Leste", "Grande SP"],
      nivel_experiencia: "Júnior",
      disponibilidade: "Disponível",
      avaliacao: 4.3,
      total_os_concluidas: 87,
    },
    {
      id: 6,
      nome: "Fernanda Silva",
      email: "fernanda.silva@fast.com",
      telefone: "(11) 96789-0123",
      empresa: "FAST Refrigeração",
      contato: "Fernanda Silva",
      cidade: "São Paulo",
      uf: "SP",
      especialidade: "Refrigeração Comercial",
      regioes_atendimento: ["Centro", "Zona Oeste"],
      nivel_experiencia: "Sênior",
      disponibilidade: "Disponível",
      avaliacao: 4.8,
      total_os_concluidas: 278,
    },
  ]

  const [newTechnician, setNewTechnician] = useState<Partial<Tecnico>>({
    nome: "",
    email: "",
    telefone: "",
    empresa: "FAST Refrigeração",
    contato: "",
    cidade: "",
    uf: "",
    especialidade: "",
    regioes_atendimento: [],
    nivel_experiencia: "",
    disponibilidade: "Disponível",
    avaliacao: 0,
    total_os_concluidas: 0,
  })

  useEffect(() => {
    let filtered = mockTechnicians.filter(
      (tech) =>
        tech.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tech.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tech.especialidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tech.regioes_atendimento.some((regiao) => regiao.toLowerCase().includes(searchTerm.toLowerCase())),
    )

    if (clientRegion) {
      const techsInRegion = filtered.filter((tech) => tech.regioes_atendimento.includes(clientRegion))
      const techsOutsideRegion = filtered.filter((tech) => !tech.regioes_atendimento.includes(clientRegion))
      filtered = [...techsInRegion, ...techsOutsideRegion]
    }

    filtered.sort((a, b) => {
      if (a.disponibilidade === "Disponível" && b.disponibilidade !== "Disponível") return -1
      if (a.disponibilidade !== "Disponível" && b.disponibilidade === "Disponível") return 1
      return b.avaliacao - a.avaliacao
    })

    setFilteredTechnicians(filtered)
  }, [searchTerm, clientRegion])

  const handleSearch = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setShowSearchResults(true)
  }

  const handleCreateTechnician = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    const technicianWithId: Tecnico = {
      ...(newTechnician as Tecnico),
      id: Date.now(),
    }
    onTechnicianSelect(technicianWithId)
    setShowNewTechnicianForm(false)
    setNewTechnician({
      empresa: "FAST Refrigeração",
      regioes_atendimento: [],
      disponibilidade: "Disponível",
      avaliacao: 0,
      total_os_concluidas: 0,
    })
  }

  const ufs = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ]

  const especialidades = [
    "Refrigeração Comercial",
    "Refrigeração Industrial",
    "Sistemas Elétricos",
    "Eletrônica e Controles",
    "Manutenção Preventiva",
    "Ar Condicionado",
    "Geral",
  ]

  const regioes = ["Centro", "Zona Norte", "Zona Sul", "Zona Leste", "Zona Oeste", "Grande SP"]
  const niveisExperiencia = ["Júnior", "Pleno", "Sênior"]

  const getAvailabilityColor = (disponibilidade: string) => {
    switch (disponibilidade) {
      case "Disponível":
        return "bg-green-100 text-green-800"
      case "Ocupado":
        return "bg-red-100 text-red-800"
      case "Parcialmente Disponível":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      {clientRegion && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-blue-700">
            <MapPin className="h-4 w-4" />
            <span>
              Técnicos para região: <strong>{clientRegion}</strong> serão priorizados
            </span>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, email, especialidade ou região..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleSearch()
              }
            }}
            className="pl-10"
          />
        </div>
        <Button type="button" onClick={(e) => handleSearch(e)} variant="outline">
          <Search className="h-4 w-4 mr-1" />
          Buscar
        </Button>
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setShowNewTechnicianForm(true)
          }}
          variant="outline"
        >
          <Plus className="h-4 w-4 mr-1" />
          Novo
        </Button>
      </div>

      {selectedTechnician && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-800">Técnico Selecionado</span>
              <Badge className={getAvailabilityColor(selectedTechnician.disponibilidade)}>
                <Clock className="h-3 w-3 mr-1" />
                {selectedTechnician.disponibilidade}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p>
                  <strong>Nome:</strong> {selectedTechnician.nome}
                </p>
                <p>
                  <strong>Especialidade:</strong> {selectedTechnician.especialidade}
                </p>
                <p>
                  <strong>Experiência:</strong> {selectedTechnician.nivel_experiencia}
                </p>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>
                    <strong>Avaliação:</strong> {selectedTechnician.avaliacao}/5.0
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p>
                  <strong>Telefone:</strong> {selectedTechnician.telefone}
                </p>
                <p>
                  <strong>Email:</strong> {selectedTechnician.email}
                </p>
                <p>
                  <strong>OS Concluídas:</strong> {selectedTechnician.total_os_concluidas}
                </p>
                <p>
                  <strong>Regiões:</strong> {selectedTechnician.regioes_atendimento.join(", ")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={showSearchResults} onOpenChange={setShowSearchResults}>
        <DialogContent className="max-w-7xl max-h-[85vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>
              Técnicos Disponíveis ({filteredTechnicians.length} encontrados)
              {clientRegion && (
                <span className="text-sm font-normal text-muted-foreground ml-2">- Região: {clientRegion}</span>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto h-[65vh] space-y-3 pr-2">
            {filteredTechnicians.map((tech) => (
              <Card
                key={tech.id}
                className={`cursor-pointer hover:bg-muted/50 transition-colors ${
                  clientRegion && tech.regioes_atendimento.includes(clientRegion)
                    ? "ring-2 ring-blue-200 bg-blue-50/30"
                    : ""
                }`}
                onClick={() => {
                  onTechnicianSelect(tech)
                  setShowSearchResults(false)
                }}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-4">
                      <div className="flex flex-wrap items-center gap-2 min-w-0 flex-1">
                        <Wrench className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <span className="font-medium truncate">{tech.nome}</span>
                        {clientRegion && tech.regioes_atendimento.includes(clientRegion) && (
                          <Badge variant="default" className="bg-blue-600 flex-shrink-0">
                            <MapPin className="h-3 w-3 mr-1" />
                            Região Compatível
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 flex-shrink-0 md:ml-2">
                        <Badge variant="outline" className="text-xs whitespace-nowrap flex-shrink-0">
                          {tech.especialidade}
                        </Badge>
                        <Badge
                          className={`text-xs whitespace-nowrap flex-shrink-0 ${getAvailabilityColor(
                            tech.disponibilidade,
                          )}`}
                        >
                          {tech.disponibilidade}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div className="space-y-1">
                        <p>
                          <strong>Experiência:</strong> {tech.nivel_experiencia}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p>
                          <strong>Telefone:</strong> {tech.telefone}
                        </p>
                        <p className="truncate">
                          <strong>Email:</strong> {tech.email}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p>
                          <strong>OS Concluídas:</strong> {tech.total_os_concluidas}
                        </p>
                        <p>
                          <strong>Cidade:</strong> {tech.cidade}/{tech.uf}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p>
                          <strong>Regiões de Atendimento:</strong>
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {tech.regioes_atendimento.map((regiao) => (
                            <Badge
                              key={regiao}
                              variant="secondary"
                              className={`text-xs ${clientRegion === regiao ? "bg-blue-100 text-blue-800" : ""}`}
                            >
                              {regiao}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredTechnicians.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>Nenhum técnico encontrado</p>
                <Button type="button" onClick={() => setShowNewTechnicianForm(true)} className="mt-2">
                  <Plus className="h-4 w-4 mr-1" />
                  Cadastrar Novo Técnico
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showNewTechnicianForm} onOpenChange={setShowNewTechnicianForm}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Cadastrar Novo Técnico</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[60vh] space-y-4 pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome *</Label>
                <Input
                  value={newTechnician.nome || ""}
                  onChange={(e) => setNewTechnician({ ...newTechnician, nome: e.target.value })}
                  placeholder="Nome completo"
                />
              </div>
              <div className="space-y-2">
                <Label>Email *</Label>
                <Input
                  value={newTechnician.email || ""}
                  onChange={(e) => setNewTechnician({ ...newTechnician, email: e.target.value })}
                  placeholder="email@empresa.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Empresa</Label>
                <Input
                  value={newTechnician.empresa || ""}
                  onChange={(e) => setNewTechnician({ ...newTechnician, empresa: e.target.value })}
                  placeholder="Nome da empresa"
                />
              </div>
              <div className="space-y-2">
                <Label>Telefone</Label>
                <Input
                  value={newTechnician.telefone || ""}
                  onChange={(e) => setNewTechnician({ ...newTechnician, telefone: e.target.value })}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Cidade</Label>
                <Input
                  value={newTechnician.cidade || ""}
                  onChange={(e) => setNewTechnician({ ...newTechnician, cidade: e.target.value })}
                  placeholder="Cidade"
                />
              </div>
              <div className="space-y-2">
                <Label>UF</Label>
                <Select
                  value={newTechnician.uf || ""}
                  onValueChange={(value) => setNewTechnician({ ...newTechnician, uf: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="UF" />
                  </SelectTrigger>
                  <SelectContent>
                    {ufs.map((uf) => (
                      <SelectItem key={uf} value={uf}>
                        {uf}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Nível de Experiência</Label>
                <Select
                  value={newTechnician.nivel_experiencia || ""}
                  onValueChange={(value) => setNewTechnician({ ...newTechnician, nivel_experiencia: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Nível" />
                  </SelectTrigger>
                  <SelectContent>
                    {niveisExperiencia.map((nivel) => (
                      <SelectItem key={nivel} value={nivel}>
                        {nivel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Especialidade</Label>
                <Select
                  value={newTechnician.especialidade || ""}
                  onValueChange={(value) => setNewTechnician({ ...newTechnician, especialidade: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Especialidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {especialidades.map((esp) => (
                      <SelectItem key={esp} value={esp}>
                        {esp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Regiões de Atendimento</Label>
                <div className="grid grid-cols-2 gap-2 p-2 border rounded">
                  {regioes.map((regiao) => (
                    <label key={regiao} className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={newTechnician.regioes_atendimento?.includes(regiao) || false}
                        onChange={(e) => {
                          const current = newTechnician.regioes_atendimento || []
                          if (e.target.checked) {
                            setNewTechnician({
                              ...newTechnician,
                              regioes_atendimento: [...current, regiao],
                            })
                          } else {
                            setNewTechnician({
                              ...newTechnician,
                              regioes_atendimento: current.filter((r) => r !== regiao),
                            })
                          }
                        }}
                      />
                      <span>{regiao}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowNewTechnicianForm(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button type="button" onClick={(e) => handleCreateTechnician(e)} className="flex-1">
                Cadastrar Técnico
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
