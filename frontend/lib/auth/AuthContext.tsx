'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/verify`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } catch (error) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    }
    setIsLoading(false);
  };

const login = async (username: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  
  // Set both localStorage and cookie
  localStorage.setItem('token', data.access_token);
  document.cookie = `token=${data.access_token}; path=/`;
  
  setUser(data.user);
  setIsAuthenticated(true);
};

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
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