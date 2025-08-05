import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useEffect } from 'react';

const TouristRoute = () => {
  const { tourist, loading, checkTourist } = useAuth();

  useEffect(() => {
    if (loading) {
      checkTourist();
    }
  }, [loading, checkTourist]);

  if (loading) return <div>Loading...</div>;
  return tourist ? <Outlet/> : <Navigate to="/login" replace />;
};

export default TouristRoute;