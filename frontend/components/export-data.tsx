"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Download, FileText, Table, Calendar, FileSpreadsheet } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  exportToCSV,
  exportToExcel,
  exportToPDF,
  formatOSForExport,
  formatClientesForExport,
  formatTecnicosForExport,
} from "@/lib/export-utils"

interface ExportOptions {
  dataType: "os" | "clientes" | "tecnicos" | "relatorio_completo"
  format: "pdf" | "excel" | "csv"
  dateRange: "all" | "month" | "quarter" | "year"
  includePhotos: boolean
  includeSignatures: boolean
  includeDetails: boolean
}

// Mock data - in production, this would come from the database
const mockOS = [
  {
    id: 1,
    numero: "OS-2024-001",
    data_abertura: new Date(2024, 0, 15),
    cliente: "Supermercado Central",
    tecnico: "Carlos Oliveira",
    status: "Concluída",
    valor_total: 1245.0,
    garantia: "Sim",
    descricao_chamado: "Manutenção preventiva em câmara fria",
  },
  {
    id: 2,
    numero: "OS-2024-002",
    data_abertura: new Date(2024, 0, 16),
    cliente: "Padaria Pão Dourado",
    tecnico: "Ana Silva",
    status: "Em Andamento",
    valor_total: 850.0,
    garantia: "Não",
    descricao_chamado: "Reparo em compressor",
  },
]

const mockClientes = [
  {
    codigo: "CLI-001",
    nome: "Supermercado Central",
    cnpj: "12.345.678/0001-90",
    endereco: "Rua das Flores",
    numero: "123",
    bairro: "Centro",
    cidade: "São Paulo",
    uf: "SP",
    telefone: "(11) 3456-7890",
    email: "contato@supercentral.com",
  },
]

const mockTecnicos = [
  {
    nome: "Carlos Oliveira",
    email: "carlos@fast.com",
    telefone: "(11) 98765-4321",
    especialidade: "Refrigeração",
    regiao: "São Paulo - Zona Sul",
    os_atendidas: 45,
  },
]

export function ExportData() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [options, setOptions] = useState<ExportOptions>({
    dataType: "os",
    format: "pdf",
    dateRange: "month",
    includePhotos: false,
    includeSignatures: true,
    includeDetails: true,
  })
  const { toast } = useToast()

  const handleExport = async () => {
    setIsExporting(true)

    try {
      // Simulate loading
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const timestamp = new Date().toISOString().split("T")[0]
      let filename = ""
      let data: any[] = []

      switch (options.dataType) {
        case "os":
          data = formatOSForExport(mockOS)
          filename = `ordens_servico_${timestamp}`
          break
        case "clientes":
          data = formatClientesForExport(mockClientes)
          filename = `clientes_${timestamp}`
          break
        case "tecnicos":
          data = formatTecnicosForExport(mockTecnicos)
          filename = `tecnicos_${timestamp}`
          break
        case "relatorio_completo":
          data = formatOSForExport(mockOS)
          filename = `relatorio_completo_${timestamp}`
          break
      }

      switch (options.format) {
        case "csv":
          exportToCSV(data, `${filename}.csv`)
          break
        case "excel":
          exportToExcel(data, `${filename}.xls`, options.dataType.toUpperCase())
          break
        case "pdf":
          exportToPDF(data, `${filename}.pdf`, `Relatório - ${options.dataType.toUpperCase()}`)
          break
      }

      toast({
        title: "Exportação concluída!",
        description: `Dados exportados em formato ${options.format.toUpperCase()}`,
      })
    } catch (error) {
      toast({
        title: "Erro na exportação",
        description: "Não foi possível exportar os dados. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
      setIsOpen(false)
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "pdf":
        return <FileText className="h-4 w-4" />
      case "excel":
        return <FileSpreadsheet className="h-4 w-4" />
      case "csv":
        return <Table className="h-4 w-4" />
      default:
        return <Download className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Exportar Dados
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Exportar Dados
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Tipo de Dados</Label>
            <Select
              value={options.dataType}
              onValueChange={(value: "os" | "clientes" | "tecnicos" | "relatorio_completo") =>
                setOptions((prev) => ({ ...prev, dataType: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="os">Ordens de Serviço</SelectItem>
                <SelectItem value="clientes">Clientes</SelectItem>
                <SelectItem value="tecnicos">Técnicos</SelectItem>
                <SelectItem value="relatorio_completo">Relatório Completo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Formato de Exportação</Label>
            <Select
              value={options.format}
              onValueChange={(value: "pdf" | "excel" | "csv") => setOptions((prev) => ({ ...prev, format: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    PDF - Relatório Completo
                  </div>
                </SelectItem>
                <SelectItem value="excel">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    Excel - Planilha
                  </div>
                </SelectItem>
                <SelectItem value="csv">
                  <div className="flex items-center gap-2">
                    <Table className="h-4 w-4" />
                    CSV - Dados Tabulares
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Período dos Dados</Label>
            <Select
              value={options.dateRange}
              onValueChange={(value: "all" | "month" | "quarter" | "year") =>
                setOptions((prev) => ({ ...prev, dateRange: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Último Mês
                  </div>
                </SelectItem>
                <SelectItem value="quarter">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Último Trimestre
                  </div>
                </SelectItem>
                <SelectItem value="year">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Último Ano
                  </div>
                </SelectItem>
                <SelectItem value="all">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Todos os Dados
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {options.dataType === "os" && (
            <div className="space-y-3">
              <Label>Incluir nos Dados</Label>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="photos"
                  checked={options.includePhotos}
                  onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, includePhotos: !!checked }))}
                />
                <Label htmlFor="photos" className="text-sm font-normal">
                  Fotos dos serviços
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="signatures"
                  checked={options.includeSignatures}
                  onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, includeSignatures: !!checked }))}
                />
                <Label htmlFor="signatures" className="text-sm font-normal">
                  Assinaturas digitais
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="details"
                  checked={options.includeDetails}
                  onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, includeDetails: !!checked }))}
                />
                <Label htmlFor="details" className="text-sm font-normal">
                  Detalhes técnicos completos
                </Label>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsOpen(false)} type="button">
              Cancelar
            </Button>
            <Button className="flex-1" onClick={handleExport} disabled={isExporting} type="button">
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Exportando...
                </>
              ) : (
                <>
                  {getFormatIcon(options.format)}
                  <span className="ml-2">Exportar</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
