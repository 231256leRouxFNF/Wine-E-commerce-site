import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (role) {
    const allowed = Array.isArray(role)
      ? role.includes(user.role)
      : user.role === role;
    if (!allowed) {
      return <Navigate to="/" replace />;
    }
  }
  return children;
};

export default ProtectedRoute;
