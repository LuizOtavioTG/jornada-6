"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Edit, Save, Camera, FileText, User, Clock, ImageIcon, PenTool } from "lucide-react"
import PhotoUpload from "./photo-upload"
import PhotoGallery from "./photo-gallery"
import RelatorioGenerator from "./relatorio-generator"
import { DigitalSignature } from "./digital-signature"
import { SignatureDisplay } from "./signature-display"
import TecnicoOSForm from "./tecnico-os-form"
import NovaOSForm from "./nova-os-form" // Added import for NovaOSForm
import { useAuth } from "@/hooks/use-auth"

interface OSDetalhesProps {
  os: any
  onClose: () => void
  onUpdate: (osData: any) => void
}

export default function OSDetalhes({ os, onClose, onUpdate }: OSDetalhesProps) {
  const { user, hasPermission } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [showTecnicoForm, setShowTecnicoForm] = useState(false)
  const [showPhotoUpload, setShowPhotoUpload] = useState(false)
  const [showPhotoGallery, setShowPhotoGallery] = useState(false)
  const [showRelatorio, setShowRelatorio] = useState(false)
  const [showSignature, setShowSignature] = useState(false)
  const [photos, setPhotos] = useState<any[]>(os.photos || [])
  const [editData, setEditData] = useState({
    status: os.status,
    observacoes: os.observacoes || "",
  })

  const isAssignedTechnician = user?.role === "tecnico" && os.tecnico_id === user.id

  const statusOptions = [
    { value: "aberta", label: "Aberta", color: "bg-blue-100 text-blue-800" },
    { value: "em_andamento", label: "Em Andamento", color: "bg-yellow-100 text-yellow-800" },
    { value: "concluida", label: "Concluída", color: "bg-green-100 text-green-800" },
    { value: "aprovada", label: "Aprovada", color: "bg-emerald-100 text-emerald-800" },
    { value: "fechada", label: "Fechada", color: "bg-gray-100 text-gray-800" },
    { value: "cancelada", label: "Cancelada", color: "bg-red-100 text-red-800" },
  ]

  const getStatusInfo = (status: string) => {
    return statusOptions.find((s) => s.value === status) || statusOptions[0]
  }

  const handleSave = () => {
    onUpdate({ ...os, ...editData, photos })
    setIsEditing(false)
  }

  const handleEditFormSave = (updatedOS: any) => {
    onUpdate(updatedOS)
    setShowEditForm(false)
  }

  const handlePhotosUpdate = (newPhotos: any[]) => {
    setPhotos(newPhotos)
    onUpdate({ ...os, photos: newPhotos })
  }

  const handleSignatureSave = (signatureData: any) => {
    const updatedOS = {
      ...os,
      signature: signatureData,
      status: "aprovada",
      dataAprovacao: new Date().toISOString(),
    }
    onUpdate(updatedOS)
  }

  const handleTecnicoFormSave = (updatedOS: any) => {
    onUpdate(updatedOS)
    setShowTecnicoForm(false)
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {os.numeroOS || os.id}
              {os.signature && (
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 ml-2">
                  Assinado
                </Badge>
              )}
            </CardTitle>
            <CardDescription>Detalhes da Ordem de Serviço</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {isAssignedTechnician && !isEditing && (
              <Button variant="outline" size="sm" onClick={() => setShowTecnicoForm(true)}>
                <Edit className="h-4 w-4 mr-1" />
                Preencher OS
              </Button>
            )}
            {(user?.role === "funcionario" || user?.role === "admin") && !isEditing && (
              <Button variant="outline" size="sm" onClick={() => setShowEditForm(true)}>
                <Edit className="h-4 w-4 mr-1" />
                Editar
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Status e Datas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  {isEditing ? (
                    <Select
                      value={editData.status}
                      onValueChange={(value) => setEditData({ ...editData, status: value })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge className={getStatusInfo(os.status).color}>{getStatusInfo(os.status).label}</Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Abertura:</span>
                  <span className="text-sm font-medium">{formatDate(os.dataAbertura || new Date().toISOString())}</span>
                </div>

                {os.dataInicio && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Início:</span>
                    <span className="text-sm font-medium">{formatDate(os.dataInicio)}</span>
                  </div>
                )}

                {os.dataConclusao && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Conclusão:</span>
                    <span className="text-sm font-medium">{formatDate(os.dataConclusao)}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Responsáveis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Técnico:</span>
                  <p className="font-medium">{os.tecnico}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Tipo de Serviço:</span>
                  <p className="font-medium">{os.tipo}</p>
                </div>
                {os.garantia && (
                  <div>
                    <span className="text-sm text-muted-foreground">Garantia:</span>
                    <p className="font-medium">{os.garantia}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Descrição do Serviço</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{os.descricao}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Observações</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={editData.observacoes}
                  onChange={(e) => setEditData({ ...editData, observacoes: e.target.value })}
                  placeholder="Adicione observações sobre o serviço..."
                  rows={4}
                />
              ) : (
                <p className="text-sm leading-relaxed">{os.observacoes || "Nenhuma observação adicionada."}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Fotos do Serviço ({photos.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {photos.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    {photos.slice(0, 6).map((photo) => (
                      <div key={photo.id} className="aspect-square overflow-hidden rounded border">
                        <img
                          src={photo.url || "/placeholder.svg"}
                          alt={photo.nome}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  {photos.length > 6 && (
                    <p className="text-sm text-muted-foreground">E mais {photos.length - 6} fotos...</p>
                  )}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowPhotoGallery(true)}>
                      <ImageIcon className="h-4 w-4 mr-1" />
                      Ver Todas
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowPhotoUpload(true)}>
                      <Camera className="h-4 w-4 mr-1" />
                      Adicionar Mais
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma foto adicionada</p>
                  <Button variant="outline" size="sm" onClick={() => setShowPhotoUpload(true)} className="mt-2">
                    <Camera className="h-4 w-4 mr-1" />
                    Adicionar Fotos
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {os.chamados && os.chamados.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-orange-800">Descrição do Chamado (Defeito)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {os.chamados.map((chamado: any, index: number) => (
                  <div key={index} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <strong>N° Série:</strong> {chamado.numeroSerie}
                      </div>
                      <div>
                        <strong>Defeito:</strong> {chamado.defeito}
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      <strong>Observações:</strong> {chamado.observacoes}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {os.defeitosTecnicos && os.defeitosTecnicos.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-red-800">Descrição do Defeito (Técnico)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {os.defeitosTecnicos.map((defeito: any, index: number) => (
                  <div key={index} className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-2">
                      <div>
                        <strong>N° Série:</strong> {defeito.numeroSerie}
                      </div>
                      <div>
                        <strong>Categoria:</strong> {defeito.categoria}
                      </div>
                    </div>
                    <div className="text-xs space-y-1">
                      {defeito.comp_queimado && <div>• Compressor Queimado</div>}
                      {defeito.comp_nao_parte && <div>• Compressor Não Parte</div>}
                      {defeito.comp_corrente_alta && <div>• Corrente Alta</div>}
                      {defeito.comp_corrente_baixa && <div>• Corrente Baixa</div>}
                      {defeito.vaz_evaporador && <div>• Vazamento no Evaporador</div>}
                      {defeito.vaz_condensador && <div>• Vazamento no Condensador</div>}
                      {defeito.vaz_nao_localizado && <div>• Vazamento Não Localizado</div>}
                      {defeito.ref_regulagem_parametros && <div>• Regulagem de Parâmetros</div>}
                      {defeito.ref_falta_gas && <div>• Falta de Gás</div>}
                      {defeito.ref_excesso_gas && <div>• Excesso de Gás</div>}
                      {defeito.est_nivelamento && <div>• Nivelamento</div>}
                      {defeito.est_vedacao && <div>• Vedação</div>}
                      {defeito.est_limpeza && <div>• Limpeza</div>}
                    </div>
                    {defeito.outros_observacoes && (
                      <div className="mt-2 text-sm">
                        <strong>Observações:</strong> {defeito.outros_observacoes}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {os.custos && os.custos.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-emerald-800">Custos do Serviço</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {os.custos.map((custo: any, index: number) => (
                  <div key={index} className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <div className="font-medium mb-2">{custo.name}</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Deslocamento: R$ {custo.deslocamento?.totalValor?.toFixed(2) || "0,00"}</div>
                      <div>Horas Trab.: R$ {custo.horasTrabalhadas?.totalValor?.toFixed(2) || "0,00"}</div>
                      <div>Quilometragem: R$ {custo.quilometragem?.totalValor?.toFixed(2) || "0,00"}</div>
                      <div>Materiais: R$ {custo.materiaisTotal?.toFixed(2) || "0,00"}</div>
                    </div>
                    <div className="font-medium mt-2 pt-2 border-t border-emerald-300">
                      Total: R$ {custo.valorTotal?.toFixed(2) || "0,00"}
                    </div>
                  </div>
                ))}
                <div className="text-lg font-bold text-emerald-800 pt-2 border-t border-emerald-300">
                  Valor Total da OS: R$ {os.valor_total?.toFixed(2) || "0,00"}
                </div>
              </CardContent>
            </Card>
          )}

          {os.servicoFinalizado !== undefined && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Status do Serviço</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-muted-foreground">Serviço Finalizado:</span>
                  <Badge variant={os.servicoFinalizado ? "default" : "secondary"}>
                    {os.servicoFinalizado ? "Sim" : "Não"}
                  </Badge>
                </div>
                {!os.servicoFinalizado && os.pendencia && (
                  <div>
                    <span className="text-sm text-muted-foreground">Pendência:</span>
                    <p className="text-sm mt-1">{os.pendencia}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {os.signature ? (
            <SignatureDisplay signatureData={os.signature} />
          ) : (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <PenTool className="h-4 w-4" />
                  Assinatura do Cliente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <PenTool className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Aguardando assinatura do cliente</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSignature(true)}
                    className="mt-2"
                    disabled={os.status !== "concluida"}
                  >
                    <PenTool className="h-4 w-4 mr-1" />
                    Coletar Assinatura
                  </Button>
                  {os.status !== "concluida" && (
                    <p className="text-xs text-muted-foreground mt-2">Conclua o serviço para coletar a assinatura</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Button
              variant="outline"
              onClick={() => setShowPhotoUpload(true)}
              className="flex items-center gap-2 bg-transparent"
            >
              <Camera className="h-4 w-4" />
              Adicionar Fotos
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowRelatorio(true)}
              className="flex items-center gap-2 bg-transparent"
            >
              <FileText className="h-4 w-4" />
              Gerar Relatório
            </Button>
            {photos.length > 0 && (
              <Button
                variant="outline"
                onClick={() => setShowPhotoGallery(true)}
                className="flex items-center gap-2 bg-transparent"
              >
                <ImageIcon className="h-4 w-4" />
                Ver Galeria
              </Button>
            )}
            {!os.signature && os.status === "concluida" && (
              <Button
                variant="outline"
                onClick={() => setShowSignature(true)}
                className="flex items-center gap-2 bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
              >
                <PenTool className="h-4 w-4" />
                Coletar Assinatura
              </Button>
            )}
          </div>

          {isEditing && (
            <div className="flex gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={handleSave} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {showEditForm && <NovaOSForm onClose={() => setShowEditForm(false)} onSave={handleEditFormSave} editingOS={os} />}

      {showTecnicoForm && (
        <TecnicoOSForm os={os} onClose={() => setShowTecnicoForm(false)} onSave={handleTecnicoFormSave} />
      )}

      {showPhotoUpload && (
        <PhotoUpload
          osId={os.id}
          existingPhotos={photos}
          onClose={() => setShowPhotoUpload(false)}
          onSave={handlePhotosUpdate}
        />
      )}

      {showPhotoGallery && <PhotoGallery photos={photos} onClose={() => setShowPhotoGallery(false)} />}

      {showRelatorio && <RelatorioGenerator os={os} photos={photos} onClose={() => setShowRelatorio(false)} />}

      {showSignature && (
        <DigitalSignature
          isOpen={showSignature}
          onClose={() => setShowSignature(false)}
          onSave={handleSignatureSave}
          osNumber={os.numeroOS || os.id}
        />
      )}
    </div>
  )
}
