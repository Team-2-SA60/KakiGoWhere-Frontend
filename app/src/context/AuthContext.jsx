import { createContext, useContext, useEffect, useState } from 'react';
import api from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [tourist, setTourist] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    api.get('/auth/me')
        .then(res => setTourist(res.data))
        .catch(() => setTourist(null))
        .finally(() => setLoading(false));
    }, []);

    const loginTourist = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        setTourist(res.data);
    };

    const loginAdmin = async (email, password) => {
        const res = await api.post('/auth/admin/login', { email, password });
        setAdmin(res.data);
    };

    const logout = async () => {
        await api.post('/auth/logout');
        setTourist(null);
        setAdmin(null);
    };

  return (
    <AuthContext.Provider value={{ tourist, admin, loginTourist, loginAdmin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
