import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const TouristRoute = () => {
  const { tourist, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  return tourist ? <Outlet/> : <Navigate to="/login" replace />;
};

export default TouristRoute;