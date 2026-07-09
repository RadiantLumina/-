import { createContext, useContext, useState, useCallback } from 'react';
import { ACCESS_CODE } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const login = useCallback((code) => {
    if (code === ACCESS_CODE) {
      setIsAuthenticated(true);
      setShowModal(false);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const openLogin = useCallback(() => {
    setShowModal(true);
  }, []);

  const closeLogin = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, showModal, login, logout, openLogin, closeLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
