
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Since we're removing authentication requirement, always allow access
  return <>{children}</>;
};

export default ProtectedRoute;
