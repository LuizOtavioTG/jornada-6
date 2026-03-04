"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Edit, Building, MapPin, Phone, Mail, User, FileText, Calendar } from "lucide-react"

interface ClienteDetalhesProps {
  cliente: any
  ordensServico: any[]
  onClose: () => void
  onEdit: (cliente: any) => void
}

export default function ClienteDetalhes({ cliente, ordensServico, onClose, onEdit }: ClienteDetalhesProps) {
  const osDoCliente = ordensServico.filter((os) => os.cliente === cliente.nome)

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              {cliente.nome}
            </CardTitle>
            <CardDescription>Detalhes do cliente e histórico de serviços</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(cliente)}>
              <Edit className="h-4 w-4 mr-1" />
              Editar
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Informações do Cliente */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Dados da Empresa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Razão Social:</span>
                  <p className="font-medium">{cliente.nome}</p>
                </div>

                {cliente.cnpj && (
                  <div>
                    <span className="text-sm text-muted-foreground">CNPJ:</span>
                    <p className="font-medium">{cliente.cnpj}</p>
                  </div>
                )}

                {cliente.endereco && (
                  <div>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      Endereço:
                    </span>
                    <p className="font-medium text-sm leading-relaxed">{cliente.endereco}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {cliente.contatoResponsavel && (
                  <div>
                    <span className="text-sm text-muted-foreground">Responsável:</span>
                    <p className="font-medium">{cliente.contatoResponsavel}</p>
                  </div>
                )}

                {cliente.telefone && (
                  <div>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      Telefone:
                    </span>
                    <p className="font-medium">{cliente.telefone}</p>
                  </div>
                )}

                {cliente.email && (
                  <div>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      E-mail:
                    </span>
                    <p className="font-medium">{cliente.email}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Observações */}
          {cliente.observacoes && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Observações</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{cliente.observacoes}</p>
              </CardContent>
            </Card>
          )}

          {/* Estatísticas de OS */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Resumo de Ordens de Serviço
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{osDoCliente.length}</div>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {osDoCliente.filter((os) => os.status === "aberta").length}
                  </div>
                  <p className="text-sm text-muted-foreground">Abertas</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {osDoCliente.filter((os) => os.status === "em_andamento").length}
                  </div>
                  <p className="text-sm text-muted-foreground">Em Andamento</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {osDoCliente.filter((os) => os.status === "concluida").length}
                  </div>
                  <p className="text-sm text-muted-foreground">Concluídas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Histórico de OS */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Histórico de Ordens de Serviço ({osDoCliente.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {osDoCliente.length > 0 ? (
                <div className="space-y-0">
                  {osDoCliente.map((os, index) => (
                    <div
                      key={os.id}
                      className={`p-4 ${index !== osDoCliente.length - 1 ? "border-b border-border" : ""}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-foreground">{os.numeroOS}</div>
                        <Badge className={getStatusColor(os.status)}>{getStatusText(os.status)}</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div>
                          <strong>Técnico:</strong> {os.tecnico}
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
                          {os.descricao.length > 100 ? `${os.descricao.substring(0, 100)}...` : os.descricao}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma ordem de serviço encontrada</p>
                  <p className="text-sm mt-1">Este cliente ainda não possui histórico de OS</p>
                </div>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
