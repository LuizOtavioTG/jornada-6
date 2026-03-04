"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSign, Save } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function ConfigValores() {
  const { user } = useAuth()
  const [valores, setValores] = useState({
    valor_hora_deslocamento: "50.00",
    valor_km: "1.50",
    valor_hora_trabalhada: "80.00",
  })

  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    // Simular salvamento
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert("Valores atualizados com sucesso!")
    setSaving(false)
  }

  if (user?.role !== "admin") {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Apenas administradores podem acessar esta seção.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Configuração de Valores
        </CardTitle>
        <CardDescription>Defina os valores padrão para cálculo de custos das OS</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="valor_hora_deslocamento">Valor por Hora de Deslocamento (R$)</Label>
            <Input
              id="valor_hora_deslocamento"
              type="number"
              step="0.01"
              value={valores.valor_hora_deslocamento}
              onChange={(e) => setValores({ ...valores, valor_hora_deslocamento: e.target.value })}
              placeholder="50.00"
            />
            <p className="text-xs text-muted-foreground">Valor cobrado por hora durante o deslocamento até o cliente</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="valor_km">Valor por Quilômetro (R$)</Label>
            <Input
              id="valor_km"
              type="number"
              step="0.01"
              value={valores.valor_km}
              onChange={(e) => setValores({ ...valores, valor_km: e.target.value })}
              placeholder="1.50"
            />
            <p className="text-xs text-muted-foreground">Valor cobrado por quilômetro rodado</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="valor_hora_trabalhada">Valor por Hora Trabalhada (R$)</Label>
            <Input
              id="valor_hora_trabalhada"
              type="number"
              step="0.01"
              value={valores.valor_hora_trabalhada}
              onChange={(e) => setValores({ ...valores, valor_hora_trabalhada: e.target.value })}
              placeholder="80.00"
            />
            <p className="text-xs text-muted-foreground">Valor cobrado por hora de trabalho no local</p>
          </div>
        </div>

        <Button onClick={handleSave} disabled={saving} className="w-full">
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Salvando..." : "Salvar Configurações"}
        </Button>
      </CardContent>
    </Card>
  )
}
