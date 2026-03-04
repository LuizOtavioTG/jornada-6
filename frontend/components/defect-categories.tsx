"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Snowflake, Lightbulb, Wrench, AlertCircle } from "lucide-react"

interface DefectData {
  numeroSerie: string
  categoria: "refrigeracao" | "iluminacao" | "estrutura" | "outros"

  // Refrigeração - Compressor
  comp_queimado: boolean
  comp_em_massa: boolean
  comp_em_curto: boolean
  comp_corrente_alta: boolean
  comp_nao_parte: boolean
  comp_sem_compressao: boolean
  comp_trava_comando: boolean
  comp_trava_rolamento: boolean
  comp_desarmando: boolean

  // Refrigeração - Vazamento
  vaz_nao_localizado: boolean
  vaz_numero_ponto: string

  // Refrigeração - Outros
  ref_capilar_obstruido: boolean
  ref_micro_motor_travado: boolean
  ref_motor_vent_cond: boolean
  ref_motor_vent_evap: boolean
  ref_regulagem_parametros: boolean

  // Iluminação
  ilum_lampada_queimada: boolean
  ilum_sem_iluminacao: boolean
  ilum_em_curto: boolean

  // Estrutura
  est_perfil_curvo_vidro: boolean
  est_perfil_suporte_ilum: boolean
  est_perfil_moldura: boolean
  est_perfil_porta_etiqueta: boolean
  est_suporte_porta: boolean
  est_porta: boolean
  est_puxador: boolean
  est_conjunto_canal: boolean
  est_perfil_frontal: boolean
  est_perfil_canto: boolean
  est_parafuso_frontal: boolean
  est_parafuso_lateral: boolean

  // Outros
  outros_observacoes: string
}

interface DefectCategoriesProps {
  defects: DefectData[]
  onDefectsChange: (defects: DefectData[]) => void
}

export default function DefectCategories({ defects, onDefectsChange }: DefectCategoriesProps) {
  const addDefect = () => {
    const newDefect: DefectData = {
      numeroSerie: "",
      categoria: "refrigeracao",

      // Initialize all fields to false/empty
      comp_queimado: false,
      comp_em_massa: false,
      comp_em_curto: false,
      comp_corrente_alta: false,
      comp_nao_parte: false,
      comp_sem_compressao: false,
      comp_trava_comando: false,
      comp_trava_rolamento: false,
      comp_desarmando: false,

      vaz_nao_localizado: false,
      vaz_numero_ponto: "",

      ref_capilar_obstruido: false,
      ref_micro_motor_travado: false,
      ref_motor_vent_cond: false,
      ref_motor_vent_evap: false,
      ref_regulagem_parametros: false,

      ilum_lampada_queimada: false,
      ilum_sem_iluminacao: false,
      ilum_em_curto: false,

      est_perfil_curvo_vidro: false,
      est_perfil_suporte_ilum: false,
      est_perfil_moldura: false,
      est_perfil_porta_etiqueta: false,
      est_suporte_porta: false,
      est_porta: false,
      est_puxador: false,
      est_conjunto_canal: false,
      est_perfil_frontal: false,
      est_perfil_canto: false,
      est_parafuso_frontal: false,
      est_parafuso_lateral: false,

      outros_observacoes: "",
    }

    onDefectsChange([...defects, newDefect])
  }

  const updateDefect = (index: number, field: keyof DefectData, value: any) => {
    const newDefects = [...defects]
    newDefects[index] = { ...newDefects[index], [field]: value }
    onDefectsChange(newDefects)
  }

  const removeDefect = (index: number) => {
    if (defects.length > 1) {
      const newDefects = defects.filter((_, i) => i !== index)
      onDefectsChange(newDefects)
    }
  }

  const getCategoryIcon = (categoria: string) => {
    switch (categoria) {
      case "refrigeracao":
        return <Snowflake className="h-4 w-4 text-blue-600" />
      case "iluminacao":
        return <Lightbulb className="h-4 w-4 text-yellow-600" />
      case "estrutura":
        return <Wrench className="h-4 w-4 text-gray-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-orange-600" />
    }
  }

  const getCategoryColor = (categoria: string) => {
    switch (categoria) {
      case "refrigeracao":
        return "bg-blue-50 border-blue-200"
      case "iluminacao":
        return "bg-yellow-50 border-yellow-200"
      case "estrutura":
        return "bg-gray-50 border-gray-200"
      default:
        return "bg-orange-50 border-orange-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-red-700 bg-red-50 p-2 rounded">
          <AlertCircle className="h-4 w-4" />
          DESCRIÇÃO DO DEFEITO (Técnico)
        </div>
        <button type="button" onClick={addDefect} className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          + Adicionar Equipamento
        </button>
      </div>

      {defects.map((defect, index) => (
        <Card key={index} className={`${getCategoryColor(defect.categoria)} border-2`}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                {getCategoryIcon(defect.categoria)}
                Equipamento #{index + 1}
              </CardTitle>
              {defects.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDefect(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remover
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>N° Série</Label>
                <Input
                  value={defect.numeroSerie}
                  onChange={(e) => updateDefect(index, "numeroSerie", e.target.value)}
                  placeholder="Número do equipamento"
                />
              </div>
              <div className="space-y-2">
                <Label>Categoria</Label>
                <select
                  value={defect.categoria}
                  onChange={(e) => updateDefect(index, "categoria", e.target.value)}
                  className="w-full p-2 border border-input rounded-md bg-background"
                >
                  <option value="refrigeracao">Refrigeração</option>
                  <option value="iluminacao">Iluminação</option>
                  <option value="estrutura">Estrutura</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Refrigeração */}
            {defect.categoria === "refrigeracao" && (
              <div className="space-y-6">
                {/* Compressor */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Compressor
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { key: "comp_queimado", label: "Queimado" },
                      { key: "comp_em_massa", label: "Em Massa" },
                      { key: "comp_em_curto", label: "Em Curto" },
                      { key: "comp_corrente_alta", label: "Corrente Alta" },
                      { key: "comp_nao_parte", label: "Não Parte" },
                      { key: "comp_sem_compressao", label: "Sem Compressão" },
                      { key: "comp_trava_comando", label: "Trava Comando" },
                      { key: "comp_trava_rolamento", label: "Trava Rolamento" },
                      { key: "comp_desarmando", label: "Desarmando" },
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${index}-${key}`}
                          checked={defect[key as keyof DefectData] as boolean}
                          onCheckedChange={(checked) => updateDefect(index, key as keyof DefectData, checked)}
                        />
                        <Label htmlFor={`${index}-${key}`} className="text-sm">
                          {label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Vazamento */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Vazamento
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${index}-vaz_nao_localizado`}
                        checked={defect.vaz_nao_localizado}
                        onCheckedChange={(checked) => updateDefect(index, "vaz_nao_localizado", checked)}
                      />
                      <Label htmlFor={`${index}-vaz_nao_localizado`} className="text-sm">
                        Não Localizado
                      </Label>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${index}-vaz_numero_ponto`} className="text-sm">
                        N° Ponto
                      </Label>
                      <Input
                        id={`${index}-vaz_numero_ponto`}
                        value={defect.vaz_numero_ponto}
                        onChange={(e) => updateDefect(index, "vaz_numero_ponto", e.target.value)}
                        placeholder="Número do ponto"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Outros - Refrigeração */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Outros
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { key: "ref_capilar_obstruido", label: "Capilar Obstruído" },
                      { key: "ref_micro_motor_travado", label: "Micro Motor Travado" },
                      { key: "ref_motor_vent_cond", label: "Motor Vent. Cond." },
                      { key: "ref_motor_vent_evap", label: "Motor Vent. Evap." },
                      { key: "ref_regulagem_parametros", label: "Regulagem Parâmetros" },
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${index}-${key}`}
                          checked={defect[key as keyof DefectData] as boolean}
                          onCheckedChange={(checked) => updateDefect(index, key as keyof DefectData, checked)}
                        />
                        <Label htmlFor={`${index}-${key}`} className="text-sm">
                          {label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Iluminação */}
            {defect.categoria === "iluminacao" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Defeitos de Iluminação
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { key: "ilum_lampada_queimada", label: "Lâmpada Queimada" },
                    { key: "ilum_sem_iluminacao", label: "Sem Iluminação" },
                    { key: "ilum_em_curto", label: "Em Curto" },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${index}-${key}`}
                        checked={defect[key as keyof DefectData] as boolean}
                        onCheckedChange={(checked) => updateDefect(index, key as keyof DefectData, checked)}
                      />
                      <Label htmlFor={`${index}-${key}`} className="text-sm">
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Estrutura */}
            {defect.categoria === "estrutura" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                    Defeitos de Estrutura
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { key: "est_perfil_curvo_vidro", label: "1. Perfil Curvo Vidro" },
                    { key: "est_perfil_suporte_ilum", label: "2. Perfil Suporte Ilum." },
                    { key: "est_perfil_moldura", label: "3. Perfil Moldura" },
                    { key: "est_perfil_porta_etiqueta", label: "4. Perfil Porta-Etiqueta" },
                    { key: "est_suporte_porta", label: "5. Suporte Porta" },
                    { key: "est_porta", label: "6. Porta" },
                    { key: "est_puxador", label: "7. Puxador" },
                    { key: "est_conjunto_canal", label: "8. Conjunto Canal" },
                    { key: "est_perfil_frontal", label: "9. Perfil Frontal" },
                    { key: "est_perfil_canto", label: "10. Perfil Canto" },
                    { key: "est_parafuso_frontal", label: "11. Parafuso Frontal" },
                    { key: "est_parafuso_lateral", label: "12. Parafuso Lateral" },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${index}-${key}`}
                        checked={defect[key as keyof DefectData] as boolean}
                        onCheckedChange={(checked) => updateDefect(index, key as keyof DefectData, checked)}
                      />
                      <Label htmlFor={`${index}-${key}`} className="text-sm">
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Outros */}
            {defect.categoria === "outros" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    Outros Defeitos
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${index}-outros_observacoes`}>Observações</Label>
                  <Textarea
                    id={`${index}-outros_observacoes`}
                    value={defect.outros_observacoes}
                    onChange={(e) => updateDefect(index, "outros_observacoes", e.target.value)}
                    placeholder="Descreva outros tipos de defeitos encontrados..."
                    rows={3}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {defects.length === 0 && (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">Nenhum defeito técnico registrado</p>
            <button
              type="button"
              onClick={addDefect}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Adicionar Primeiro Defeito
            </button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
