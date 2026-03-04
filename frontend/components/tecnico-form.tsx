"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { X, Save, User } from "lucide-react"

interface TecnicoFormProps {
  tecnico?: any
  onClose: () => void
  onSave: (tecnicoData: any) => void
}

export default function TecnicoForm({ tecnico, onClose, onSave }: TecnicoFormProps) {
  const [formData, setFormData] = useState({
    nome: tecnico?.nome || "",
    email: tecnico?.email || "",
    telefone: tecnico?.telefone || "",
    especialidade: tecnico?.especialidade || "",
    nivel: tecnico?.nivel || "junior",
    ativo: tecnico?.ativo !== undefined ? tecnico.ativo : true,
    observacoes: tecnico?.observacoes || "",
  })

  const isEditing = !!tecnico

  const especialidades = [
    "Refrigeração Comercial",
    "Sistemas de Ar Condicionado",
    "Manutenção Preventiva",
    "Instalação de Equipamentos",
    "Reparos Elétricos",
    "Diagnóstico Técnico",
  ]

  const niveis = [
    { value: "junior", label: "Júnior" },
    { value: "pleno", label: "Pleno" },
    { value: "senior", label: "Sênior" },
    { value: "especialista", label: "Especialista" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const tecnicoData = {
      ...formData,
      id: tecnico?.id || `tecnico-${Date.now()}`,
      createdAt: tecnico?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    onSave(tecnicoData)
    onClose()
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {isEditing ? "Editar Técnico" : "Novo Técnico"}
            </CardTitle>
            <CardDescription>
              {isEditing ? "Atualize os dados do técnico" : "Preencha os dados para cadastrar um novo técnico"}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Dados Pessoais */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="Ex: João Silva Santos"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="joao.silva@empresa.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: formatPhone(e.target.value) })}
                  placeholder="(11) 99999-9999"
                  maxLength={15}
                />
              </div>
            </div>

            {/* Dados Profissionais */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="especialidade">Especialidade *</Label>
                  <Select
                    value={formData.especialidade}
                    onValueChange={(value) => setFormData({ ...formData, especialidade: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a especialidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {especialidades.map((esp) => (
                        <SelectItem key={esp} value={esp}>
                          {esp}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nivel">Nível de Experiência</Label>
                  <Select value={formData.nivel} onValueChange={(value) => setFormData({ ...formData, nivel: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nível" />
                    </SelectTrigger>
                    <SelectContent>
                      {niveis.map((nivel) => (
                        <SelectItem key={nivel.value} value={nivel.value}>
                          {nivel.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="ativo"
                  checked={formData.ativo}
                  onCheckedChange={(checked) => setFormData({ ...formData, ativo: checked })}
                />
                <Label htmlFor="ativo">Técnico ativo</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                  placeholder="Informações adicionais sobre o técnico, certificações, etc..."
                  rows={3}
                />
              </div>
            </div>
          </CardContent>

          <div className="flex gap-3 p-6 pt-0">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              {isEditing ? "Atualizar" : "Cadastrar"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
