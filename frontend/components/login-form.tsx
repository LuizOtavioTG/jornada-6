"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Lock, Mail } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !senha) {
      setError("Por favor, preencha todos os campos")
      return
    }

    const success = await login(email, senha)
    if (!success) {
      setError("Email ou senha inválidos")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg">
            <Lock className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold text-foreground mb-2">FAST</CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Sistema Profissional de Ordens de Serviço
            <br />
            <span className="text-sm">Refrigeração & Climatização</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="senha"
                  type="password"
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>

          <div className="mt-6 text-sm text-muted-foreground">
            <p className="font-medium mb-2">Usuários de teste:</p>
            <div className="space-y-1 text-xs">
              <p>
                <strong>Admin:</strong> admin@fast.com / 123456
              </p>
              <p>
                <strong>Funcionário:</strong> funcionario@fast.com / 123456
              </p>
              <p>
                <strong>Técnico:</strong> tecnico@fast.com / 123456
              </p>
              <p>
                <strong>Cliente:</strong> cliente@empresa.com / 123456
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
