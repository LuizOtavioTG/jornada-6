"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Save, Plus, Trash2 } from "lucide-react"
import { CostCalculator } from "@/components/cost-calculator"
import { ImageUpload } from "@/components/image-upload"

interface TecnicoOSFormProps {
  os: any
  onClose: () => void
  onSave: (osData: any) => void
}

export default function TecnicoOSForm({ os, onClose, onSave }: TecnicoOSFormProps) {
  const [formData, setFormData] = useState({
    // Campos que o técnico preenche
    chamados: os.chamados || [{ numeroSerie: "", defeito: "", observacoes: "" }],
    defeitosTecnicos: os.defeitosTecnicos || [
      {
        numeroSerie: "",
        categoria: "refrigeracao",
        // Checkboxes para defeitos específicos
        comp_queimado: false,
        comp_nao_parte: false,
        comp_corrente_alta: false,
        comp_corrente_baixa: false,
        vaz_evaporador: false,
        vaz_condensador: false,
        vaz_nao_localizado: false,
        ref_regulagem_parametros: false,
        ref_falta_gas: false,
        ref_excesso_gas: false,
        est_nivelamento: false,
        est_vedacao: false,
        est_limpeza: false,
        outros_observacoes: "",
      },
    ],
    custos: os.custos || [],
    servicoFinalizado: os.servicoFinalizado || false,
    pendencia: os.pendencia || "",
    fotos: os.fotos || [],
  })

  const defeitosOptions = {
    refrigeracao: [
      { key: "comp_queimado", label: "Compressor Queimado" },
      { key: "comp_nao_parte", label: "Compressor Não Parte" },
      { key: "comp_corrente_alta", label: "Corrente Alta" },
      { key: "comp_corrente_baixa", label: "Corrente Baixa" },
    ],
    vazamento: [
      { key: "vaz_evaporador", label: "Vazamento no Evaporador" },
      { key: "vaz_condensador", label: "Vazamento no Condensador" },
      { key: "vaz_nao_localizado", label: "Vazamento Não Localizado" },
    ],
    numeracao: [
      { key: "ref_regulagem_parametros", label: "Regulagem de Parâmetros" },
      { key: "ref_falta_gas", label: "Falta de Gás" },
      { key: "ref_excesso_gas", label: "Excesso de Gás" },
    ],
    estrutura: [
      { key: "est_nivelamento", label: "Nivelamento" },
      { key: "est_vedacao", label: "Vedação" },
      { key: "est_limpeza", label: "Limpeza" },
    ],
  }

  const addChamado = () => {
    setFormData({
      ...formData,
      chamados: [...formData.chamados, { numeroSerie: "", defeito: "", observacoes: "" }],
    })
  }

  const removeChamado = (index: number) => {
    setFormData({
      ...formData,
      chamados: formData.chamados.filter((_, i) => i !== index),
    })
  }

  const updateChamado = (index: number, field: string, value: string) => {
    const updatedChamados = formData.chamados.map((chamado, i) =>
      i === index ? { ...chamado, [field]: value } : chamado,
    )
    setFormData({ ...formData, chamados: updatedChamados })
  }

  const addDefeitoTecnico = () => {
    setFormData({
      ...formData,
      defeitosTecnicos: [
        ...formData.defeitosTecnicos,
        {
          numeroSerie: "",
          categoria: "refrigeracao",
          comp_queimado: false,
          comp_nao_parte: false,
          comp_corrente_alta: false,
          comp_corrente_baixa: false,
          vaz_evaporador: false,
          vaz_condensador: false,
          vaz_nao_localizado: false,
          ref_regulagem_parametros: false,
          ref_falta_gas: false,
          ref_excesso_gas: false,
          est_nivelamento: false,
          est_vedacao: false,
          est_limpeza: false,
          outros_observacoes: "",
        },
      ],
    })
  }

  const removeDefeitoTecnico = (index: number) => {
    setFormData({
      ...formData,
      defeitosTecnicos: formData.defeitosTecnicos.filter((_, i) => i !== index),
    })
  }

  const updateDefeitoTecnico = (index: number, field: string, value: any) => {
    const updatedDefeitos = formData.defeitosTecnicos.map((defeito, i) =>
      i === index ? { ...defeito, [field]: value } : defeito,
    )
    setFormData({ ...formData, defeitosTecnicos: updatedDefeitos })
  }

  const handleCostChange = (costs: any[]) => {
    setFormData({ ...formData, custos: costs })
  }

  const handleImageUpload = (images: any[]) => {
    setFormData({ ...formData, fotos: images })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Calcular valor total
    const valorTotal = formData.custos.reduce((total, custo) => total + (custo.valorTotal || 0), 0)

    const updatedOS = {
      ...os,
      ...formData,
      valor_total: valorTotal,
      status: formData.servicoFinalizado ? "concluida" : "em_andamento",
    }

    onSave(updatedOS)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[95vh] overflow-y-auto my-4">
        <div className="sticky top-0 bg-white border-b p-3 sm:p-4 flex items-center justify-between z-10">
          <h2 className="text-lg sm:text-xl font-bold">Preencher OS: {os.numeroOS}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-3 sm:p-6 space-y-4 sm:space-y-6">
          {/* Informações da OS (somente leitura) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Informações da OS</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <Label>Cliente</Label>
                <Input value={os.cliente} disabled />
              </div>
              <div>
                <Label>Data de Abertura</Label>
                <Input value={new Date(os.dataAbertura).toLocaleDateString("pt-BR")} disabled />
              </div>
              <div>
                <Label>Técnico Responsável</Label>
                <Input value={os.tecnico} disabled />
              </div>
              <div>
                <Label>Tipo de Serviço</Label>
                <Input value={os.tipo} disabled />
              </div>
              <div className="md:col-span-2">
                <Label>Descrição do Chamado (Preenchido pelo FAST)</Label>
                <Textarea value={os.observacoesChamado || "Não informado"} disabled rows={2} className="bg-gray-50" />
              </div>
            </CardContent>
          </Card>

          {/* Custos do Serviço */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Custos do Serviço</CardTitle>
            </CardHeader>
            <CardContent>
              <CostCalculator costs={formData.custos} onCostsChange={handleCostChange} />
            </CardContent>
          </Card>

          {/* Descrição do Defeito (Técnico) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-base sm:text-lg">
                <span>Descrição do Defeito (Técnico)</span>
                <Button type="button" size="sm" onClick={addDefeitoTecnico} className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.defeitosTecnicos.map((defeito, index) => (
                <div key={index} className="border rounded-lg p-3 sm:p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm sm:text-base">Defeito Técnico {index + 1}</h4>
                    {formData.defeitosTecnicos.length > 1 && (
                      <Button type="button" size="sm" variant="destructive" onClick={() => removeDefeitoTecnico(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label>N° Série</Label>
                      <Input
                        value={defeito.numeroSerie}
                        onChange={(e) => updateDefeitoTecnico(index, "numeroSerie", e.target.value)}
                        placeholder="Ex: 20110047223"
                      />
                    </div>
                    <div>
                      <Label>Categoria</Label>
                      <Select
                        value={defeito.categoria}
                        onValueChange={(value) => updateDefeitoTecnico(index, "categoria", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="refrigeracao">Refrigeração</SelectItem>
                          <SelectItem value="vazamento">Vazamento</SelectItem>
                          <SelectItem value="numeracao">Numeração</SelectItem>
                          <SelectItem value="estrutura">Estrutura</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Checkboxes específicos por categoria */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Defeitos Específicos:</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {defeitosOptions[defeito.categoria as keyof typeof defeitosOptions]?.map((opcao) => (
                        <div key={opcao.key} className="flex items-center space-x-2">
                          <Checkbox
                            id={`${index}-${opcao.key}`}
                            checked={defeito[opcao.key as keyof typeof defeito] as boolean}
                            onCheckedChange={(checked) => updateDefeitoTecnico(index, opcao.key, checked)}
                          />
                          <Label htmlFor={`${index}-${opcao.key}`} className="text-xs sm:text-sm">
                            {opcao.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Observações Técnicas</Label>
                    <Textarea
                      value={defeito.outros_observacoes}
                      onChange={(e) => updateDefeitoTecnico(index, "outros_observacoes", e.target.value)}
                      placeholder="Observações técnicas adicionais..."
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upload de Fotos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Fotos do Serviço</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload images={formData.fotos} onImagesChange={handleImageUpload} maxImages={10} />
            </CardContent>
          </Card>

          {/* Finalização */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Finalização do Serviço</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="servicoFinalizado"
                  checked={formData.servicoFinalizado}
                  onCheckedChange={(checked) => setFormData({ ...formData, servicoFinalizado: checked as boolean })}
                />
                <Label htmlFor="servicoFinalizado">Serviço Finalizado?</Label>
              </div>

              {!formData.servicoFinalizado && (
                <div>
                  <Label>Qual pendência?</Label>
                  <Textarea
                    value={formData.pendencia}
                    onChange={(e) => setFormData({ ...formData, pendencia: e.target.value })}
                    placeholder="Descreva a pendência..."
                    rows={2}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Botões */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Salvar OS
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
