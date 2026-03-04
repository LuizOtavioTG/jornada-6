"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ChevronLeft, ChevronRight } from "lucide-react"
import { format, addDays, startOfWeek, isSameDay, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"

interface AgendaPageProps {
  ordensServico: any[]
}

export default function AgendaPage({ ordensServico }: AgendaPageProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"day" | "week">("week")

  // Simular agendamentos baseados nas OS
  const agendamentos = ordensServico.map((os) => ({
    id: os.id,
    numeroOS: os.numeroOS,
    cliente: os.cliente,
    tecnico: os.tecnico,
    endereco: os.endereco,
    contato: os.contato,
    telefone: os.telefone,
    tipo: os.tipo,
    status: os.status,
    dataAgendamento: os.dataInicio || os.dataAbertura,
    horarioInicio: "08:00",
    horarioFim: "12:00",
    observacoes: os.observacoes || "",
  }))

  const getWeekDays = () => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 })
    const days = []
    for (let i = 0; i < 7; i++) {
      days.push(addDays(start, i))
    }
    return days
  }

  const getAgendamentosForDate = (date: Date) => {
    return agendamentos.filter((agendamento) => isSameDay(parseISO(agendamento.dataAgendamento), date))
  }

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
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const navigateWeek = (direction: "prev" | "next") => {
    const days = direction === "next" ? 7 : -7
    setCurrentDate(addDays(currentDate, days))
  }

  const weekDays = getWeekDays()
  const todayAgendamentos = getAgendamentosForDate(new Date())

  return (
    <div className="space-y-6">
      {/* Header da Agenda */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Agenda de Serviços
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant={viewMode === "day" ? "default" : "outline"} size="sm" onClick={() => setViewMode("day")}>
                Dia
              </Button>
              <Button
                variant={viewMode === "week" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("week")}
              >
                Semana
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Navegação da Semana */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={() => navigateWeek("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold">
              {format(weekDays[0], "dd/MM", { locale: ptBR })} - {format(weekDays[6], "dd/MM/yyyy", { locale: ptBR })}
            </h2>
            <Button variant="outline" size="sm" onClick={() => navigateWeek("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resumo do Dia Atual */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Hoje - {format(new Date(), "dd/MM/yyyy", { locale: ptBR })}</CardTitle>
        </CardHeader>
        <CardContent>
          {todayAgendamentos.length > 0 ? (
            <div className="space-y-3">
              {todayAgendamentos.map((agendamento) => (
                <div key={agendamento.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(agendamento.status)}>{agendamento.numeroOS}</Badge>
                      <span className="font-medium">{agendamento.cliente}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {agendamento.horarioInicio} - {agendamento.horarioFim}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {agendamento.tecnico}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">Nenhum agendamento para hoje</p>
          )}
        </CardContent>
      </Card>

      {/* Vista Semanal */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {weekDays.map((day) => {
          const dayAgendamentos = getAgendamentosForDate(day)
          const isToday = isSameDay(day, new Date())

          return (
            <Card key={day.toISOString()} className={isToday ? "ring-2 ring-primary" : ""}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-center">
                  <div className={`${isToday ? "text-primary font-bold" : ""}`}>
                    {format(day, "EEE", { locale: ptBR })}
                  </div>
                  <div className={`text-lg ${isToday ? "text-primary font-bold" : ""}`}>
                    {format(day, "dd", { locale: ptBR })}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {dayAgendamentos.map((agendamento) => (
                    <div key={agendamento.id} className="p-2 bg-muted rounded text-xs">
                      <div className="font-medium truncate">{agendamento.numeroOS}</div>
                      <div className="text-muted-foreground truncate">{agendamento.cliente}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        <span>{agendamento.horarioInicio}</span>
                      </div>
                    </div>
                  ))}
                  {dayAgendamentos.length === 0 && (
                    <div className="text-center text-muted-foreground py-4 text-xs">Sem agendamentos</div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Estatísticas da Semana */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Estatísticas da Semana</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {weekDays.reduce((total, day) => total + getAgendamentosForDate(day).length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Agendamentos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {weekDays.reduce(
                  (total, day) => total + getAgendamentosForDate(day).filter((a) => a.status === "concluida").length,
                  0,
                )}
              </div>
              <div className="text-sm text-muted-foreground">Concluídos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {weekDays.reduce(
                  (total, day) => total + getAgendamentosForDate(day).filter((a) => a.status === "em_andamento").length,
                  0,
                )}
              </div>
              <div className="text-sm text-muted-foreground">Em Andamento</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {weekDays.reduce(
                  (total, day) => total + getAgendamentosForDate(day).filter((a) => a.status === "aberta").length,
                  0,
                )}
              </div>
              <div className="text-sm text-muted-foreground">Pendentes</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
