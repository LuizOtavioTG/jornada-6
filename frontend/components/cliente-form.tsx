"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Save, Building } from "lucide-react"

interface ClienteFormProps {
  cliente?: any
  onClose: () => void
  onSave: (clienteData: any) => void
}

export default function ClienteForm({ cliente, onClose, onSave }: ClienteFormProps) {
  const [formData, setFormData] = useState({
    nome: cliente?.nome || "",
    cnpj: cliente?.cnpj || "",
    endereco: cliente?.endereco || "",
    telefone: cliente?.telefone || "",
    email: cliente?.email || "",
    contatoResponsavel: cliente?.contatoResponsavel || "",
    observacoes: cliente?.observacoes || "",
  })

  const isEditing = !!cliente

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const clienteData = {
      ...formData,
      id: cliente?.id || `cliente-${Date.now()}`,
      createdAt: cliente?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    onSave(clienteData)
    onClose()
  }

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
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
              <Building className="h-5 w-5" />
              {isEditing ? "Editar Cliente" : "Novo Cliente"}
            </CardTitle>
            <CardDescription>
              {isEditing ? "Atualize os dados do cliente" : "Preencha os dados para cadastrar um novo cliente"}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Dados Básicos */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome/Razão Social *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="Ex: Supermercado Central Ltda"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    value={formData.cnpj}
                    onChange={(e) => setFormData({ ...formData, cnpj: formatCNPJ(e.target.value) })}
                    placeholder="00.000.000/0000-00"
                    maxLength={18}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço Completo</Label>
                <Textarea
                  id="endereco"
                  value={formData.endereco}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                  placeholder="Rua, número, complemento, bairro, cidade, estado, CEP"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contato@empresa.com.br"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contatoResponsavel">Contato Responsável</Label>
                <Input
                  id="contatoResponsavel"
                  value={formData.contatoResponsavel}
                  onChange={(e) => setFormData({ ...formData, contatoResponsavel: e.target.value })}
                  placeholder="Nome do responsável pelo contato"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                  placeholder="Informações adicionais sobre o cliente..."
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
