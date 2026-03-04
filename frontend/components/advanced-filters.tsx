"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Filter, X } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface FilterState {
  cliente: string
  tecnico: string
  status: string
  tipo: string
  prioridade: string
  dataInicio: Date | undefined
  dataFim: Date | undefined
  valor: { min: string; max: string }
}

interface AdvancedFiltersProps {
  onFiltersChange: (filters: FilterState) => void
  onClearFilters: () => void
}

export function AdvancedFilters({ onFiltersChange, onClearFilters }: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    cliente: "",
    tecnico: "Todos",
    status: "Todos",
    tipo: "Todos",
    prioridade: "Todas",
    dataInicio: undefined,
    dataFim: undefined,
    valor: { min: "", max: "" },
  })

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearAllFilters = () => {
    const emptyFilters: FilterState = {
      cliente: "",
      tecnico: "Todos",
      status: "Todos",
      tipo: "Todos",
      prioridade: "Todas",
      dataInicio: undefined,
      dataFim: undefined,
      valor: { min: "", max: "" },
    }
    setFilters(emptyFilters)
    onClearFilters()
  }

  const activeFiltersCount = Object.values(filters).filter((value) => {
    if (typeof value === "string") return value !== ""
    if (typeof value === "object" && value !== null && "min" in value) {
      return value.min !== "" || value.max !== ""
    }
    return value !== undefined
  }).length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filtros Avançados
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>

        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            <X className="h-4 w-4 mr-1" />
            Limpar
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-lg bg-card">
          <div className="space-y-2">
            <Label htmlFor="cliente-filter">Cliente</Label>
            <Input
              id="cliente-filter"
              placeholder="Nome do cliente..."
              value={filters.cliente}
              onChange={(e) => updateFilter("cliente", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tecnico-filter">Técnico</Label>
            <Select value={filters.tecnico} onValueChange={(value) => updateFilter("tecnico", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar técnico" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="João Silva">João Silva</SelectItem>
                <SelectItem value="Maria Santos">Maria Santos</SelectItem>
                <SelectItem value="Pedro Costa">Pedro Costa</SelectItem>
                <SelectItem value="Ana Oliveira">Ana Oliveira</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status-filter">Status</Label>
            <Select value={filters.status} onValueChange={(value) => updateFilter("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="aberta">Aberta</SelectItem>
                <SelectItem value="em-andamento">Em Andamento</SelectItem>
                <SelectItem value="concluida">Concluída</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipo-filter">Tipo de Serviço</Label>
            <Select value={filters.tipo} onValueChange={(value) => updateFilter("tipo", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="manutencao-preventiva">Manutenção Preventiva</SelectItem>
                <SelectItem value="instalacao">Instalação</SelectItem>
                <SelectItem value="reparo">Reparo</SelectItem>
                <SelectItem value="emergencia">Emergência</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prioridade-filter">Prioridade</Label>
            <Select value={filters.prioridade} onValueChange={(value) => updateFilter("prioridade", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todas">Todas</SelectItem>
                <SelectItem value="baixa">Baixa</SelectItem>
                <SelectItem value="media">Média</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="critica">Crítica</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Período</Label>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex-1 justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dataInicio ? format(filters.dataInicio, "dd/MM/yyyy", { locale: ptBR }) : "Início"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.dataInicio}
                    onSelect={(date) => updateFilter("dataInicio", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex-1 justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dataFim ? format(filters.dataFim, "dd/MM/yyyy", { locale: ptBR }) : "Fim"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.dataFim}
                    onSelect={(date) => updateFilter("dataFim", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2 md:col-span-2 lg:col-span-1">
            <Label>Valor do Serviço</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Min"
                value={filters.valor.min}
                onChange={(e) => updateFilter("valor", { ...filters.valor, min: e.target.value })}
                type="number"
              />
              <Input
                placeholder="Max"
                value={filters.valor.max}
                onChange={(e) => updateFilter("valor", { ...filters.valor, max: e.target.value })}
                type="number"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
