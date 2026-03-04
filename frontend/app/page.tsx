"use client"

import { AuthProvider, useAuthProvider, useAuth } from "@/hooks/use-auth"
import { OfflineOSProvider } from "@/hooks/use-offline-os"
import LoginForm from "@/components/login-form"
import OSManagementDashboard from "@/components/dashboard"
import { Loader2 } from "lucide-react"

function AppContent() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  return <OSManagementDashboard />
}

export default function App() {
  const authProvider = useAuthProvider()

  return (
    <AuthProvider value={authProvider}>
      <OfflineOSProvider>
        <AppContent />
      </OfflineOSProvider>
    </AuthProvider>
  )
}
