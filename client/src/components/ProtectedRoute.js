import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-600 text-white mb-4 mx-auto animate-spin">
            <div className="w-6 h-6 border-2 border-transparent border-t-white rounded-full animate-spin" />
          </div>
          <p className="text-slate-600 dark:text-slate-400">Loading your session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

