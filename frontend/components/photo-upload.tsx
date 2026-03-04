"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Camera, Upload, ImageIcon, Trash2 } from "lucide-react"

interface PhotoUploadProps {
  osId: string
  onClose: () => void
  onSave: (photos: any[]) => void
  existingPhotos?: any[]
}

export default function PhotoUpload({ osId, onClose, onSave, existingPhotos = [] }: PhotoUploadProps) {
  const [photos, setPhotos] = useState<any[]>(existingPhotos)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const momentos = [
    { value: "antes", label: "Antes do Serviço" },
    { value: "durante", label: "Durante o Serviço" },
    { value: "depois", label: "Depois do Serviço" },
  ]

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newPhoto = {
            id: `photo-${Date.now()}-${Math.random()}`,
            file,
            url: e.target?.result as string,
            nome: file.name,
            momento: "durante",
            descricao: "",
            timestamp: new Date().toISOString(),
          }
          setPhotos((prev) => [...prev, newPhoto])
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  const updatePhoto = (photoId: string, updates: Partial<any>) => {
    setPhotos((prev) => prev.map((photo) => (photo.id === photoId ? { ...photo, ...updates } : photo)))
  }

  const removePhoto = (photoId: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== photoId))
  }

  const handleSave = () => {
    onSave(photos)
    onClose()
  }

  const capturePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      // Aqui você implementaria a captura da câmera
      // Por simplicidade, vamos simular com o input de arquivo
      fileInputRef.current?.click()
    } catch (error) {
      // Fallback para input de arquivo se câmera não estiver disponível
      fileInputRef.current?.click()
    }
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Fotos da Ordem de Serviço
            </CardTitle>
            <CardDescription>Adicione fotos do antes, durante e depois do serviço</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Upload Area */}
          <Card>
            <CardContent className="p-6">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? "border-primary bg-primary/5" : "border-border"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">Adicionar Fotos</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Arraste e solte as fotos aqui ou clique para selecionar
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Selecionar Arquivos
                  </Button>
                  <Button onClick={capturePhoto}>
                    <Camera className="h-4 w-4 mr-2" />
                    Tirar Foto
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>

          {/* Photos by Moment */}
          {momentos.map((momento) => {
            const momentoPhotos = groupedPhotos[momento.value] || []
            if (momentoPhotos.length === 0) return null

            return (
              <Card key={momento.value}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">
                    {momento.label} ({momentoPhotos.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {momentoPhotos.map((photo) => (
                    <div key={photo.id} className="border rounded-lg p-4">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <img
                            src={photo.url || "/placeholder.svg"}
                            alt={photo.nome}
                            className="w-24 h-24 object-cover rounded-lg border"
                          />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label htmlFor={`nome-${photo.id}`}>Nome da Foto</Label>
                              <Input
                                id={`nome-${photo.id}`}
                                value={photo.nome}
                                onChange={(e) => updatePhoto(photo.id, { nome: e.target.value })}
                                placeholder="Ex: Compressor antes do reparo"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`momento-${photo.id}`}>Momento</Label>
                              <Select
                                value={photo.momento}
                                onValueChange={(value) => updatePhoto(photo.id, { momento: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {momentos.map((m) => (
                                    <SelectItem key={m.value} value={m.value}>
                                      {m.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`descricao-${photo.id}`}>Descrição</Label>
                            <Textarea
                              id={`descricao-${photo.id}`}
                              value={photo.descricao}
                              onChange={(e) => updatePhoto(photo.id, { descricao: e.target.value })}
                              placeholder="Descreva o que mostra esta foto..."
                              rows={2}
                            />
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removePhoto(photo.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )
          })}

          {photos.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma foto adicionada ainda</p>
              <p className="text-sm mt-1">Adicione fotos para documentar o serviço</p>
            </div>
          )}
        </CardContent>

        <div className="flex gap-3 p-6 pt-0">
          <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Cancelar
          </Button>
          <Button onClick={handleSave} className="flex-1">
            <Camera className="h-4 w-4 mr-2" />
            Salvar Fotos ({photos.length})
          </Button>
        </div>
      </Card>
    </div>
  )
}
