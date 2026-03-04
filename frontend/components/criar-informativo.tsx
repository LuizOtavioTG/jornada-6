"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Bell, Plus } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export function CriarInformativo() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    titulo: "",
    conteudo: "",
    tipo: "geral",
    prioridade: "normal",
    os_id: "",
    tecnico_id: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log("[v0] Criando informativo:", formData)

    // TODO: Implementar salvamento no backend

    setOpen(false)
    setFormData({
      titulo: "",
      conteudo: "",
      tipo: "geral",
      prioridade: "normal",
      os_id: "",
      tecnico_id: "",
    })
  }

  const isFastEmployee = user?.role === "funcionario" || user?.role === "admin"

  if (!isFastEmployee) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button">
          <Plus className="h-4 w-4 mr-2" />
          Novo Informativo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Criar Novo Informativo
          </DialogTitle>
          <DialogDescription>
            Crie informativos para orientar técnicos sobre prazos, pagamentos e procedimentos
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título *</Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              placeholder="Ex: Prazo de Garantia - Atenção"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo *</Label>
              <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="geral">Geral</SelectItem>
                  <SelectItem value="os_especifica">OS Específica</SelectItem>
                  <SelectItem value="prazo_garantia">Prazo de Garantia</SelectItem>
                  <SelectItem value="previsao_pagamento">Previsão de Pagamento</SelectItem>
                  <SelectItem value="orientacao_tecnica">Orientação Técnica</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prioridade">Prioridade *</Label>
              <Select
                value={formData.prioridade}
                onValueChange={(value) => setFormData({ ...formData, prioridade: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="urgente">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.tipo === "os_especifica" && (
            <div className="space-y-2">
              <Label htmlFor="os_id">Número da OS</Label>
              <Input
                id="os_id"
                type="number"
                value={formData.os_id}
                onChange={(e) => setFormData({ ...formData, os_id: e.target.value })}
                placeholder="Ex: 1234"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="tecnico_id">Destinatário</Label>
            <Select
              value={formData.tecnico_id}
              onValueChange={(value) => setFormData({ ...formData, tecnico_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos os técnicos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os técnicos</SelectItem>
                <SelectItem value="1">Carlos Oliveira</SelectItem>
                <SelectItem value="2">Ana Silva</SelectItem>
                <SelectItem value="3">Roberto Santos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="conteudo">Conteúdo *</Label>
            <Textarea
              id="conteudo"
              value={formData.conteudo}
              onChange={(e) => setFormData({ ...formData, conteudo: e.target.value })}
              placeholder="Descreva as orientações, prazos ou informações importantes..."
              rows={6}
              required
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Criar Informativo</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CriarInformativo
