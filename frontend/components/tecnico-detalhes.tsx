"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Edit, User, Mail, Phone, Award, Calendar, FileText, TrendingUp } from "lucide-react"

interface TecnicoDetalhesProps {
  tecnico: any
  ordensServico: any[]
  onClose: () => void
  onEdit: (tecnico: any) => void
}

export default function TecnicoDetalhes({ tecnico, ordensServico, onClose, onEdit }: TecnicoDetalhesProps) {
  const osDoTecnico = ordensServico.filter((os) => os.tecnico === tecnico.nome)

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
      default:
        return status
    }
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const calcularEstatisticas = () => {
    const total = osDoTecnico.length
    const concluidas = osDoTecnico.filter((os) => os.status === "concluida").length
    const emAndamento = osDoTecnico.filter((os) => os.status === "em_andamento").length
    const taxaConclusao = total > 0 ? Math.round((concluidas / total) * 100) : 0

    // Calcular tempo médio de conclusão (simulado)
    const tempoMedio = concluidas > 0 ? Math.round(Math.random() * 5 + 2) : 0

    return { total, concluidas, emAndamento, taxaConclusao, tempoMedio }
  }

  const stats = calcularEstatisticas()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {tecnico.nome}
              {!tecnico.ativo && <Badge variant="secondary">Inativo</Badge>}
            </CardTitle>
            <CardDescription>Detalhes do técnico e histórico de serviços</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(tecnico)}>
              <Edit className="h-4 w-4 mr-1" />
              Editar
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Informações do Técnico */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Dados Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Nome:</span>
                  <p className="font-medium">{tecnico.nome}</p>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    E-mail:
                  </span>
                  <p className="font-medium">{tecnico.email}</p>
                </div>

                {tecnico.telefone && (
                  <div>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      Telefone:
                    </span>
                    <p className="font-medium">{tecnico.telefone}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Dados Profissionais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Especialidade:</span>
                  <p className="font-medium">{tecnico.especialidade}</p>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground">Nível:</span>
                  <div className="mt-1">
                    <Badge className={getNivelColor(tecnico.nivel)}>{getNivelText(tecnico.nivel)}</Badge>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <div className="mt-1">
                    <Badge variant={tecnico.ativo ? "default" : "secondary"}>
                      {tecnico.ativo ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Observações */}
          {tecnico.observacoes && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Observações</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{tecnico.observacoes}</p>
              </CardContent>
            </Card>
          )}

          {/* Estatísticas de Performance */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Estatísticas de Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{stats.total}</div>
                  <p className="text-sm text-muted-foreground">Total OS</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.concluidas}</div>
                  <p className="text-sm text-muted-foreground">Concluídas</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{stats.emAndamento}</div>
                  <p className="text-sm text-muted-foreground">Em Andamento</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.taxaConclusao}%</div>
                  <p className="text-sm text-muted-foreground">Taxa Conclusão</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{stats.tempoMedio}d</div>
                  <p className="text-sm text-muted-foreground">Tempo Médio</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Histórico de OS */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Histórico de Ordens de Serviço ({osDoTecnico.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {osDoTecnico.length > 0 ? (
                <div className="space-y-0">
                  {osDoTecnico.slice(0, 10).map((os, index) => (
                    <div
                      key={os.id}
                      className={`p-4 ${index !== Math.min(osDoTecnico.length, 10) - 1 ? "border-b border-border" : ""}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-foreground">{os.numeroOS}</div>
                        <Badge className={getStatusColor(os.status)}>{getStatusText(os.status)}</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div>
                          <strong>Cliente:</strong> {os.cliente}
                        </div>
                        <div>
                          <strong>Tipo:</strong> {os.tipo}
                        </div>
                        <div>
                          <strong>Abertura:</strong> {formatDate(os.dataAbertura)}
                        </div>
                        {os.dataConclusao && (
                          <div>
                            <strong>Conclusão:</strong> {formatDate(os.dataConclusao)}
                          </div>
                        )}
                      </div>

                      {os.descricao && (
                        <div className="mt-2 text-sm text-muted-foreground">
                          <strong>Descrição:</strong>{" "}
                          {os.descricao.length > 80 ? `${os.descricao.substring(0, 80)}...` : os.descricao}
                        </div>
                      )}
                    </div>
                  ))}
                  {osDoTecnico.length > 10 && (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      E mais {osDoTecnico.length - 10} ordens de serviço...
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma ordem de serviço encontrada</p>
                  <p className="text-sm mt-1">Este técnico ainda não possui histórico de OS</p>
                </div>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
