"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Settings, Plus, Pencil, Trash2, UserPlus, Download, Search } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Usuario {
  id: number
  nome: string
  email: string
  role: "funcionario" | "tecnico"
  telefone: string
  ativo: boolean
  especialidade?: string
  regiao?: string
}

const mockFuncionarios: Usuario[] = [
  { id: 1, nome: "João Silva", email: "joao@fast.com", role: "funcionario", telefone: "(11) 98765-4321", ativo: true },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria@fast.com",
    role: "funcionario",
    telefone: "(11) 98765-4322",
    ativo: true,
  },
]

const mockTecnicos: Usuario[] = [
  {
    id: 3,
    nome: "Carlos Oliveira",
    email: "carlos@fast.com",
    role: "tecnico",
    telefone: "(11) 98765-4323",
    ativo: true,
    especialidade: "Refrigeração",
    regiao: "São Paulo - Zona Sul",
  },
  {
    id: 4,
    nome: "Ana Silva",
    email: "ana@fast.com",
    role: "tecnico",
    telefone: "(11) 98765-4324",
    ativo: true,
    especialidade: "Climatização",
    regiao: "São Paulo - Zona Norte",
  },
]

const AdminConfig: React.FC = () => {
  const { user } = useAuth()
  const [funcionarios, setFuncionarios] = useState(mockFuncionarios)
  const [tecnicos, setTecnicos] = useState(mockTecnicos)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingUser, setEditingUser] = useState<Usuario | null>(null)
  const [importMode, setImportMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    role: "funcionario" as "funcionario" | "tecnico",
    especialidade: "",
    regiao: "",
  })

  if (user?.role !== "admin") {
    return (
      <Alert>
        <AlertDescription>Apenas administradores podem acessar as configurações do sistema.</AlertDescription>
      </Alert>
    )
  }

  const handleOpenDialog = (usuario?: Usuario) => {
    if (usuario) {
      setEditingUser(usuario)
      setFormData({
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
        role: usuario.role,
        especialidade: usuario.especialidade || "",
        regiao: usuario.regiao || "",
      })
    } else {
      setEditingUser(null)
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        role: "funcionario",
        especialidade: "",
        regiao: "",
      })
    }
    setImportMode(false)
    setOpenDialog(true)
  }

  const handleImportFromExternal = () => {
    setImportMode(true)
    // TODO: Implementar integração com sistema terceiro
    console.log("[v0] Buscando técnico em sistema externo:", searchTerm)

    // Mock de dados importados
    setFormData({
      nome: "Técnico Importado",
      email: "importado@external.com",
      telefone: "(11) 99999-9999",
      role: "tecnico",
      especialidade: "Refrigeração Industrial",
      regiao: "São Paulo - Centro",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingUser) {
      // Atualizar usuário existente
      if (formData.role === "funcionario") {
        setFuncionarios((prev) =>
          prev.map((f) =>
            f.id === editingUser.id
              ? { ...f, nome: formData.nome, email: formData.email, telefone: formData.telefone }
              : f,
          ),
        )
      } else {
        setTecnicos((prev) =>
          prev.map((t) =>
            t.id === editingUser.id
              ? {
                  ...t,
                  nome: formData.nome,
                  email: formData.email,
                  telefone: formData.telefone,
                  especialidade: formData.especialidade,
                  regiao: formData.regiao,
                }
              : t,
          ),
        )
      }
    } else {
      // Criar novo usuário
      const newUser: Usuario = {
        id: Date.now(),
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        role: formData.role,
        ativo: true,
        especialidade: formData.especialidade || undefined,
        regiao: formData.regiao || undefined,
      }

      if (formData.role === "funcionario") {
        setFuncionarios((prev) => [...prev, newUser])
      } else {
        setTecnicos((prev) => [...prev, newUser])
      }
    }

    setOpenDialog(false)
  }

  const handleDelete = (id: number, role: "funcionario" | "tecnico") => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      if (role === "funcionario") {
        setFuncionarios((prev) => prev.filter((f) => f.id !== id))
      } else {
        setTecnicos((prev) => prev.filter((t) => t.id !== id))
      }
    }
  }

  const handleToggleStatus = (id: number, role: "funcionario" | "tecnico") => {
    if (role === "funcionario") {
      setFuncionarios((prev) => prev.map((f) => (f.id === id ? { ...f, ativo: !f.ativo } : f)))
    } else {
      setTecnicos((prev) => prev.map((t) => (t.id === id ? { ...t, ativo: !t.ativo } : t)))
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            <CardTitle>Configurações do Sistema</CardTitle>
          </div>
        </div>
        <CardDescription>Gerencie funcionários e técnicos do sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="funcionarios" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="funcionarios">Funcionários ({funcionarios.length})</TabsTrigger>
            <TabsTrigger value="tecnicos">Técnicos ({tecnicos.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="funcionarios" className="space-y-4">
            <div className="flex justify-between items-center">
              <Input placeholder="Buscar funcionário..." className="max-w-sm" />
              <Button onClick={() => handleOpenDialog()} type="button">
                <Plus className="h-4 w-4 mr-2" />
                Novo Funcionário
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {funcionarios.map((func) => (
                  <TableRow key={func.id}>
                    <TableCell className="font-medium">{func.nome}</TableCell>
                    <TableCell>{func.email}</TableCell>
                    <TableCell>{func.telefone}</TableCell>
                    <TableCell>
                      <Badge variant={func.ativo ? "default" : "secondary"}>{func.ativo ? "Ativo" : "Inativo"}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(func)} type="button">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(func.id, "funcionario")}
                          type="button"
                        >
                          {func.ativo ? "Desativar" : "Ativar"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(func.id, "funcionario")}
                          type="button"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="tecnicos" className="space-y-4">
            <div className="flex justify-between items-center">
              <Input placeholder="Buscar técnico..." className="max-w-sm" />
              <Button onClick={() => handleOpenDialog()} type="button">
                <Plus className="h-4 w-4 mr-2" />
                Novo Técnico
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Especialidade</TableHead>
                  <TableHead>Região</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tecnicos.map((tec) => (
                  <TableRow key={tec.id}>
                    <TableCell className="font-medium">{tec.nome}</TableCell>
                    <TableCell>{tec.email}</TableCell>
                    <TableCell>{tec.telefone}</TableCell>
                    <TableCell>{tec.especialidade}</TableCell>
                    <TableCell>{tec.regiao}</TableCell>
                    <TableCell>
                      <Badge variant={tec.ativo ? "default" : "secondary"}>{tec.ativo ? "Ativo" : "Inativo"}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(tec)} type="button">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(tec.id, "tecnico")}
                          type="button"
                        >
                          {tec.ativo ? "Desativar" : "Ativar"}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(tec.id, "tecnico")} type="button">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingUser ? "Editar Usuário" : `Novo ${formData.role === "funcionario" ? "Funcionário" : "Técnico"}`}
              </DialogTitle>
              <DialogDescription>
                {editingUser
                  ? "Atualize as informações do usuário"
                  : `Preencha os dados para criar um novo ${formData.role === "funcionario" ? "funcionário" : "técnico"}`}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!editingUser && (
                <div className="space-y-2">
                  <Label>Tipo de Usuário</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value: "funcionario" | "tecnico") => setFormData({ ...formData, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="funcionario">Funcionário</SelectItem>
                      <SelectItem value="tecnico">Técnico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {formData.role === "tecnico" && !editingUser && (
                <div className="p-4 border rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Download className="h-4 w-4" />
                    <Label>Importar de Sistema Externo</Label>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="CPF ou código do técnico..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button type="button" variant="outline" onClick={handleImportFromExternal}>
                      <Search className="h-4 w-4 mr-2" />
                      Buscar
                    </Button>
                  </div>
                  {importMode && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Dados importados do sistema externo. Revise antes de salvar.
                    </p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone *</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  placeholder="(11) 98765-4321"
                  required
                />
              </div>

              {formData.role === "tecnico" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="especialidade">Especialidade</Label>
                    <Input
                      id="especialidade"
                      value={formData.especialidade}
                      onChange={(e) => setFormData({ ...formData, especialidade: e.target.value })}
                      placeholder="Ex: Refrigeração, Climatização"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="regiao">Região de Atendimento</Label>
                    <Input
                      id="regiao"
                      value={formData.regiao}
                      onChange={(e) => setFormData({ ...formData, regiao: e.target.value })}
                      placeholder="Ex: São Paulo - Zona Sul"
                    />
                  </div>
                </>
              )}

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setOpenDialog(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  <UserPlus className="h-4 w-4 mr-2" />
                  {editingUser ? "Atualizar" : "Criar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

export default AdminConfig
