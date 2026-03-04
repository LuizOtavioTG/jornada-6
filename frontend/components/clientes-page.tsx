"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search, Building, Eye, Users, MapPin, Phone } from "lucide-react"
import ClienteForm from "./cliente-form"
import ClienteDetalhes from "./cliente-detalhes"

interface ClientesPageProps {
  ordensServico: any[]
}

export default function ClientesPage({ ordensServico }: ClientesPageProps) {
  const [showNovoCliente, setShowNovoCliente] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState(null)
  const [editingCliente, setEditingCliente] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const [clientes, setClientes] = useState([
    {
      id: "cliente-1",
      nome: "Supermercado Central",
      cnpj: "12.345.678/0001-90",
      endereco: "Rua das Flores, 123 - Centro - São Paulo/SP - CEP: 01234-567",
      telefone: "(11) 99999-1234",
      email: "contato@supermercadocentral.com.br",
      contatoResponsavel: "José Silva",
      observacoes: "Cliente preferencial, sempre solicita atendimento prioritário para setor de congelados",
      createdAt: "2024-01-01T08:00:00Z",
      updatedAt: "2024-01-15T14:30:00Z",
    },
    {
      id: "cliente-2",
      nome: "Mercado do Bairro",
      cnpj: "98.765.432/0001-10",
      endereco: "Av. Principal, 456 - Vila Nova - São Paulo/SP - CEP: 05678-901",
      telefone: "(11) 88888-5678",
      email: "admin@mercadobairro.com.br",
      contatoResponsavel: "Maria Santos",
      observacoes: "Estabelecimento pequeno, horário de funcionamento das 7h às 22h",
      createdAt: "2024-01-05T10:15:00Z",
      updatedAt: "2024-01-16T09:45:00Z",
    },
    {
      id: "cliente-3",
      nome: "Hipermercado Norte",
      cnpj: "11.222.333/0001-44",
      endereco: "Rod. Norte, Km 15 - Distrito Industrial - São Paulo/SP - CEP: 08901-234",
      telefone: "(11) 77777-9012",
      email: "manutencao@hipernorte.com.br",
      contatoResponsavel: "Carlos Oliveira",
      observacoes: "Grande rede, possui múltiplas unidades. Contrato de manutenção preventiva mensal",
      createdAt: "2023-12-20T16:20:00Z",
      updatedAt: "2024-01-10T11:10:00Z",
    },
  ])

  const filteredClientes = clientes.filter((cliente) => {
    return (
      searchTerm === "" ||
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.cnpj.includes(searchTerm) ||
      cliente.contatoResponsavel.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleNovoCliente = (clienteData: any) => {
    setClientes([clienteData, ...clientes])
  }

  const handleEditCliente = (clienteData: any) => {
    setClientes(clientes.map((c) => (c.id === clienteData.id ? clienteData : c)))
    setEditingCliente(null)
  }

  const getClienteOSCount = (clienteNome: string) => {
    return ordensServico.filter((os) => os.cliente === clienteNome).length
  }

  const getClienteLastOS = (clienteNome: string) => {
    const osCliente = ordensServico.filter((os) => os.cliente === clienteNome)
    if (osCliente.length === 0) return null
    return osCliente.sort((a, b) => new Date(b.dataAbertura).getTime() - new Date(a.dataAbertura).getTime())[0]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Clientes</h2>
          <p className="text-muted-foreground">Gerencie seus clientes e histórico de serviços</p>
        </div>
        <Button onClick={() => setShowNovoCliente(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{clientes.length}</div>
                <p className="text-sm text-muted-foreground">Total de Clientes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Building className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {clientes.filter((c) => getClienteOSCount(c.nome) > 0).length}
                </div>
                <p className="text-sm text-muted-foreground">Clientes Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {new Set(clientes.map((c) => c.endereco.split(" - ")[2]?.split("/")[0] || "")).size}
                </div>
                <p className="text-sm text-muted-foreground">Cidades Atendidas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Busca */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar por nome, CNPJ ou responsável..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Clientes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Lista de Clientes ({filteredClientes.length})
          </CardTitle>
          <CardDescription>
            {searchTerm ? `Resultados filtrados de ${clientes.length} clientes total` : "Todos os clientes cadastrados"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {filteredClientes.length > 0 ? (
            <div className="space-y-0">
              {filteredClientes.map((cliente, index) => {
                const osCount = getClienteOSCount(cliente.nome)
                const lastOS = getClienteLastOS(cliente.nome)

                return (
                  <div
                    key={cliente.id}
                    className={`p-4 ${index !== filteredClientes.length - 1 ? "border-b border-border" : ""}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-foreground">{cliente.nome}</h3>
                        {cliente.cnpj && <p className="text-sm text-muted-foreground">CNPJ: {cliente.cnpj}</p>}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="text-sm font-medium text-primary">{osCount} OS</div>
                          <div className="text-xs text-muted-foreground">
                            {lastOS ? `Última: ${new Date(lastOS.dataAbertura).toLocaleDateString("pt-BR")}` : "Sem OS"}
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => setSelectedCliente(cliente)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      {cliente.contatoResponsavel && (
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {cliente.contatoResponsavel}
                        </div>
                      )}
                      {cliente.telefone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {cliente.telefone}
                        </div>
                      )}
                    </div>

                    {cliente.endereco && (
                      <div className="mt-2 text-sm text-muted-foreground flex items-start gap-1">
                        <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{cliente.endereco}</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum cliente encontrado</p>
              {searchTerm && <p className="text-sm mt-1">Tente ajustar os termos de busca</p>}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      {showNovoCliente && <ClienteForm onClose={() => setShowNovoCliente(false)} onSave={handleNovoCliente} />}

      {editingCliente && (
        <ClienteForm cliente={editingCliente} onClose={() => setEditingCliente(null)} onSave={handleEditCliente} />
      )}

      {selectedCliente && (
        <ClienteDetalhes
          cliente={selectedCliente}
          ordensServico={ordensServico}
          onClose={() => setSelectedCliente(null)}
          onEdit={(cliente) => {
            setSelectedCliente(null)
            setEditingCliente(cliente)
          }}
        />
      )}
    </div>
  )
}
