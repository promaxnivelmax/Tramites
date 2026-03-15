import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, db } from './mockDb';

type AuthContextType = {
  user: User | null;
  login: (email: string, password?: string) => void;
  register: (data: Omit<User, 'id'>) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password?: string) => {
    const loggedInUser = db.login(email, password);
    setUser(loggedInUser);
    localStorage.setItem('current_user', JSON.stringify(loggedInUser));
  };

  const register = (data: Omit<User, 'id'>) => {
    const newUser = db.register(data);
    setUser(newUser);
    localStorage.setItem('current_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('current_user');
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updatedUser = db.updateUser(user.id, data);
    setUser(updatedUser);
    localStorage.setItem('current_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
