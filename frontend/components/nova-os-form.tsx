"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Save, Building, Wrench, FileText, Settings, Shield, Camera, UserCheck, Plus } from "lucide-react"
import ClientSearch from "@/components/client-search"
import TechnicianSearch from "@/components/technician-search"
import ImageUpload from "@/components/image-upload"
import { useAuth } from "@/hooks/use-auth"

interface NovaOSFormProps {
  onClose: () => void
  onSave: (osData: any) => void
  editingOS?: any
}

export default function NovaOSForm({ onClose, onSave, editingOS }: NovaOSFormProps) {
  const { user } = useAuth()

  const isFastEmployee = user?.role === "admin" || user?.role === "funcionario"
  const isTechnician = user?.role === "tecnico"
  const canUploadImages = user?.role === "admin" || user?.role === "funcionario" || user?.role === "tecnico"

  const [selectedClient, setSelectedClient] = useState<any>(editingOS?.clienteData || null)
  const [selectedTechnician, setSelectedTechnician] = useState<any>(editingOS?.tecnicoData || null)

  const [formData, setFormData] = useState({
    // Cabeçalho
    osNumber: editingOS?.osNumber || "",
    data: editingOS?.data || "",

    // Dados do Cliente (preenchido pelo FAST)
    cliente: editingOS?.cliente || "",
    endereco: editingOS?.endereco || "",
    cidEstado: editingOS?.cidEstado || "",
    empresa: editingOS?.empresa || "",
    tecnico: editingOS?.tecnico || "",

    // Contato
    telefone: editingOS?.telefone || "",
    bairro: editingOS?.bairro || "",
    foneFax: editingOS?.foneFax || "",
    celular: editingOS?.celular || "",
    email: editingOS?.email || "",
    cidade: editingOS?.cidade || "",
    uf: editingOS?.uf || "",

    // Descrição do Chamado (Defeito) - preenchido pelo técnico
    descricoesChamado: editingOS?.descricoesChamado || [
      {
        id: Date.now().toString(),
        numeroSerie: "",
        observacoes: "",
        dataRegistro: new Date().toISOString().split("T")[0],
      },
    ],

    // Custos Serviço - preenchido pelo técnico
    custosDeslocamento: {
      origem: editingOS?.custosDeslocamento?.origem || "",
      destino: editingOS?.custosDeslocamento?.destino || "",
      distancia: editingOS?.custosDeslocamento?.distancia || "",
      horaKm: editingOS?.custosDeslocamento?.horaKm || "",
      totalA: editingOS?.custosDeslocamento?.totalA || 0,
    },
    custosHoraTrabalhada: {
      inicio: editingOS?.custosHoraTrabalhada?.inicio || "",
      termino: editingOS?.custosHoraTrabalhada?.termino || "",
      totalH: editingOS?.custosHoraTrabalhada?.totalH || "",
      horaR: editingOS?.custosHoraTrabalhada?.horaR || "",
      totalB: editingOS?.custosHoraTrabalhada?.totalB || 0,
    },
    custosKm: {
      km: editingOS?.custosKm?.km || "",
      valorR: editingOS?.custosKm?.valorR || "",
      totalC: editingOS?.custosKm?.totalC || 0,
    },
    data1Visita: editingOS?.data1Visita || "",
    data2Visita: editingOS?.data2Visita || "",
    nomeTecnico: editingOS?.nomeTecnico || "",
    nomeAjudante: editingOS?.nomeAjudante || "",
    tel: editingOS?.tel || "",
    despesasMateriais: editingOS?.despesasMateriais || [{ material: "", qtde: "", totalR: 0 }],
    valorTotalOS: editingOS?.valorTotalOS || 0,

    // Para (Nome/Legível)
    paraLegivel: editingOS?.paraLegivel || "",
    telefoneContato: editingOS?.telefoneContato || "",
    carimbo: editingOS?.carimbo || "",

    // Descrição do Defeito (Técnico) - checkboxes
    numeroSerieTecnico: editingOS?.numeroSerieTecnico || "20110047223",
    defeitosTecnicos: {
      // Compressor
      compQueimado: editingOS?.defeitosTecnicos?.compQueimado || false,
      compEmMassa: editingOS?.defeitosTecnicos?.compEmMassa || false,
      compEmCurto: editingOS?.defeitosTecnicos?.compEmCurto || false,
      compCorrenteAlta: editingOS?.defeitosTecnicos?.compCorrenteAlta || false,
      compNaoParte: editingOS?.defeitosTecnicos?.compNaoParte || false,
      compSemCompressao: editingOS?.defeitosTecnicos?.compSemCompressao || false,
      compTravaComando: editingOS?.defeitosTecnicos?.compTravaComando || false,
      compTravaRolamento: editingOS?.defeitosTecnicos?.compTravaRolamento || false,
      compDesarmando: editingOS?.defeitosTecnicos?.compDesarmando || false,

      // Vazamento
      vazNaoLocalizado: editingOS?.defeitosTecnicos?.vazNaoLocalizado || false,
      vazEvaporador: editingOS?.defeitosTecnicos?.vazEvaporador || false,
      vazCondensador: editingOS?.defeitosTecnicos?.vazCondensador || false,
      vazTubulacao: editingOS?.defeitosTecnicos?.vazTubulacao || false,
      vazSoldas: editingOS?.defeitosTecnicos?.vazSoldas || false,
      vazValvulas: editingOS?.defeitosTecnicos?.vazValvulas || false,

      // Numeração (outros defeitos)
      capObstruido: editingOS?.defeitosTecnicos?.capObstruido || false,
      microMotorTravado: editingOS?.defeitosTecnicos?.microMotorTravado || false,
      motorVentCond: editingOS?.defeitosTecnicos?.motorVentCond || false,
      motorVentEvap: editingOS?.defeitosTecnicos?.motorVentEvap || false,
      regulagemParametros: editingOS?.defeitosTecnicos?.regulagemParametros || false,
      lampQueimada: editingOS?.defeitosTecnicos?.lampQueimada || false,
      semIluminacao: editingOS?.defeitosTecnicos?.semIluminacao || false,
      ilumEmCurto: editingOS?.defeitosTecnicos?.ilumEmCurto || false,

      // Estrutura
      perfilCurvoVidro: editingOS?.defeitosTecnicos?.perfilCurvoVidro || false,
      perfilSuporteIlum: editingOS?.defeitosTecnicos?.perfilSuporteIlum || false,
      perfilMoldura: editingOS?.defeitosTecnicos?.perfilMoldura || false,
      perfilPortaEtiqueta: editingOS?.defeitosTecnicos?.perfilPortaEtiqueta || false,
      suportePorta: editingOS?.defeitosTecnicos?.suportePorta || false,
      porta: editingOS?.defeitosTecnicos?.porta || false,
      puxador: editingOS?.defeitosTecnicos?.puxador || false,
      conjuntoCanal: editingOS?.defeitosTecnicos?.conjuntoCanal || false,
      perfilFrontal: editingOS?.defeitosTecnicos?.perfilFrontal || false,
      perfilCanto: editingOS?.defeitosTecnicos?.perfilCanto || false,
      parafusoFrontal: editingOS?.defeitosTecnicos?.parafusoFrontal || false,
      parafusoLateral: editingOS?.defeitosTecnicos?.parafusoLateral || false,

      // Outros
      outrosObservacoes: editingOS?.defeitosTecnicos?.outrosObservacoes || "",
    },
    observacoesTecnicas: editingOS?.observacoesTecnicas || "",

    // Rodapé
    servicoFinalizado: editingOS?.servicoFinalizado || "",
    qualPendencia: editingOS?.qualPendencia || "",

    // Campos de controle
    garantia: editingOS?.garantia || "",
    status: editingOS?.status || "aberta",
    images: editingOS?.images || [],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const numeroOS =
      editingOS?.numeroOS ||
      `OS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999) + 1).padStart(4, "0")}`

    const osData = {
      id: editingOS?.id || numeroOS,
      numeroOS,
      ...formData,
      clienteData: selectedClient || editingOS?.clienteData,
      tecnicoData: selectedTechnician || editingOS?.tecnicoData,
      dataAbertura: editingOS?.dataAbertura || new Date().toISOString(),
      tipo: "Ordem de Serviço",
    }

    onSave(osData)
    onClose()
  }

  const addMaterial = () => {
    setFormData({
      ...formData,
      despesasMateriais: [...formData.despesasMateriais, { material: "", qtde: "", totalR: 0 }],
    })
  }

  const updateMaterial = (index: number, field: string, value: any) => {
    const newMateriais = [...formData.despesasMateriais]
    newMateriais[index] = { ...newMateriais[index], [field]: value }
    setFormData({ ...formData, despesasMateriais: newMateriais })
  }

  const removeMaterial = (index: number) => {
    if (formData.despesasMateriais.length > 1) {
      const newMateriais = formData.despesasMateriais.filter((_, i) => i !== index)
      setFormData({ ...formData, despesasMateriais: newMateriais })
    }
  }

  const addDescricaoChamado = () => {
    const newDescricao = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      numeroSerie: "",
      observacoes: "",
      dataRegistro: new Date().toISOString().split("T")[0],
    }
    setFormData({
      ...formData,
      descricoesChamado: [...formData.descricoesChamado, newDescricao],
    })
  }

  const updateDescricaoChamado = (id: string, field: string, value: string) => {
    const updatedDescricoes = formData.descricoesChamado.map((desc) =>
      desc.id === id ? { ...desc, [field]: value } : desc,
    )
    setFormData({ ...formData, descricoesChamado: updatedDescricoes })
  }

  const removeDescricaoChamado = (id: string) => {
    if (formData.descricoesChamado.length > 1) {
      const filteredDescricoes = formData.descricoesChamado.filter((desc) => desc.id !== id)
      setFormData({ ...formData, descricoesChamado: filteredDescricoes })
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-7xl max-h-[95vh] overflow-y-auto bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b bg-blue-50">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl text-blue-800">
              <Wrench className="h-5 w-5" />
              ORDEM DE SERVIÇO EM GARANTIA
            </CardTitle>
            <CardDescription className="mt-1">
              {editingOS ? "Editar OS" : isFastEmployee ? "Criar nova OS" : "Completar OS"}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 p-6">
            {/* Cabeçalho - OS Number e Data */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-2">
                <Label>O.S. N°:</Label>
                <Input
                  value={formData.osNumber}
                  onChange={(e) => setFormData({ ...formData, osNumber: e.target.value })}
                  placeholder="Número da OS"
                />
              </div>
              <div className="space-y-2">
                <Label>Data:</Label>
                <Input
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                />
              </div>
            </div>

            {/* Seção FAST - Dados do Cliente e Técnico */}
            {isFastEmployee && (
              <>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-blue-700 bg-blue-50 p-3 rounded-lg">
                    <Shield className="h-4 w-4" />
                    DADOS DO CLIENTE
                  </div>

                  <ClientSearch onClientSelect={setSelectedClient} selectedClient={selectedClient} />

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Garantia</Label>
                      <Select
                        value={formData.garantia}
                        onValueChange={(value) => setFormData({ ...formData, garantia: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dentro_garantia">Dentro da Garantia</SelectItem>
                          <SelectItem value="fora_garantia">Fora da Garantia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) => setFormData({ ...formData, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aberta">Aberta</SelectItem>
                          <SelectItem value="em_andamento">Em Andamento</SelectItem>
                          <SelectItem value="aguardando_peca">Aguardando Peça</SelectItem>
                          <SelectItem value="concluida">Concluída</SelectItem>
                          <SelectItem value="cancelada">Cancelada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700 bg-emerald-50 p-3 rounded-lg">
                    <UserCheck className="h-4 w-4" />
                    DADOS DO TÉCNICO
                  </div>
                  <TechnicianSearch
                    onTechnicianSelect={setSelectedTechnician}
                    selectedTechnician={selectedTechnician}
                    clientRegion={selectedClient?.regiao}
                  />
                </div>

                {/* Descrição do Chamado */}
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-orange-700 bg-orange-50 p-3 rounded-lg">
                      <Settings className="h-4 w-4" />
                      DESCRIÇÕES DO CHAMADO (Defeito)
                    </div>
                    <Button type="button" onClick={addDescricaoChamado} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Descrição
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {formData.descricoesChamado.map((descricao, index) => (
                      <Card key={descricao.id} className="border-l-4 border-l-orange-500">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-sm">Descrição #{index + 1}</h4>
                            {formData.descricoesChamado.length > 1 && (
                              <Button
                                type="button"
                                onClick={() => removeDescricaoChamado(descricao.id)}
                                variant="ghost"
                                size="sm"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label>Data do Registro:</Label>
                              <Input
                                type="date"
                                value={descricao.dataRegistro}
                                onChange={(e) => updateDescricaoChamado(descricao.id, "dataRegistro", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>N° Série:</Label>
                              <Input
                                value={descricao.numeroSerie}
                                onChange={(e) => updateDescricaoChamado(descricao.id, "numeroSerie", e.target.value)}
                                placeholder="Número de série do equipamento"
                              />
                            </div>
                            <div className="space-y-2 md:col-span-1">
                              <Label>Observações:</Label>
                              <Textarea
                                value={descricao.observacoes}
                                onChange={(e) => updateDescricaoChamado(descricao.id, "observacoes", e.target.value)}
                                placeholder="Descrição detalhada do chamado..."
                                rows={3}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Seção Técnico - Campos técnicos */}
            {(isTechnician || (isFastEmployee && editingOS)) && (
              <>
                <Separator />

                {/* Custos Serviço */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-green-700 bg-green-50 p-3 rounded-lg">
                    <FileText className="h-4 w-4" />
                    CUSTOS SERVIÇO
                  </div>

                  {/* A. Custos Deslocamento */}
                  <Card className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">A. Custos Deslocamento</h4>
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                        <div className="space-y-2">
                          <Label>Origem</Label>
                          <Input
                            value={formData.custosDeslocamento.origem}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                custosDeslocamento: { ...formData.custosDeslocamento, origem: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Destino</Label>
                          <Input
                            value={formData.custosDeslocamento.destino}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                custosDeslocamento: { ...formData.custosDeslocamento, destino: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Distância</Label>
                          <Input
                            value={formData.custosDeslocamento.distancia}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                custosDeslocamento: { ...formData.custosDeslocamento, distancia: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Hora/Km</Label>
                          <Input
                            value={formData.custosDeslocamento.horaKm}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                custosDeslocamento: { ...formData.custosDeslocamento, horaKm: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Total R$</Label>
                          <Input
                            type="number"
                            value={formData.custosDeslocamento.totalA}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                custosDeslocamento: {
                                  ...formData.custosDeslocamento,
                                  totalA: Number.parseFloat(e.target.value) || 0,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* B. Custos Hora Trabalhada */}
                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">B. Custos Hora Trabalhada</h4>
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                        <div className="space-y-2">
                          <Label>Início</Label>
                          <Input
                            type="time"
                            value={formData.custosHoraTrabalhada.inicio}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                custosHoraTrabalhada: { ...formData.custosHoraTrabalhada, inicio: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Término</Label>
                          <Input
                            type="time"
                            value={formData.custosHoraTrabalhada.termino}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                custosHoraTrabalhada: { ...formData.custosHoraTrabalhada, termino: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Total H</Label>
                          <Input
                            value={formData.custosHoraTrabalhada.totalH}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                custosHoraTrabalhada: { ...formData.custosHoraTrabalhada, totalH: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Hora R$</Label>
                          <Input
                            value={formData.custosHoraTrabalhada.horaR}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                custosHoraTrabalhada: { ...formData.custosHoraTrabalhada, horaR: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Total R$</Label>
                          <Input
                            type="number"
                            value={formData.custosHoraTrabalhada.totalB}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                custosHoraTrabalhada: {
                                  ...formData.custosHoraTrabalhada,
                                  totalB: Number.parseFloat(e.target.value) || 0,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* C. Custos KM */}
                  <Card className="border-l-4 border-l-purple-500">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">C. Custos KM</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-2">
                          <Label>KM</Label>
                          <Input
                            value={formData.custosKm.km}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                custosKm: { ...formData.custosKm, km: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Valor R$</Label>
                          <Input
                            value={formData.custosKm.valorR}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                custosKm: { ...formData.custosKm, valorR: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Total R$</Label>
                          <Input
                            type="number"
                            value={formData.custosKm.totalC}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                custosKm: { ...formData.custosKm, totalC: Number.parseFloat(e.target.value) || 0 },
                              })
                            }
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Datas e Técnico */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Data 1ª Visita:</Label>
                      <Input
                        type="date"
                        value={formData.data1Visita}
                        onChange={(e) => setFormData({ ...formData, data1Visita: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Data 2ª Visita:</Label>
                      <Input
                        type="date"
                        value={formData.data2Visita}
                        onChange={(e) => setFormData({ ...formData, data2Visita: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Nome Técnico:</Label>
                      <Input
                        value={formData.nomeTecnico}
                        onChange={(e) => setFormData({ ...formData, nomeTecnico: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Nome Ajudante:</Label>
                      <Input
                        value={formData.nomeAjudante}
                        onChange={(e) => setFormData({ ...formData, nomeAjudante: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* D. Despesas / Materiais */}
                  <Card className="border-l-4 border-l-red-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">D. Despesas / Materiais</h4>
                        <Button type="button" onClick={addMaterial} variant="outline" size="sm">
                          Adicionar Material
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {formData.despesasMateriais.map((material, index) => (
                          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 bg-gray-50 rounded">
                            <div className="space-y-2">
                              <Label>Material</Label>
                              <Input
                                value={material.material}
                                onChange={(e) => updateMaterial(index, "material", e.target.value)}
                                placeholder="Descrição do material"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Qtde</Label>
                              <Input
                                value={material.qtde}
                                onChange={(e) => updateMaterial(index, "qtde", e.target.value)}
                                placeholder="Quantidade"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Total R$</Label>
                              <Input
                                type="number"
                                value={material.totalR}
                                onChange={(e) =>
                                  updateMaterial(index, "totalR", Number.parseFloat(e.target.value) || 0)
                                }
                              />
                            </div>
                            <div className="flex items-end">
                              {formData.despesasMateriais.length > 1 && (
                                <Button type="button" onClick={() => removeMaterial(index)} variant="ghost" size="sm">
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Valor Total da OS */}
                  <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <div className="space-y-2">
                      <Label className="text-lg font-semibold">Valor Total da OS (A+B+C+D)</Label>
                      <Input
                        type="number"
                        value={formData.valorTotalOS}
                        onChange={(e) =>
                          setFormData({ ...formData, valorTotalOS: Number.parseFloat(e.target.value) || 0 })
                        }
                        className="text-lg font-bold"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Contato */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-blue-700 bg-blue-50 p-3 rounded-lg">
                    <Building className="h-4 w-4" />
                    CONTATO
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Para: (Nome/Legível)</Label>
                      <Input
                        value={formData.paraLegivel}
                        onChange={(e) => setFormData({ ...formData, paraLegivel: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Telefone:</Label>
                      <Input
                        value={formData.telefoneContato}
                        onChange={(e) => setFormData({ ...formData, telefoneContato: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Carimbo:</Label>
                      <Input
                        value={formData.carimbo}
                        onChange={(e) => setFormData({ ...formData, carimbo: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Descrição do Defeito (Técnico) - Checkboxes */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-red-700 bg-red-50 p-3 rounded-lg">
                    <Settings className="h-4 w-4" />
                    DESCRIÇÃO DO DEFEITO (TÉCNICO)
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Compressor */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Compressor</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {[
                          { key: "compQueimado", label: "Compressor queimado" },
                          { key: "compEmMassa", label: "Compressor em massa" },
                          { key: "compEmCurto", label: "Compressor em curto" },
                          { key: "compCorrenteAlta", label: "Corrente alta" },
                          { key: "compNaoParte", label: "Não parte" },
                          { key: "compSemCompressao", label: "Sem compressão" },
                          { key: "compTravaComando", label: "Trava comando" },
                          { key: "compTravaRolamento", label: "Trava rolamento" },
                          { key: "compDesarmando", label: "Desarmando" },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center space-x-2">
                            <Checkbox
                              id={item.key}
                              checked={
                                formData.defeitosTecnicos[item.key as keyof typeof formData.defeitosTecnicos] as boolean
                              }
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  defeitosTecnicos: {
                                    ...formData.defeitosTecnicos,
                                    [item.key]: checked,
                                  },
                                })
                              }
                            />
                            <Label htmlFor={item.key} className="text-xs">
                              {item.label}
                            </Label>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Vazamento */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Vazamento</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {[
                          { key: "vazNaoLocalizado", label: "Não localizado" },
                          { key: "vazEvaporador", label: "Evaporador" },
                          { key: "vazCondensador", label: "Condensador" },
                          { key: "vazTubulacao", label: "Tubulação" },
                          { key: "vazSoldas", label: "Soldas" },
                          { key: "vazValvulas", label: "Válvulas" },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center space-x-2">
                            <Checkbox
                              id={item.key}
                              checked={
                                formData.defeitosTecnicos[item.key as keyof typeof formData.defeitosTecnicos] as boolean
                              }
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  defeitosTecnicos: {
                                    ...formData.defeitosTecnicos,
                                    [item.key]: checked,
                                  },
                                })
                              }
                            />
                            <Label htmlFor={item.key} className="text-xs">
                              {item.label}
                            </Label>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Numeração (outros) */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Numeração</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {[
                          { key: "capObstruido", label: "Capilar obstruído" },
                          { key: "microMotorTravado", label: "Micro motor travado" },
                          { key: "motorVentCond", label: "Motor vent. cond." },
                          { key: "motorVentEvap", label: "Motor vent. evap." },
                          { key: "regulagemParametros", label: "Regulagem parâmetros" },
                          { key: "lampQueimada", label: "Lâmpada queimada" },
                          { key: "semIluminacao", label: "Sem iluminação" },
                          { key: "ilumEmCurto", label: "Iluminação em curto" },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center space-x-2">
                            <Checkbox
                              id={item.key}
                              checked={
                                formData.defeitosTecnicos[item.key as keyof typeof formData.defeitosTecnicos] as boolean
                              }
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  defeitosTecnicos: {
                                    ...formData.defeitosTecnicos,
                                    [item.key]: checked,
                                  },
                                })
                              }
                            />
                            <Label htmlFor={item.key} className="text-xs">
                              {item.label}
                            </Label>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Estrutura */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Estrutura</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {[
                          { key: "perfilCurvoVidro", label: "Perfil curvo vidro" },
                          { key: "perfilSuporteIlum", label: "Perfil suporte ilum." },
                          { key: "perfilMoldura", label: "Perfil moldura" },
                          { key: "perfilPortaEtiqueta", label: "Perfil porta etiqueta" },
                          { key: "suportePorta", label: "Suporte porta" },
                          { key: "porta", label: "Porta" },
                          { key: "puxador", label: "Puxador" },
                          { key: "conjuntoCanal", label: "Conjunto canal" },
                          { key: "perfilFrontal", label: "Perfil frontal" },
                          { key: "perfilCanto", label: "Perfil canto" },
                          { key: "parafusoFrontal", label: "Parafuso frontal" },
                          { key: "parafusoLateral", label: "Parafuso lateral" },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center space-x-2">
                            <Checkbox
                              id={item.key}
                              checked={
                                formData.defeitosTecnicos[item.key as keyof typeof formData.defeitosTecnicos] as boolean
                              }
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  defeitosTecnicos: {
                                    ...formData.defeitosTecnicos,
                                    [item.key]: checked,
                                  },
                                })
                              }
                            />
                            <Label htmlFor={item.key} className="text-xs">
                              {item.label}
                            </Label>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  {/* N° Série e Observações Técnicas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>N° Série:</Label>
                      <Input
                        value={formData.numeroSerieTecnico}
                        onChange={(e) => setFormData({ ...formData, numeroSerieTecnico: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Observações:</Label>
                      <Textarea
                        value={formData.observacoesTecnicas}
                        onChange={(e) => setFormData({ ...formData, observacoesTecnicas: e.target.value })}
                        placeholder="Observações técnicas..."
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Outros */}
                  <div className="space-y-2">
                    <Label>Outros - Observações:</Label>
                    <Textarea
                      value={formData.defeitosTecnicos.outrosObservacoes}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          defeitosTecnicos: {
                            ...formData.defeitosTecnicos,
                            outrosObservacoes: e.target.value,
                          },
                        })
                      }
                      placeholder="Outras observações..."
                      rows={2}
                    />
                  </div>
                </div>

                <Separator />

                {/* Rodapé */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-gray-50 p-3 rounded-lg">
                    <FileText className="h-4 w-4" />
                    FINALIZAÇÃO
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Serviço finalizado?</Label>
                      <Select
                        value={formData.servicoFinalizado}
                        onValueChange={(value) => setFormData({ ...formData, servicoFinalizado: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sim">Sim</SelectItem>
                          <SelectItem value="nao">Não</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Qual pendência?</Label>
                      <Input
                        value={formData.qualPendencia}
                        onChange={(e) => setFormData({ ...formData, qualPendencia: e.target.value })}
                        placeholder="Descrever se houver pendência"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Upload de Imagens */}
            {canUploadImages && (
              <>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-purple-700 bg-purple-50 p-3 rounded-lg">
                    <Camera className="h-4 w-4" />
                    ANEXOS DE IMAGENS
                  </div>
                  <ImageUpload
                    images={formData.images}
                    onImagesChange={(images) => setFormData({ ...formData, images })}
                  />
                </div>
              </>
            )}
          </CardContent>

          <div className="flex gap-3 p-6 pt-0 border-t bg-gray-50">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              {editingOS ? "Salvar Alterações" : isFastEmployee ? "Criar OS" : "Completar OS"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
