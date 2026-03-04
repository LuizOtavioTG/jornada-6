"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PenTool, RotateCcw, Check, X } from "lucide-react"

interface DigitalSignatureProps {
  isOpen: boolean
  onClose: () => void
  onSave: (signatureData: {
    signature: string
    clientName: string
    clientDocument: string
    observations: string
    timestamp: string
  }) => void
  osNumber: string
}

export function DigitalSignature({ isOpen, onClose, onSave, osNumber }: DigitalSignatureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [clientName, setClientName] = useState("")
  const [clientDocument, setClientDocument] = useState("")
  const [observations, setObservations] = useState("")
  const [hasSignature, setHasSignature] = useState(false)

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.strokeStyle = "#059669"
        ctx.lineWidth = 2
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
      }
    }
  }, [isOpen])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    setHasSignature(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

    const x = clientX - rect.left
    const y = clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.beginPath()
      ctx.moveTo(x, y)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

    const x = clientX - rect.left
    const y = clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      setHasSignature(false)
    }
  }

  const handleSave = () => {
    if (!hasSignature || !clientName.trim() || !clientDocument.trim()) {
      alert("Por favor, preencha todos os campos obrigatórios e adicione a assinatura.")
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const signatureDataUrl = canvas.toDataURL("image/png")

    onSave({
      signature: signatureDataUrl,
      clientName: clientName.trim(),
      clientDocument: clientDocument.trim(),
      observations: observations.trim(),
      timestamp: new Date().toISOString(),
    })

    // Reset form
    setClientName("")
    setClientDocument("")
    setObservations("")
    clearSignature()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PenTool className="h-5 w-5 text-emerald-600" />
            Assinatura Digital - OS #{osNumber}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Client Information */}
          <div className="space-y-3">
            <div>
              <Label htmlFor="clientName">Nome do Cliente *</Label>
              <Input
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Nome completo do responsável"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="clientDocument">CPF/CNPJ *</Label>
              <Input
                id="clientDocument"
                value={clientDocument}
                onChange={(e) => setClientDocument(e.target.value)}
                placeholder="000.000.000-00 ou 00.000.000/0001-00"
                className="mt-1"
              />
            </div>
          </div>

          {/* Signature Canvas */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Assinatura *</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border-2 border-dashed border-emerald-200 rounded-lg p-2">
                <canvas
                  ref={canvasRef}
                  width={280}
                  height={120}
                  className="w-full h-30 bg-white rounded cursor-crosshair touch-none"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
              </div>

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={clearSignature}
                  className="flex items-center gap-1 bg-transparent"
                >
                  <RotateCcw className="h-4 w-4" />
                  Limpar
                </Button>
                <p className="text-xs text-muted-foreground self-center">Assine na área acima</p>
              </div>
            </CardContent>
          </Card>

          {/* Observations */}
          <div>
            <Label htmlFor="observations">Observações</Label>
            <Textarea
              id="observations"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Observações adicionais sobre o serviço..."
              className="mt-1 min-h-[80px]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              <X className="h-4 w-4 mr-1" />
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              disabled={!hasSignature || !clientName.trim() || !clientDocument.trim()}
            >
              <Check className="h-4 w-4 mr-1" />
              Confirmar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
