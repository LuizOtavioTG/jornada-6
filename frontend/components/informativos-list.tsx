"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, AlertCircle, Info, Clock, DollarSign, Wrench, Eye, ChevronDown, ChevronUp } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface Informativo {
  id: number
  titulo: string
  conteudo: string
  tipo: "geral" | "os_especifica" | "prazo_garantia" | "previsao_pagamento" | "orientacao_tecnica"
  prioridade: "baixa" | "normal" | "alta" | "urgente"
  os_id?: number
  criado_por: string
  criado_em: Date
  lido: boolean
}

const mockInformativos: Informativo[] = [
  {
    id: 1,
    titulo: "Prazo de Garantia - Atenção",
    conteudo:
      "Lembrete: Todas as OS em garantia devem ser concluídas em até 48 horas após abertura. Favor priorizar esses chamados.",
    tipo: "prazo_garantia",
    prioridade: "alta",
    criado_por: "João Silva (Funcionário)",
    criado_em: new Date(2024, 0, 15),
    lido: false,
  },
  {
    id: 2,
    titulo: "Previsão de Pagamento - Janeiro",
    conteudo:
      "Os pagamentos referentes aos serviços de janeiro serão processados até dia 15 de fevereiro. Certifique-se de que todas as OS estejam devidamente finalizadas e assinadas.",
    tipo: "previsao_pagamento",
    prioridade: "normal",
    criado_por: "Administrador",
    criado_em: new Date(2024, 0, 10),
    lido: true,
  },
  {
    id: 3,
    titulo: "Nova Orientação Técnica",
    conteudo:
      "Ao realizar manutenção em compressores, sempre verificar o estado do óleo e registrar na OS. Anexar fotos antes e depois do serviço.",
    tipo: "orientacao_tecnica",
    prioridade: "alta",
    criado_por: "João Silva (Funcionário)",
    criado_em: new Date(2024, 0, 12),
    lido: false,
  },
  {
    id: 4,
    titulo: "OS #1234 - Informação Adicional",
    conteudo: "Cliente solicitou que o técnico entre em contato antes de ir ao local. Telefone: (11) 98765-4321",
    tipo: "os_especifica",
    prioridade: "urgente",
    os_id: 1234,
    criado_por: "João Silva (Funcionário)",
    criado_em: new Date(2024, 0, 16),
    lido: false,
  },
]

const getTipoIcon = (tipo: string) => {
  switch (tipo) {
    case "prazo_garantia":
      return <Clock className="h-4 w-4" />
    case "previsao_pagamento":
      return <DollarSign className="h-4 w-4" />
    case "orientacao_tecnica":
      return <Wrench className="h-4 w-4" />
    case "os_especifica":
      return <AlertCircle className="h-4 w-4" />
    default:
      return <Info className="h-4 w-4" />
  }
}

const getTipoLabel = (tipo: string) => {
  switch (tipo) {
    case "prazo_garantia":
      return "Prazo de Garantia"
    case "previsao_pagamento":
      return "Previsão de Pagamento"
    case "orientacao_tecnica":
      return "Orientação Técnica"
    case "os_especifica":
      return "OS Específica"
    default:
      return "Geral"
  }
}

const getPrioridadeColor = (prioridade: string) => {
  switch (prioridade) {
    case "urgente":
      return "bg-accent text-accent-foreground"
    case "alta":
      return "bg-orange-500 text-white"
    case "normal":
      return "bg-primary text-primary-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function InformativosList() {
  const [informativos, setInformativos] = useState(mockInformativos)
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [filter, setFilter] = useState<"todos" | "nao_lidos">("nao_lidos")

  const handleMarkAsRead = (id: number) => {
    setInformativos((prev) => prev.map((info) => (info.id === id ? { ...info, lido: true } : info)))
  }

  const filteredInformativos = informativos.filter((info) => (filter === "todos" ? true : !info.lido))

  const naoLidos = informativos.filter((info) => !info.lido).length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>Informativos</CardTitle>
            {naoLidos > 0 && (
              <Badge variant="destructive" className="ml-2">
                {naoLidos} novos
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === "nao_lidos" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("nao_lidos")}
              type="button"
            >
              Não Lidos
            </Button>
            <Button
              variant={filter === "todos" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("todos")}
              type="button"
            >
              Todos
            </Button>
          </div>
        </div>
        <CardDescription>Orientações, prazos e informações importantes</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {filteredInformativos.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Nenhum informativo {filter === "nao_lidos" ? "não lido" : "disponível"}</p>
              </div>
            ) : (
              filteredInformativos.map((info) => (
                <Card key={info.id} className={`${!info.lido ? "border-l-4 border-l-primary" : ""}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getTipoIcon(info.tipo)}
                          <Badge variant="outline" className="text-xs">
                            {getTipoLabel(info.tipo)}
                          </Badge>
                          <Badge className={`text-xs ${getPrioridadeColor(info.prioridade)}`}>
                            {info.prioridade.toUpperCase()}
                          </Badge>
                          {info.os_id && (
                            <Badge variant="secondary" className="text-xs">
                              OS #{info.os_id}
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-base">{info.titulo}</CardTitle>
                        <CardDescription className="text-xs mt-1">
                          Por {info.criado_por} • {format(info.criado_em, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedId(expandedId === info.id ? null : info.id)}
                        type="button"
                      >
                        {expandedId === info.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  {expandedId === info.id && (
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-3 whitespace-pre-wrap">{info.conteudo}</p>
                      {!info.lido && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAsRead(info.id)}
                          className="w-full"
                          type="button"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Marcar como Lido
                        </Button>
                      )}
                    </CardContent>
                  )}
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default InformativosList
