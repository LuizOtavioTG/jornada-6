// Utility functions for data export

export interface OSData {
  numero: string
  data: string
  cliente: string
  tecnico: string
  status: string
  valor: number
  garantia: string
  descricao: string
}

export interface ClienteData {
  codigo: string
  nome: string
  cnpj: string
  endereco: string
  cidade: string
  telefone: string
  email: string
}

export interface TecnicoData {
  nome: string
  email: string
  telefone: string
  especialidade: string
  regiao: string
  osAtendidas: number
}

// Export to CSV
export function exportToCSV(data: any[], filename: string) {
  if (data.length === 0) return

  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header]
          // Escape commas and quotes
          if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`
          }
          return value
        })
        .join(","),
    ),
  ].join("\n")

  downloadFile(csvContent, filename, "text/csv")
}

// Export to Excel (using HTML table format that Excel can open)
export function exportToExcel(data: any[], filename: string, sheetName = "Dados") {
  if (data.length === 0) return

  const headers = Object.keys(data[0])

  const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
    <head>
      <meta charset="UTF-8">
      <style>
        table { border-collapse: collapse; width: 100%; }
        th { background-color: #024873; color: white; font-weight: bold; padding: 8px; border: 1px solid #ddd; }
        td { padding: 8px; border: 1px solid #ddd; }
        tr:nth-child(even) { background-color: #f2f2f2; }
      </style>
    </head>
    <body>
      <table>
        <thead>
          <tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${data
            .map(
              (row) =>
                `<tr>${headers
                  .map((h) => {
                    const value = row[h]
                    return `<td>${value !== null && value !== undefined ? value : ""}</td>`
                  })
                  .join("")}</tr>`,
            )
            .join("")}
        </tbody>
      </table>
    </body>
    </html>
  `

  downloadFile(html, filename, "application/vnd.ms-excel")
}

// Export to PDF (simplified version - in production use a library like jsPDF)
export function exportToPDF(data: any[], filename: string, title = "Relatório") {
  const headers = Object.keys(data[0] || {})

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { color: #024873; border-bottom: 3px solid #F23545; padding-bottom: 10px; }
        table { border-collapse: collapse; width: 100%; margin-top: 20px; }
        th { background-color: #024873; color: white; padding: 12px; text-align: left; }
        td { padding: 10px; border-bottom: 1px solid #ddd; }
        tr:hover { background-color: #f5f5f5; }
        .footer { margin-top: 30px; text-align: center; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <p>Gerado em: ${new Date().toLocaleString("pt-BR")}</p>
      <table>
        <thead>
          <tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${data
            .map(
              (row) =>
                `<tr>${headers
                  .map((h) => {
                    const value = row[h]
                    return `<td>${value !== null && value !== undefined ? value : ""}</td>`
                  })
                  .join("")}</tr>`,
            )
            .join("")}
        </tbody>
      </table>
      <div class="footer">
        <p>FAST - Sistema de Gerenciamento de Ordens de Serviço</p>
        <p>Refrigeração & Climatização</p>
      </div>
    </body>
    </html>
  `

  // Open in new window for printing/saving as PDF
  const printWindow = window.open("", "_blank")
  if (printWindow) {
    printWindow.document.write(html)
    printWindow.document.close()
    printWindow.print()
  }
}

// Helper function to download file
function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

// Format data for export
export function formatOSForExport(os: any[]): OSData[] {
  return os.map((o) => ({
    numero: o.numero || o.id,
    data: new Date(o.data_abertura).toLocaleDateString("pt-BR"),
    cliente: o.cliente,
    tecnico: o.tecnico,
    status: o.status,
    valor: o.valor_total || 0,
    garantia: o.garantia || "N/A",
    descricao: o.descricao_chamado || "",
  }))
}

export function formatClientesForExport(clientes: any[]): ClienteData[] {
  return clientes.map((c) => ({
    codigo: c.codigo,
    nome: c.nome,
    cnpj: c.cnpj,
    endereco: `${c.endereco}, ${c.numero} - ${c.bairro}`,
    cidade: `${c.cidade}/${c.uf}`,
    telefone: c.telefone,
    email: c.email,
  }))
}

export function formatTecnicosForExport(tecnicos: any[]): TecnicoData[] {
  return tecnicos.map((t) => ({
    nome: t.nome,
    email: t.email,
    telefone: t.telefone,
    especialidade: t.especialidade,
    regiao: t.regiao,
    osAtendidas: t.os_atendidas || 0,
  }))
}
