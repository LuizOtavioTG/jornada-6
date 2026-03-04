"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, ZoomIn, Download, Calendar } from "lucide-react"

interface PhotoGalleryProps {
  photos: any[]
  onClose: () => void
}

export default function PhotoGallery({ photos, onClose }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null)

  const momentos = [
    { value: "antes", label: "Antes do Serviço", color: "bg-blue-100 text-blue-800" },
    { value: "durante", label: "Durante o Serviço", color: "bg-yellow-100 text-yellow-800" },
    { value: "depois", label: "Depois do Serviço", color: "bg-green-100 text-green-800" },
  ]

  const getMomentoInfo = (momento: string) => {
    return momentos.find((m) => m.value === momento) || momentos[1]
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR")
  }

  const downloadPhoto = (photo: any) => {
    const link = document.createElement("a")
    link.href = photo.url
    link.download = photo.nome || "foto-os.jpg"
    link.click()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Galeria de Fotos ({photos.length})
            </CardTitle>
            <CardDescription>Visualize todas as fotos documentadas do serviço</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {momentos.map((momento) => {
            const momentoPhotos = groupedPhotos[momento.value] || []
            if (momentoPhotos.length === 0) return null

            return (
              <Card key={momento.value}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Badge className={momento.color}>{momento.label}</Badge>
                    <span className="text-sm text-muted-foreground">({momentoPhotos.length} fotos)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {momentoPhotos.map((photo) => (
                      <div key={photo.id} className="group relative">
                        <div className="aspect-square overflow-hidden rounded-lg border bg-muted">
                          <img
                            src={photo.url || "/placeholder.svg"}
                            alt={photo.nome}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => setSelectedPhoto(photo)}
                                className="h-8 w-8 p-0"
                              >
                                <ZoomIn className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => downloadPhoto(photo)}
                                className="h-8 w-8 p-0"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm font-medium line-clamp-1">{photo.nome}</p>
                          {photo.descricao && (
                            <p className="text-xs text-muted-foreground line-clamp-2">{photo.descricao}</p>
                          )}
                          <p className="text-xs text-muted-foreground">{formatDate(photo.timestamp)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {photos.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Nenhuma foto encontrada</p>
              <p className="text-sm mt-1">As fotos do serviço aparecerão aqui quando forem adicionadas</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[60]">
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
            >
              <X className="h-4 w-4" />
            </Button>
            <img
              src={selectedPhoto.url || "/placeholder.svg"}
              alt={selectedPhoto.nome}
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded-lg">
              <h3 className="font-medium mb-1">{selectedPhoto.nome}</h3>
              {selectedPhoto.descricao && <p className="text-sm opacity-90 mb-2">{selectedPhoto.descricao}</p>}
              <div className="flex items-center justify-between text-xs opacity-75">
                <Badge className={getMomentoInfo(selectedPhoto.momento).color}>
                  {getMomentoInfo(selectedPhoto.momento).label}
                </Badge>
                <span>{formatDate(selectedPhoto.timestamp)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
