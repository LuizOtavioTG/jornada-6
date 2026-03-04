"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PenTool, RotateCcw, Check, X } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface ClientSignatureProps {
  osData: any
  onSignatureComplete: (signatureData: any) => void
  onCancel: () => void
}

export default function ClientSignature({ osData, onSignatureComplete, onCancel }: ClientSignatureProps) {
  const { user } = useAuth()
  const canSign = user?.role === "cliente" && user?.empresa === osData.clienteData?.empresa

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [clientName, setClientName] = useState("")
  const [clientDocument, setClientDocument] = useState("")

  if (!canSign) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <X className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <h3 className="text-lg font-semibold mb-2">Acesso Negado</h3>
          <p className="text-muted-foreground">
            Apenas clientes da empresa {osData.clienteData?.nome} podem assinar esta OS.
          </p>
          <Button onClick={onCancel} className="mt-4">
            Voltar
          </Button>
        </CardContent>
      </Card>
    )
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.beginPath()
      ctx.moveTo(x, y)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

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
    }
  }

  const saveSignature = () => {
    if (!clientName.trim() || !clientDocument.trim()) {
      alert("Por favor, preencha seu nome e documento")
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const signatureData = canvas.toDataURL()

    const signatureInfo = {
      signature: signatureData,
      clientName: clientName.trim(),
      clientDocument: clientDocument.trim(),
      timestamp: new Date().toISOString(),
      userEmail: user?.email,
      osId: osData.id,
    }

    onSignatureComplete(signatureInfo)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PenTool className="h-5 w-5" />
            Assinatura Digital - OS {osData.numeroOS}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome Completo</Label>
              <Input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Digite seu nome completo"
              />
            </div>
            <div className="space-y-2">
              <Label>CPF/CNPJ</Label>
              <Input
                value={clientDocument}
                onChange={(e) => setClientDocument(e.target.value)}
                placeholder="Digite seu documento"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Assinatura Digital</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <canvas
                ref={canvasRef}
                width={600}
                height={200}
                className="w-full border border-gray-200 rounded cursor-crosshair bg-white"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-muted-foreground">Assine no campo acima usando o mouse</p>
                <Button onClick={clearSignature} variant="outline" size="sm">
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Limpar
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Resumo da OS</h4>
            <div className="text-sm space-y-1">
              <p>
                <strong>Cliente:</strong> {osData.clienteData?.nome}
              </p>
              <p>
                <strong>Técnico:</strong> {osData.tecnicoData?.nome}
              </p>
              <p>
                <strong>Valor Total:</strong> R$ {osData.valor_total?.toFixed(2)}
              </p>
              <p>
                <strong>Status:</strong> {osData.status}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={onCancel} variant="outline" className="flex-1 bg-transparent">
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button onClick={saveSignature} className="flex-1 bg-green-600 hover:bg-green-700">
              <Check className="h-4 w-4 mr-2" />
              Confirmar Assinatura
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
