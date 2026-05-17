import React, { createContext, useState, useEffect, useCallback } from 'react';
import API from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProfile = useCallback(async () => {
    try {
      const { data } = await API.get('/auth/profile');
      setUser(data.user);
      return data.user;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch profile');
      throw err;
    }
  }, []);

  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (err) {
        localStorage.removeItem('token');
      } finally {
        setAuthLoading(false);
      }
    };

    initializeUser();
  }, [getProfile]);

  const signup = useCallback(async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.post('/auth/signup', { name, email, password });
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Signup failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, authLoading, error, signup, login, logout, getProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
