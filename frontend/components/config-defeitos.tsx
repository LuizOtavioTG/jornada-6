"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Save, X, Wrench } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface Defeito {
  id: number
  categoria: string
  subcategoria: string | null
  codigo: string
  descricao: string
  ativo: boolean
  ordem: number
}

export default function ConfigDefeitos() {
  const { user } = useAuth()
  const [defeitos, setDefeitos] = useState<Defeito[]>([
    {
      id: 1,
      categoria: "refrigeracao",
      subcategoria: "compressor",
      codigo: "comp_queimado",
      descricao: "Compressor Queimado",
      ativo: true,
      ordem: 1,
    },
    {
      id: 2,
      categoria: "refrigeracao",
      subcategoria: "compressor",
      codigo: "comp_em_massa",
      descricao: "Compressor Em Massa",
      ativo: true,
      ordem: 2,
    },
    {
      id: 3,
      categoria: "iluminacao",
      subcategoria: null,
      codigo: "ilum_lampada_queimada",
      descricao: "Lâmpada Queimada",
      ativo: true,
      ordem: 30,
    },
  ])

  const [editingId, setEditingId] = useState<number | null>(null)
  const [showNewForm, setShowNewForm] = useState(false)
  const [newDefeito, setNewDefeito] = useState({
    categoria: "refrigeracao",
    subcategoria: "",
    codigo: "",
    descricao: "",
  })

  const handleAddDefeito = () => {
    const defeito: Defeito = {
      id: Date.now(),
      categoria: newDefeito.categoria,
      subcategoria: newDefeito.subcategoria || null,
      codigo: newDefeito.codigo,
      descricao: newDefeito.descricao,
      ativo: true,
      ordem: defeitos.length + 1,
    }
    setDefeitos([...defeitos, defeito])
    setNewDefeito({ categoria: "refrigeracao", subcategoria: "", codigo: "", descricao: "" })
    setShowNewForm(false)
  }

  const handleDeleteDefeito = (id: number) => {
    if (confirm("Tem certeza que deseja remover este defeito?")) {
      setDefeitos(defeitos.filter((d) => d.id !== id))
    }
  }

  const handleToggleAtivo = (id: number) => {
    setDefeitos(defeitos.map((d) => (d.id === id ? { ...d, ativo: !d.ativo } : d)))
  }

  const getCategoriaLabel = (categoria: string) => {
    switch (categoria) {
      case "refrigeracao":
        return "Refrigeração"
      case "iluminacao":
        return "Iluminação"
      case "estrutura":
        return "Estrutura"
      default:
        return categoria
    }
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
          <Wrench className="h-5 w-5" />
          Gerenciar Defeitos Específicos
        </CardTitle>
        <CardDescription>Adicione ou remova defeitos da lista de descrição técnica</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={() => setShowNewForm(!showNewForm)} variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Novo Defeito
        </Button>

        {showNewForm && (
          <Card className="border-2 border-primary">
            <CardContent className="p-4 space-y-3">
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select
                  value={newDefeito.categoria}
                  onValueChange={(v) => setNewDefeito({ ...newDefeito, categoria: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="refrigeracao">Refrigeração</SelectItem>
                    <SelectItem value="iluminacao">Iluminação</SelectItem>
                    <SelectItem value="estrutura">Estrutura</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newDefeito.categoria === "refrigeracao" && (
                <div className="space-y-2">
                  <Label>Subcategoria (opcional)</Label>
                  <Input
                    value={newDefeito.subcategoria}
                    onChange={(e) => setNewDefeito({ ...newDefeito, subcategoria: e.target.value })}
                    placeholder="Ex: compressor, vazamento"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>Código</Label>
                <Input
                  value={newDefeito.codigo}
                  onChange={(e) => setNewDefeito({ ...newDefeito, codigo: e.target.value })}
                  placeholder="Ex: comp_queimado"
                />
              </div>

              <div className="space-y-2">
                <Label>Descrição</Label>
                <Input
                  value={newDefeito.descricao}
                  onChange={(e) => setNewDefeito({ ...newDefeito, descricao: e.target.value })}
                  placeholder="Ex: Compressor Queimado"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddDefeito} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </Button>
                <Button onClick={() => setShowNewForm(false)} variant="outline" className="flex-1">
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-2">
          {defeitos.map((defeito) => (
            <Card key={defeito.id} className={!defeito.ativo ? "opacity-50" : ""}>
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{getCategoriaLabel(defeito.categoria)}</Badge>
                      {defeito.subcategoria && <Badge variant="secondary">{defeito.subcategoria}</Badge>}
                      {!defeito.ativo && <Badge variant="destructive">Inativo</Badge>}
                    </div>
                    <div className="font-medium">{defeito.descricao}</div>
                    <div className="text-xs text-muted-foreground">{defeito.codigo}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleToggleAtivo(defeito.id)}>
                      {defeito.ativo ? "Desativar" : "Ativar"}
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteDefeito(defeito.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
