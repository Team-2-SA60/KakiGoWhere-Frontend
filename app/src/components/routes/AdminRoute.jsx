import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

const AdminRoute = () => {
  const { admin, loading, checkAdmin } = useAuth();

  useEffect(() => {
    if (loading) {
      checkAdmin();
    }
  }, [loading, checkAdmin]);

  if (loading) return <div>Loading...</div>;
  return admin ? <Outlet/> : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;