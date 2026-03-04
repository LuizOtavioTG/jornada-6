"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { X, FileText, Download, Printer, Mail } from "lucide-react"

interface RelatorioGeneratorProps {
  os: any
  photos: any[]
  onClose: () => void
}

export default function RelatorioGenerator({ os, photos, onClose }: RelatorioGeneratorProps) {
  const [relatorioData, setRelatorioData] = useState({
    resumoServico: os.descricao || "",
    servicosRealizados: "",
    pecasUtilizadas: "",
    observacoesTecnicas: os.observacoes || "",
    recomendacoes: "",
    proximaManutencao: "",
  })

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
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const groupedPhotos = photos.reduce(
    (acc, photo) => {
      const momento = photo.momento || "durante"
      if (!acc[momento]) acc[momento] = []
      acc[momento].push(photo)
      return acc
    },
    {} as Record<string, any[]>,
  )

  const generatePDF = () => {
    // Aqui você implementaria a geração real do PDF
    // Por simplicidade, vamos simular o download
    const reportContent = `
RELATÓRIO DE ORDEM DE SERVIÇO
${os.numeroOS}

DADOS DO CLIENTE:
Cliente: ${os.cliente}
Endereço: ${os.endereco}
Contato: ${os.contato}
Telefone: ${os.telefone}

DADOS DO SERVIÇO:
Técnico: ${os.tecnico}
Tipo: ${os.tipo}
Status: ${getStatusText(os.status)}
Data Abertura: ${formatDate(os.dataAbertura)}
${os.dataInicio ? `Data Início: ${formatDate(os.dataInicio)}` : ""}
${os.dataConclusao ? `Data Conclusão: ${formatDate(os.dataConclusao)}` : ""}

RESUMO DO SERVIÇO:
${relatorioData.resumoServico}

SERVIÇOS REALIZADOS:
${relatorioData.servicosRealizados}

PEÇAS UTILIZADAS:
${relatorioData.pecasUtilizadas}

OBSERVAÇÕES TÉCNICAS:
${relatorioData.observacoesTecnicas}

RECOMENDAÇÕES:
${relatorioData.recomendacoes}

PRÓXIMA MANUTENÇÃO:
${relatorioData.proximaManutencao}

FOTOS ANEXADAS: ${photos.length}
${Object.entries(groupedPhotos)
  .map(([momento, fotos]) => `${momento.toUpperCase()}: ${fotos.length} fotos`)
  .join("\n")}
    `

    const blob = new Blob([reportContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `relatorio-${os.numeroOS}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  const sendByEmail = () => {
    // Aqui você implementaria o envio por email
    alert("Funcionalidade de envio por email será implementada")
  }

  const printReport = () => {
    // Aqui você implementaria a impressão
    window.print()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Relatório de Serviço - {os.numeroOS}
            </CardTitle>
            <CardDescription>Gere o relatório final da ordem de serviço</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Informações da OS */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Informações da Ordem de Serviço</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Cliente:</span>
                <p className="font-medium">{os.cliente}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Técnico:</span>
                <p className="font-medium">{os.tecnico}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Tipo:</span>
                <p className="font-medium">{os.tipo}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <Badge className={getStatusColor(os.status)}>{getStatusText(os.status)}</Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Data Abertura:</span>
                <p className="font-medium">{formatDate(os.dataAbertura)}</p>
              </div>
              {os.dataConclusao && (
                <div>
                  <span className="text-muted-foreground">Data Conclusão:</span>
                  <p className="font-medium">{formatDate(os.dataConclusao)}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Campos do Relatório */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resumoServico">Resumo do Serviço</Label>
              <Textarea
                id="resumoServico"
                value={relatorioData.resumoServico}
                onChange={(e) => setRelatorioData({ ...relatorioData, resumoServico: e.target.value })}
                placeholder="Descreva resumidamente o serviço realizado..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="servicosRealizados">Serviços Realizados</Label>
              <Textarea
                id="servicosRealizados"
                value={relatorioData.servicosRealizados}
                onChange={(e) => setRelatorioData({ ...relatorioData, servicosRealizados: e.target.value })}
                placeholder="Liste detalhadamente todos os serviços executados..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pecasUtilizadas">Peças Utilizadas</Label>
              <Textarea
                id="pecasUtilizadas"
                value={relatorioData.pecasUtilizadas}
                onChange={(e) => setRelatorioData({ ...relatorioData, pecasUtilizadas: e.target.value })}
                placeholder="Liste as peças substituídas ou utilizadas..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoesTecnicas">Observações Técnicas</Label>
              <Textarea
                id="observacoesTecnicas"
                value={relatorioData.observacoesTecnicas}
                onChange={(e) => setRelatorioData({ ...relatorioData, observacoesTecnicas: e.target.value })}
                placeholder="Observações técnicas importantes..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recomendacoes">Recomendações</Label>
              <Textarea
                id="recomendacoes"
                value={relatorioData.recomendacoes}
                onChange={(e) => setRelatorioData({ ...relatorioData, recomendacoes: e.target.value })}
                placeholder="Recomendações para o cliente..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proximaManutencao">Próxima Manutenção</Label>
              <Textarea
                id="proximaManutencao"
                value={relatorioData.proximaManutencao}
                onChange={(e) => setRelatorioData({ ...relatorioData, proximaManutencao: e.target.value })}
                placeholder="Quando deve ser realizada a próxima manutenção..."
                rows={2}
              />
            </div>
          </div>

          {/* Resumo de Fotos */}
          {photos.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Fotos Anexadas ({photos.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{groupedPhotos.antes?.length || 0}</div>
                    <p className="text-sm text-muted-foreground">Antes</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">{groupedPhotos.durante?.length || 0}</div>
                    <p className="text-sm text-muted-foreground">Durante</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{groupedPhotos.depois?.length || 0}</div>
                    <p className="text-sm text-muted-foreground">Depois</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>

        <div className="flex gap-3 p-6 pt-0">
          <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Cancelar
          </Button>
          <Button variant="outline" onClick={printReport} className="flex-1 bg-transparent">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Button variant="outline" onClick={sendByEmail} className="flex-1 bg-transparent">
            <Mail className="h-4 w-4 mr-2" />
            Enviar Email
          </Button>
          <Button onClick={generatePDF} className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Gerar PDF
          </Button>
        </div>
      </Card>
    </div>
  )
}
