
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { initializeAuth } from '../store/slices/authSlice';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
