"use client"

import { useState, useEffect, createContext, useContext } from "react"

export type UserRole = "admin" | "funcionario" | "tecnico"

export interface User {
  id: number
  nome: string
  email: string
  role: UserRole
  ativo: boolean
  empresa_id?: number
  telefone?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, senha: string) => Promise<boolean>
  logout: () => void
  hasPermission: (action: string, resource?: string) => boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = localStorage.getItem("auth_token")
        if (token) {
          // In a real app, validate token with backend
          const mockUser: User = {
            id: 1,
            nome: "Administrador",
            email: "admin@fast.com",
            role: "admin",
            ativo: true,
          }
          setUser(mockUser)
        }
      } catch (error) {
        console.error("Session check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      setIsLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUsers: Record<string, User> = {
        "admin@fast.com": {
          id: 1,
          nome: "Administrador",
          email: "admin@fast.com",
          role: "admin",
          ativo: true,
        },
        "funcionario@fast.com": {
          id: 2,
          nome: "João Silva",
          email: "funcionario@fast.com",
          role: "funcionario",
          ativo: true,
        },
        "tecnico@fast.com": {
          id: 3,
          nome: "Maria Santos",
          email: "tecnico@fast.com",
          role: "tecnico",
          ativo: true,
        },
      }

      const foundUser = mockUsers[email]
      if (foundUser && senha === "123456") {
        setUser(foundUser)
        localStorage.setItem("auth_token", "mock_token_" + foundUser.id)
        return true
      }

      return false
    } catch (error) {
      console.error("Login failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth_token")
  }

  const hasPermission = (action: string, resource?: string): boolean => {
    if (!user) return false

    const permissions: Record<UserRole, Record<string, boolean>> = {
      admin: {
        // Admin has all permissions
        create_os: true,
        read_os: true,
        update_os: true,
        delete_os: true,
        create_user: true,
        read_user: true,
        update_user: true,
        delete_user: true,
        create_client: true,
        read_client: true,
        update_client: true,
        delete_client: true,
        view_history: true,
        view_deleted: true,
        export_data: true,
      },
      funcionario: {
        // Funcionario has most permissions except delete users
        create_os: true,
        read_os: true,
        update_os: true,
        delete_os: true,
        create_user: false,
        read_user: true,
        update_user: true,
        delete_user: false,
        create_client: true,
        read_client: true,
        update_client: true,
        delete_client: true,
        view_history: true,
        view_deleted: false,
        export_data: true,
      },
      tecnico: {
        // Tecnico only has CRUD for OS
        create_os: true,
        read_os: true,
        update_os: true,
        delete_os: false,
        create_user: false,
        read_user: false,
        update_user: false,
        delete_user: false,
        create_client: false,
        read_client: true,
        update_client: false,
        delete_client: false,
        view_history: false,
        view_deleted: false,
        export_data: false,
      },
    }

    return permissions[user.role]?.[action] || false
  }

  return {
    user,
    login,
    logout,
    hasPermission,
    isLoading,
  }
}

export const AuthProvider = AuthContext.Provider
