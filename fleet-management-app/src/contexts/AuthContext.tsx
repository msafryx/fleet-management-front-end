'use client';

/**
 * AUTH CONTEXT - CLIENT-SIDE AUTHENTICATION
 * 
 * ⚠️ IMPORTANT: This is a TEMPORARY client-side authentication solution.
 * 
 * CURRENT STATE:
 * - Uses localStorage for session persistence (NOT SECURE for production)
 * - No server-side validation
 * - Mock login (no real API calls)
 * - Suitable for development/demo only
 * 
 * TODO: Replace with Keycloak/IDP integration
 * - See docs/AUTHENTICATION.md for migration guide
 * - Will need to integrate with NextAuth or similar
 * - Add proper JWT token validation
 * - Implement secure session management
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  name: string;
  email: string;
  role: 'admin' | 'employee';
  department: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: 'admin' | 'employee') => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session on mount from localStorage
    // ⚠️ NOT SECURE: localStorage is accessible by any script
    // TODO: Replace with secure session validation when integrating Keycloak
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'admin' | 'employee') => {
    try {
      // ⚠️ MOCK LOGIN - No actual authentication happening here!
      // TODO: When integrating Keycloak, replace with:
      // await signIn('keycloak', { email, password, callbackUrl: '/dashboard' });
      
      // Simulated API delay to mimic real authentication
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create mock user session
      const newUser: User = {
        name: role === 'admin' ? 'Admin User' : 'Employee User',
        email: email,
        role: role,
        department: 'Fleet Operations',
        avatar: ''
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    // Clear local session
    // TODO: When using Keycloak, call: await signOut({ callbackUrl: '/login' });
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading,
        login, 
        logout,
        updateUser 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

