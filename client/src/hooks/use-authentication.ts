import { useState, useEffect, useCallback } from 'react';

const SESSION_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds

export function useAuthentication() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('fagri-authenticated');
    localStorage.removeItem('fagri-auth-timestamp');
    localStorage.removeItem('fagri-last-activity');
    setIsAuthenticated(false);
  }, []);

  const checkSessionExpiry = useCallback(() => {
    const authStatus = localStorage.getItem('fagri-authenticated');
    const authTimestamp = localStorage.getItem('fagri-auth-timestamp');
    const lastActivity = localStorage.getItem('fagri-last-activity');
    
    if (authStatus === 'true' && authTimestamp) {
      const now = Date.now();
      const authTime = parseInt(authTimestamp);
      const lastActivityTime = lastActivity ? parseInt(lastActivity) : authTime;
      
      // Check if 10 minutes have passed since last activity
      if (now - lastActivityTime > SESSION_TIMEOUT) {
        logout();
        // Dispatch a custom event to show session expired notification
        window.dispatchEvent(new CustomEvent('sessionExpired'));
        return false;
      }
      
      // Update last activity timestamp
      localStorage.setItem('fagri-last-activity', now.toString());
      return true;
    }
    
    return false;
  }, [logout]);

  const updateActivity = useCallback(() => {
    if (localStorage.getItem('fagri-authenticated') === 'true') {
      localStorage.setItem('fagri-last-activity', Date.now().toString());
    }
  }, []);

  useEffect(() => {
    // Check authentication status and session expiry on mount
    const isValidSession = checkSessionExpiry();
    setIsAuthenticated(isValidSession);
    setIsLoading(false);

    // Set up activity listeners only if authenticated
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const setupActivityListeners = () => {
      activityEvents.forEach(event => {
        document.addEventListener(event, updateActivity, true);
      });
    };

    const removeActivityListeners = () => {
      activityEvents.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
    };

    if (isValidSession) {
      setupActivityListeners();
    }

    // Set up interval to check session expiry every minute
    const intervalId = setInterval(() => {
      const authStatus = localStorage.getItem('fagri-authenticated');
      if (authStatus === 'true') {
        const isValid = checkSessionExpiry();
        if (!isValid && isAuthenticated) {
          setIsAuthenticated(false);
          removeActivityListeners();
        }
      }
    }, 60000); // Check every minute

    return () => {
      // Cleanup
      removeActivityListeners();
      clearInterval(intervalId);
    };
  }, [checkSessionExpiry, updateActivity, isAuthenticated]);

  const authenticate = () => {
    const now = Date.now();
    localStorage.setItem('fagri-authenticated', 'true');
    localStorage.setItem('fagri-auth-timestamp', now.toString());
    localStorage.setItem('fagri-last-activity', now.toString());
    setIsAuthenticated(true);
  };

  return {
    isAuthenticated,
    isLoading,
    authenticate,
    logout,
  };
}