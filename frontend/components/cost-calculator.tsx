"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Calculator, Clock, Car, Package, Plus, Trash2 } from "lucide-react"

interface Material {
  id: string
  material: string
  quantidade: number
  valorUnitario: number
  valorTotal: number
}

interface CostStructure {
  id: string
  name: string
  deslocamento: {
    hrSaidaEmpresa: string
    hrChegadaCliente: string
    hrSaidaCliente: string
    hrChegadaEmpresa: string
    totalHoras: number
    valorPorHora: number
    totalValor: number
  }
  horasTrabalhadas: {
    hrInicio: string
    hrTermino: string
    totalHoras: number
    valorPorHora: number
    totalValor: number
  }
  quilometragem: {
    km: number
    valorPorKm: number
    totalValor: number
  }
  materiais: Material[]
  materiaisTotal: number
  valorTotal: number
}

interface CostCalculatorProps {
  costs: CostStructure[]
  onCostsChange: (costs: CostStructure[]) => void
}

function CostCalculator({ costs, onCostsChange }: CostCalculatorProps) {
  function createNewCostStructure(index = 1, name?: string): CostStructure {
    return {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: name || `Estrutura ${index}`,
      deslocamento: {
        hrSaidaEmpresa: "",
        hrChegadaCliente: "",
        hrSaidaCliente: "",
        hrChegadaEmpresa: "",
        totalHoras: 0,
        valorPorHora: 0,
        totalValor: 0,
      },
      horasTrabalhadas: {
        hrInicio: "",
        hrTermino: "",
        totalHoras: 0,
        valorPorHora: 0,
        totalValor: 0,
      },
      quilometragem: {
        km: 0,
        valorPorKm: 0,
        totalValor: 0,
      },
      materiais: [],
      materiaisTotal: 0,
      valorTotal: 0,
    }
  }

  const [costStructures, setCostStructures] = useState<CostStructure[]>(
    costs && costs.length > 0 ? costs : [createNewCostStructure(1)],
  )

  const addCostStructure = () => {
    const newStructure = createNewCostStructure(costStructures.length + 1)
    const newStructures = [...costStructures, newStructure]
    setCostStructures(newStructures)
    onCostsChange(newStructures)
  }

  const removeCostStructure = (id: string) => {
    if (costStructures.length <= 1) return // Keep at least one structure
    const newStructures = costStructures.filter((structure) => structure.id !== id)
    setCostStructures(newStructures)
    onCostsChange(newStructures)
  }

  const updateStructureName = (id: string, name: string) => {
    const newStructures = costStructures.map((structure) => (structure.id === id ? { ...structure, name } : structure))
    setCostStructures(newStructures)
    onCostsChange(newStructures)
  }

  // Calculate time difference in hours
  const calculateHours = (startTime: string, endTime: string): number => {
    if (!startTime || !endTime) return 0

    const start = new Date(`2000-01-01T${startTime}:00`)
    const end = new Date(`2000-01-01T${endTime}:00`)

    // Handle overnight times
    if (end < start) {
      end.setDate(end.getDate() + 1)
    }

    const diffMs = end.getTime() - start.getTime()
    return Math.round((diffMs / (1000 * 60 * 60)) * 100) / 100 // Round to 2 decimal places
  }

  const updateStructureTotal = (structure: CostStructure): CostStructure => {
    const materiaisTotal = (structure.materiais || []).reduce((sum, material) => sum + material.valorTotal, 0)
    const valorTotal =
      structure.deslocamento.totalValor +
      structure.horasTrabalhadas.totalValor +
      structure.quilometragem.totalValor +
      materiaisTotal

    return {
      ...structure,
      materiaisTotal,
      valorTotal,
    }
  }

  const updateDisplacement = (structureId: string, field: string, value: string | number) => {
    const newStructures = costStructures.map((structure) => {
      if (structure.id !== structureId) return structure

      const newDeslocamento = { ...structure.deslocamento, [field]: value }

      if (field.includes("hr")) {
        const { hrSaidaEmpresa, hrChegadaCliente, hrSaidaCliente, hrChegadaEmpresa } = newDeslocamento
        const goingTime = calculateHours(hrSaidaEmpresa, hrChegadaCliente)
        const returningTime = calculateHours(hrSaidaCliente, hrChegadaEmpresa)
        newDeslocamento.totalHoras = goingTime + returningTime
        newDeslocamento.totalValor = newDeslocamento.totalHoras * newDeslocamento.valorPorHora
      } else if (field === "valorPorHora") {
        newDeslocamento.totalValor = newDeslocamento.totalHoras * (value as number)
      }

      return updateStructureTotal({ ...structure, deslocamento: newDeslocamento })
    })

    setCostStructures(newStructures)
    onCostsChange(newStructures)
  }

  const updateWorkedHours = (structureId: string, field: string, value: string | number) => {
    const newStructures = costStructures.map((structure) => {
      if (structure.id !== structureId) return structure

      const newHorasTrabalhadas = { ...structure.horasTrabalhadas, [field]: value }

      if (field === "hrInicio" || field === "hrTermino") {
        newHorasTrabalhadas.totalHoras = calculateHours(newHorasTrabalhadas.hrInicio, newHorasTrabalhadas.hrTermino)
        newHorasTrabalhadas.totalValor = newHorasTrabalhadas.totalHoras * newHorasTrabalhadas.valorPorHora
      } else if (field === "valorPorHora") {
        newHorasTrabalhadas.totalValor = newHorasTrabalhadas.totalHoras * (value as number)
      }

      return updateStructureTotal({ ...structure, horasTrabalhadas: newHorasTrabalhadas })
    })

    setCostStructures(newStructures)
    onCostsChange(newStructures)
  }

  const updateMileage = (structureId: string, field: string, value: number) => {
    const newStructures = costStructures.map((structure) => {
      if (structure.id !== structureId) return structure

      const newQuilometragem = { ...structure.quilometragem, [field]: value }
      newQuilometragem.totalValor = newQuilometragem.km * newQuilometragem.valorPorKm

      return updateStructureTotal({ ...structure, quilometragem: newQuilometragem })
    })

    setCostStructures(newStructures)
    onCostsChange(newStructures)
  }

  const addMaterial = (structureId: string) => {
    const newMaterial: Material = {
      id: Date.now().toString(),
      material: "",
      quantidade: 0,
      valorUnitario: 0,
      valorTotal: 0,
    }

    const newStructures = costStructures.map((structure) => {
      if (structure.id !== structureId) return structure

      const currentMateriais = structure.materiais || []
      const newMateriais = [...currentMateriais, newMaterial]
      return updateStructureTotal({ ...structure, materiais: newMateriais })
    })

    setCostStructures(newStructures)
    onCostsChange(newStructures)
  }

  const updateMaterial = (structureId: string, materialId: string, field: keyof Material, value: string | number) => {
    const newStructures = costStructures.map((structure) => {
      if (structure.id !== structureId) return structure

      const newMateriais = structure.materiais.map((material) => {
        if (material.id === materialId) {
          const updated = { ...material, [field]: value }
          if (field === "quantidade" || field === "valorUnitario") {
            updated.valorTotal = updated.quantidade * updated.valorUnitario
          }
          return updated
        }
        return material
      })

      return updateStructureTotal({ ...structure, materiais: newMateriais })
    })

    setCostStructures(newStructures)
    onCostsChange(newStructures)
  }

  const removeMaterial = (structureId: string, materialId: string) => {
    const newStructures = costStructures.map((structure) => {
      if (structure.id !== structureId) return structure

      const newMateriais = structure.materiais.filter((material) => material.id !== materialId)
      return updateStructureTotal({ ...structure, materiais: newMateriais })
    })

    setCostStructures(newStructures)
    onCostsChange(newStructures)
  }

  const calculateGrandTotal = () => {
    return costStructures.reduce((sum, structure) => sum + structure.valorTotal, 0)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-green-700 bg-green-50 p-2 rounded">
          <Calculator className="h-4 w-4" />
          CUSTOS SERVIÇO
        </div>
        <Button type="button" onClick={addCostStructure} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Nova Estrutura de Custo
        </Button>
      </div>

      {(costStructures || []).map((structure, structureIndex) => (
        <div key={structure.id} className="border-2 border-dashed border-gray-200 rounded-lg p-4 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Input
                value={structure.name}
                onChange={(e) => updateStructureName(structure.id, e.target.value)}
                className="font-semibold text-lg w-auto"
              />
              <Badge variant="outline">#{structureIndex + 1}</Badge>
            </div>
            {costStructures.length > 1 && (
              <Button
                type="button"
                onClick={() => removeCostStructure(structure.id)}
                variant="ghost"
                size="sm"
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* A - Custos Deslocamento */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Car className="h-5 w-5 text-blue-600" />A - Custos Deslocamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Hr Saída Empresa</Label>
                  <Input
                    type="time"
                    value={structure.deslocamento.hrSaidaEmpresa}
                    onChange={(e) => updateDisplacement(structure.id, "hrSaidaEmpresa", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hr Chegada Cliente</Label>
                  <Input
                    type="time"
                    value={structure.deslocamento.hrChegadaCliente}
                    onChange={(e) => updateDisplacement(structure.id, "hrChegadaCliente", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hr Saída Cliente</Label>
                  <Input
                    type="time"
                    value={structure.deslocamento.hrSaidaCliente}
                    onChange={(e) => updateDisplacement(structure.id, "hrSaidaCliente", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hr Chegada Empresa</Label>
                  <Input
                    type="time"
                    value={structure.deslocamento.hrChegadaEmpresa}
                    onChange={(e) => updateDisplacement(structure.id, "hrChegadaEmpresa", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Valor por Hora (R$)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={structure.deslocamento.valorPorHora}
                    onChange={(e) =>
                      updateDisplacement(structure.id, "valorPorHora", Number.parseFloat(e.target.value) || 0)
                    }
                    placeholder="0,00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Total Hr</Label>
                  <div className="p-2 bg-white border rounded-md">
                    <Badge variant="secondary">{(structure.deslocamento.totalHoras || 0).toFixed(2)}h</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Total R$</Label>
                  <div className="p-2 bg-white border rounded-md font-medium text-green-600">
                    {formatCurrency(structure.deslocamento.totalValor)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* B - Custos Hora Trabalhada */}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-yellow-600" />B - Custos Hora Trabalhada
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Hr Início</Label>
                  <Input
                    type="time"
                    value={structure.horasTrabalhadas.hrInicio}
                    onChange={(e) => updateWorkedHours(structure.id, "hrInicio", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hr Término</Label>
                  <Input
                    type="time"
                    value={structure.horasTrabalhadas.hrTermino}
                    onChange={(e) => updateWorkedHours(structure.id, "hrTermino", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Valor por Hora (R$)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={structure.horasTrabalhadas.valorPorHora}
                    onChange={(e) =>
                      updateWorkedHours(structure.id, "valorPorHora", Number.parseFloat(e.target.value) || 0)
                    }
                    placeholder="0,00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Total R$</Label>
                  <div className="p-2 bg-white border rounded-md font-medium text-green-600">
                    {formatCurrency(structure.horasTrabalhadas.totalValor)}
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Total de horas trabalhadas:{" "}
                <Badge variant="secondary">{(structure.horasTrabalhadas.totalHoras || 0).toFixed(2)}h</Badge>
              </div>
            </CardContent>
          </Card>

          {/* C - Custos KM */}
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Car className="h-5 w-5 text-purple-600" />C - Custos KM
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>KM</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={structure.quilometragem.km}
                    onChange={(e) => updateMileage(structure.id, "km", Number.parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label>R$/KM</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={structure.quilometragem.valorPorKm}
                    onChange={(e) => updateMileage(structure.id, "valorPorKm", Number.parseFloat(e.target.value) || 0)}
                    placeholder="0,00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Total R$</Label>
                  <div className="p-2 bg-white border rounded-md font-medium text-green-600">
                    {formatCurrency(structure.quilometragem.totalValor)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* D - Despesas com Materiais */}
          <Card className="bg-orange-50 border-orange-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Package className="h-5 w-5 text-orange-600" />D - Despesas com Materiais
                </CardTitle>
                <Button type="button" onClick={() => addMaterial(structure.id)} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar Material
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {(structure.materiais || []).map((material, index) => (
                <div key={material.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-white rounded-lg border">
                  <div className="space-y-2">
                    <Label>Material</Label>
                    <Input
                      value={material.material}
                      onChange={(e) => updateMaterial(structure.id, material.id, "material", e.target.value)}
                      placeholder="Nome do material"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Qtde</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={material.quantidade}
                      onChange={(e) =>
                        updateMaterial(structure.id, material.id, "quantidade", Number.parseFloat(e.target.value) || 0)
                      }
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Valor Unitário (R$)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={material.valorUnitario}
                      onChange={(e) =>
                        updateMaterial(
                          structure.id,
                          material.id,
                          "valorUnitario",
                          Number.parseFloat(e.target.value) || 0,
                        )
                      }
                      placeholder="0,00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Total R$</Label>
                    <div className="p-2 bg-gray-50 border rounded-md font-medium text-green-600">
                      {formatCurrency(material.valorTotal)}
                    </div>
                  </div>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      onClick={() => removeMaterial(structure.id, material.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {(structure.materiais || []).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum material adicionado</p>
                </div>
              )}

              <Separator />

              <div className="flex justify-between items-center font-medium">
                <span>Total Materiais:</span>
                <span className="text-lg font-bold text-green-600">{formatCurrency(structure.materiaisTotal)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Subtotal {structure.name}:</span>
                <span className="text-xl font-bold text-green-600">{formatCurrency(structure.valorTotal)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}

      <Card className="bg-green-50 border-green-200 border-2">
        <CardContent className="p-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-800 flex items-center gap-2">
              <Calculator className="h-6 w-6" />
              Valor Total Geral - Todas as Estruturas
            </h3>

            <div className="grid grid-cols-1 gap-2">
              {(costStructures || []).map((structure, index) => (
                <div key={structure.id} className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{structure.name}</span>
                  <span className="font-medium">{formatCurrency(structure.valorTotal)}</span>
                </div>
              ))}
            </div>

            <Separator />

            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{formatCurrency(calculateGrandTotal())}</div>
              <div className="text-sm text-muted-foreground mt-1">Valor Total do Serviço</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { CostCalculator }
export default CostCalculator
