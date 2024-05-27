// ProtectedRoute.tsx
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './authUtils'; // Adjust the path if necessary

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to='/signin' />;
}
