import { createContext, useContext, useState } from 'react';
import api from '../utils/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [tourist, setTourist] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkTourist = async () => {
    setLoading(true)
    api.get('/auth/me?role=tourist')
      .then(res => setTourist(res.data))
      .catch(() => setTourist(null))
      .finally(() => setLoading(false));
  }

  const checkAdmin = async () => {
    setLoading(true)
    api.get('/auth/me?role=admin')
      .then(res => setAdmin(res.data))
      .catch(() => setAdmin(null))
      .finally(() => setLoading(false));
  }

  const loginTourist = async (email, password) => {
      const res = await api.post('/auth/login', { email, password });
      setTourist(res.data);
  };

  const loginAdmin = async (email, password) => {
      const res = await api.post('/auth/admin/login', { email, password });
      setAdmin(res.data);
  };

  const logout = async () => {
      await api.get('/auth/logout');
      setTourist(null);
      setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ tourist, admin, checkAdmin, checkTourist, loginTourist, loginAdmin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line
export const useAuth = () => useContext(AuthContext);
