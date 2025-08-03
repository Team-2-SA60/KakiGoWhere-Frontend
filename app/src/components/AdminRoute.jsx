import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AdminRoute = () => {
  const { admin, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  return admin ? <Outlet/> : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;