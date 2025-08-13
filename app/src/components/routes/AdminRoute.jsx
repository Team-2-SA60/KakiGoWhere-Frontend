import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

const AdminRoute = () => {
  const { admin, loading, checkAdmin } = useAuth();
  const location = useLocation();

  useEffect(() => {
      checkAdmin();
  }, [location.pathname]);

  if (loading) return <div>Loading...</div>;
  return admin ? <Outlet/> : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;