"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar, User, FileText } from "lucide-react"

interface SignatureData {
  signature: string
  clientName: string
  clientDocument: string
  observations: string
  timestamp: string
}

interface SignatureDisplayProps {
  signatureData: SignatureData
}

export function SignatureDisplay({ signatureData }: SignatureDisplayProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-emerald-700">
          <CheckCircle className="h-5 w-5" />
          Serviço Assinado
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
            Confirmado
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Client Info */}
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{signatureData.clientName}</p>
              <p className="text-xs text-muted-foreground">{signatureData.clientDocument}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm">{formatDate(signatureData.timestamp)}</p>
          </div>
        </div>

        {/* Signature Image */}
        <div className="border rounded-lg p-3 bg-gray-50">
          <p className="text-xs text-muted-foreground mb-2">Assinatura:</p>
          <img
            src={signatureData.signature || "/placeholder.svg"}
            alt="Assinatura do cliente"
            className="max-w-full h-auto border rounded"
          />
        </div>

        {/* Observations */}
        {signatureData.observations && (
          <div className="flex gap-2">
            <FileText className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground mb-1">Observações:</p>
              <p className="text-sm">{signatureData.observations}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
