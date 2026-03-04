"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Upload, X, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ImageFile {
  id: string
  url: string
  name: string
  type: string
}

interface ImageUploadProps {
  images: ImageFile[]
  onImagesChange: (images: ImageFile[]) => void
}

export { ImageUpload }
export default ImageUpload

function ImageUpload({ images, onImagesChange }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (files: FileList) => {
    const newImages: ImageFile[] = []

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newImage: ImageFile = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            url: e.target?.result as string,
            name: file.name,
            type: file.type,
          }
          newImages.push(newImage)

          // Update images when all files are processed
          if (newImages.length === Array.from(files).filter((f) => f.type.startsWith("image/")).length) {
            onImagesChange([...images, ...newImages])
          }
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
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const removeImage = (id: string) => {
    onImagesChange(images.filter((img) => img.id !== id))
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? "border-purple-500 bg-purple-50"
            : "border-gray-300 hover:border-purple-400 hover:bg-purple-50/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Camera className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium mb-2">Adicionar Imagens</h3>
        <p className="text-sm text-muted-foreground mb-4">Arraste e solte imagens aqui ou clique para selecionar</p>
        <div className="flex gap-2 justify-center">
          <Button type="button" onClick={openFileDialog} variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Selecionar Arquivos
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Formatos suportados: JPG, PNG, GIF (máx. 10MB por arquivo)</p>
      </div>

      <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleFileInput} className="hidden" />

      {/* Images Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="relative aspect-square">
                <img src={image.url || "/placeholder.svg"} alt={image.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                    onClick={() => window.open(image.url, "_blank")}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    className="h-8 w-8 p-0"
                    onClick={() => removeImage(image.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <p className="text-sm font-medium truncate">{image.name}</p>
                <Badge variant="secondary" className="text-xs">
                  {image.type.split("/")[1].toUpperCase()}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{images.length} imagem(ns) anexada(s)</span>
          <span>Total: {(images.length * 0.5).toFixed(1)}MB (estimado)</span>
        </div>
      )}
    </div>
  )
}
