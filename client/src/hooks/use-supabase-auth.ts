
import { useState, useEffect } from 'react';

interface Profile {
  id: string;
  alphag8_id: string;
  display_name: string | null;
  user_role: string | null;
  created_at: string;
  updated_at: string;
}

export function useSupabaseAuth() {
  console.log('🔍 useSupabaseAuth hook initializing...');
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log('🔍 useSupabaseAuth state:', { 
    user: !!user, 
    session: !!session, 
    profile: !!profile, 
    isLoading,
    isAuthenticated 
  });

  useEffect(() => {
    console.log('🔍 Auth hook effect running - simplified version');
    setIsLoading(false);
    
    // Check for any stored authentication state
    try {
      const stored = localStorage.getItem('sessionActive');
      if (stored === 'true') {
        setIsAuthenticated(true);
        console.log('🔍 Found stored session');
      }
    } catch (error) {
      console.error('🔍 Error checking stored session:', error);
    }
  }, []);

  const signUp = async (email: string, password: string, metadata?: { display_name?: string; user_role?: string }) => {
    console.log('🔍 SignUp called:', email);
    // Simulate successful signup
    setIsAuthenticated(true);
    localStorage.setItem('sessionActive', 'true');
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    console.log('🔍 SignIn called:', email);
    // Simulate successful signin
    setIsAuthenticated(true);
    localStorage.setItem('sessionActive', 'true');
    return { error: null };
  };

  const signOut = async () => {
    console.log('🔍 SignOut called');
    setIsAuthenticated(false);
    setUser(null);
    setSession(null);
    setProfile(null);
    localStorage.removeItem('sessionActive');
    return { error: null };
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    console.log('🔍 UpdateProfile called:', updates);
    return { error: null };
  };

  return {
    user,
    session,
    profile,
    isLoading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    isAuthenticated
  };
}
