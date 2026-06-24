/**
 * Auth Context Provider
 * Manages admin authentication with localStorage persistence
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string, pin: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials
const DEMO_USERNAME = 'admin';
const DEMO_PIN = '1234';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    const savedUsername = localStorage.getItem('adminUsername');

    if (savedAuth === 'true' && savedUsername) {
      setIsAuthenticated(true);
      setUsername(savedUsername);
    }
  }, []);

  const login = (inputUsername: string, inputPin: string): boolean => {
    const trimmedUsername = inputUsername.trim();
    const trimmedPin = inputPin.trim();
    
    if (trimmedUsername === DEMO_USERNAME && trimmedPin === DEMO_PIN) {
      setIsAuthenticated(true);
      setUsername(trimmedUsername);
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminUsername', trimmedUsername);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminUsername');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
