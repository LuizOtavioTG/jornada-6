"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, User, MapPin, Building2 } from "lucide-react"

interface Cliente {
  id: number
  codigo: string
  nome: string
  cnpj: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
  cep: string
  telefone: string
  email: string
  contato_responsavel: string
  regiao: string
  tipo_estabelecimento: string
}

interface ClientSearchProps {
  onClientSelect: (client: Cliente) => void
  selectedClient: Cliente | null
}

export default function ClientSearch({ onClientSelect, selectedClient }: ClientSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showNewClientForm, setShowNewClientForm] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)

  const mockClients: Cliente[] = [
    {
      id: 1,
      codigo: "CLI-001001",
      nome: "Supermercado Central Ltda",
      cnpj: "12.345.678/0001-90",
      logradouro: "Rua das Flores",
      numero: "123",
      bairro: "Centro",
      cidade: "São Paulo",
      uf: "SP",
      cep: "01234-567",
      telefone: "(11) 99999-1234",
      email: "contato@supercentral.com",
      contato_responsavel: "José Silva",
      regiao: "Centro",
      tipo_estabelecimento: "Supermercado",
    },
    {
      id: 2,
      codigo: "CLI-001002",
      nome: "Mercado do Bairro ME",
      cnpj: "98.765.432/0001-10",
      logradouro: "Av. Principal",
      numero: "456",
      bairro: "Vila Nova",
      cidade: "São Paulo",
      uf: "SP",
      cep: "02345-678",
      telefone: "(11) 88888-5678",
      email: "admin@mercadobairro.com",
      contato_responsavel: "Maria Santos",
      regiao: "Zona Norte",
      tipo_estabelecimento: "Mercado",
    },
    {
      id: 3,
      codigo: "CLI-001003",
      nome: "Açougue Premium",
      cnpj: "11.222.333/0001-44",
      logradouro: "Rua do Comércio",
      numero: "789",
      bairro: "Moema",
      cidade: "São Paulo",
      uf: "SP",
      cep: "04567-890",
      telefone: "(11) 77777-9999",
      email: "contato@acougue.com",
      contato_responsavel: "Carlos Oliveira",
      regiao: "Zona Sul",
      tipo_estabelecimento: "Açougue",
    },
    {
      id: 4,
      codigo: "CLI-001004",
      nome: "Padaria Bella Vista",
      cnpj: "55.666.777/0001-88",
      logradouro: "Av. Paulista",
      numero: "1000",
      bairro: "Bela Vista",
      cidade: "São Paulo",
      uf: "SP",
      cep: "01310-100",
      telefone: "(11) 66666-1111",
      email: "padaria@bellavista.com",
      contato_responsavel: "Ana Costa",
      regiao: "Centro",
      tipo_estabelecimento: "Padaria",
    },
    {
      id: 5,
      codigo: "CLI-001005",
      nome: "Restaurante Sabor & Arte",
      cnpj: "99.888.777/0001-66",
      logradouro: "Rua Augusta",
      numero: "2500",
      bairro: "Consolação",
      cidade: "São Paulo",
      uf: "SP",
      cep: "01412-100",
      telefone: "(11) 55555-2222",
      email: "contato@saborarte.com",
      contato_responsavel: "Roberto Lima",
      regiao: "Centro",
      tipo_estabelecimento: "Restaurante",
    },
    {
      id: 6,
      codigo: "CLI-001006",
      nome: "Distribuidora Norte",
      cnpj: "33.444.555/0001-22",
      logradouro: "Av. Cruzeiro do Sul",
      numero: "1500",
      bairro: "Santana",
      cidade: "São Paulo",
      uf: "SP",
      cep: "02031-000",
      telefone: "(11) 44444-3333",
      email: "vendas@distribuidoranorte.com",
      contato_responsavel: "Fernanda Silva",
      regiao: "Zona Norte",
      tipo_estabelecimento: "Distribuidora",
    },
  ]

  const [newClient, setNewClient] = useState<Partial<Cliente>>({
    nome: "",
    cnpj: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    telefone: "",
    email: "",
    contato_responsavel: "",
    regiao: "",
    tipo_estabelecimento: "",
  })

  const filteredClients = mockClients.filter(
    (client) =>
      client.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.cnpj.includes(searchTerm) ||
      client.regiao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.tipo_estabelecimento.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSearch = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setShowSearchResults(true)
  }

  const handleCreateClient = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    const clientWithCode: Cliente = {
      ...(newClient as Cliente),
      id: Date.now(),
      codigo: `CLI-${String(Date.now()).slice(-6)}`,
    }
    onClientSelect(clientWithCode)
    setShowNewClientForm(false)
    setNewClient({})
  }

  const ufs = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ]

  const regioes = ["Centro", "Zona Norte", "Zona Sul", "Zona Leste", "Zona Oeste", "Grande SP"]
  const tiposEstabelecimento = [
    "Supermercado",
    "Mercado",
    "Açougue",
    "Padaria",
    "Restaurante",
    "Distribuidora",
    "Lanchonete",
    "Bar",
    "Hotel",
    "Farmácia",
  ]

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, código, CNPJ, região ou tipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleSearch()
              }
            }}
            className="pl-10"
          />
        </div>
        <Button type="button" onClick={(e) => handleSearch(e)} variant="outline">
          <Search className="h-4 w-4 mr-1" />
          Buscar
        </Button>
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setShowNewClientForm(true)
          }}
          variant="outline"
        >
          <Plus className="h-4 w-4 mr-1" />
          Novo
        </Button>
      </div>

      {selectedClient && (
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <User className="h-4 w-4 text-emerald-600" />
              <span className="font-medium text-emerald-800">Cliente Selecionado</span>
              <Badge variant="secondary" className="ml-auto">
                <MapPin className="h-3 w-3 mr-1" />
                {selectedClient.regiao}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p>
                  <strong>Código:</strong> {selectedClient.codigo}
                </p>
                <p>
                  <strong>Nome:</strong> {selectedClient.nome}
                </p>
                <p>
                  <strong>CNPJ:</strong> {selectedClient.cnpj}
                </p>
                <p>
                  <strong>Tipo:</strong> {selectedClient.tipo_estabelecimento}
                </p>
              </div>
              <div className="space-y-1">
                <p>
                  <strong>Endereço:</strong> {selectedClient.logradouro}, {selectedClient.numero}
                </p>
                <p>
                  <strong>Bairro:</strong> {selectedClient.bairro} - {selectedClient.regiao}
                </p>
                <p>
                  <strong>Cidade:</strong> {selectedClient.cidade}/{selectedClient.uf}
                </p>
                <p>
                  <strong>Contato:</strong> {selectedClient.contato_responsavel} - {selectedClient.telefone}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results Dialog */}
      <Dialog open={showSearchResults} onOpenChange={setShowSearchResults}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Resultados da Busca ({filteredClients.length} encontrados)</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {filteredClients.map((client) => (
              <Card
                key={client.id}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => {
                  onClientSelect(client)
                  setShowSearchResults(false)
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">{client.nome}</span>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{client.tipo_estabelecimento}</Badge>
                      <Badge variant="secondary">
                        <MapPin className="h-3 w-3 mr-1" />
                        {client.regiao}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                    <div>
                      <p>
                        <strong>Código:</strong> {client.codigo}
                      </p>
                      <p>
                        <strong>CNPJ:</strong> {client.cnpj}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Endereço:</strong> {client.logradouro}, {client.numero}
                      </p>
                      <p>
                        <strong>Bairro:</strong> {client.bairro}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Cidade:</strong> {client.cidade}/{client.uf}
                      </p>
                      <p>
                        <strong>Contato:</strong> {client.contato_responsavel}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredClients.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>Nenhum cliente encontrado</p>
                <Button type="button" onClick={() => setShowNewClientForm(true)} className="mt-2">
                  <Plus className="h-4 w-4 mr-1" />
                  Cadastrar Novo Cliente
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* New Client Form Dialog */}
      <Dialog open={showNewClientForm} onOpenChange={setShowNewClientForm}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome *</Label>
                <Input
                  value={newClient.nome || ""}
                  onChange={(e) => setNewClient({ ...newClient, nome: e.target.value })}
                  placeholder="Nome da empresa"
                />
              </div>
              <div className="space-y-2">
                <Label>CNPJ</Label>
                <Input
                  value={newClient.cnpj || ""}
                  onChange={(e) => setNewClient({ ...newClient, cnpj: e.target.value })}
                  placeholder="00.000.000/0000-00"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo de Estabelecimento</Label>
                <Select
                  value={newClient.tipo_estabelecimento || ""}
                  onValueChange={(value) => setNewClient({ ...newClient, tipo_estabelecimento: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposEstabelecimento.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Região</Label>
                <Select
                  value={newClient.regiao || ""}
                  onValueChange={(value) => setNewClient({ ...newClient, regiao: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a região" />
                  </SelectTrigger>
                  <SelectContent>
                    {regioes.map((regiao) => (
                      <SelectItem key={regiao} value={regiao}>
                        {regiao}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label>Logradouro</Label>
                <Input
                  value={newClient.logradouro || ""}
                  onChange={(e) => setNewClient({ ...newClient, logradouro: e.target.value })}
                  placeholder="Rua, Avenida, etc."
                />
              </div>
              <div className="space-y-2">
                <Label>Número</Label>
                <Input
                  value={newClient.numero || ""}
                  onChange={(e) => setNewClient({ ...newClient, numero: e.target.value })}
                  placeholder="123"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Bairro</Label>
                <Input
                  value={newClient.bairro || ""}
                  onChange={(e) => setNewClient({ ...newClient, bairro: e.target.value })}
                  placeholder="Bairro"
                />
              </div>
              <div className="space-y-2">
                <Label>Cidade</Label>
                <Input
                  value={newClient.cidade || ""}
                  onChange={(e) => setNewClient({ ...newClient, cidade: e.target.value })}
                  placeholder="Cidade"
                />
              </div>
              <div className="space-y-2">
                <Label>UF</Label>
                <Select value={newClient.uf || ""} onValueChange={(value) => setNewClient({ ...newClient, uf: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="UF" />
                  </SelectTrigger>
                  <SelectContent>
                    {ufs.map((uf) => (
                      <SelectItem key={uf} value={uf}>
                        {uf}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>CEP</Label>
                <Input
                  value={newClient.cep || ""}
                  onChange={(e) => setNewClient({ ...newClient, cep: e.target.value })}
                  placeholder="00000-000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Contato Responsável</Label>
                <Input
                  value={newClient.contato_responsavel || ""}
                  onChange={(e) => setNewClient({ ...newClient, contato_responsavel: e.target.value })}
                  placeholder="Nome do responsável"
                />
              </div>
              <div className="space-y-2">
                <Label>Telefone</Label>
                <Input
                  value={newClient.telefone || ""}
                  onChange={(e) => setNewClient({ ...newClient, telefone: e.target.value })}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={newClient.email || ""}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  placeholder="contato@empresa.com"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setShowNewClientForm(false)} className="flex-1">
                Cancelar
              </Button>
              <Button type="button" onClick={(e) => handleCreateClient(e)} className="flex-1">
                Cadastrar Cliente
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
