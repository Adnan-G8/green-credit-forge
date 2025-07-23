import { useState, useEffect } from 'react';

export function useAuthentication() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('fagri-authenticated');
    setIsAuthenticated(authStatus === 'true');
    setIsLoading(false);
  }, []);

  const authenticate = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('fagri-authenticated');
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    isLoading,
    authenticate,
    logout,
  };
}