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
  console.log('useSupabaseAuth hook initializing...');
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Set to false initially
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log('useSupabaseAuth state:', { user: !!user, session: !!session, profile: !!profile, isLoading });

  // Simplified version without Supabase for now
  useEffect(() => {
    console.log('Auth hook initialized - no Supabase dependency');
    setIsLoading(false);
  }, []);

  const signUp = async (email: string, password: string, metadata?: { display_name?: string; user_role?: string }) => {
    console.log('SignUp called:', email);
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    console.log('SignIn called:', email);
    return { error: null };
  };

  const signOut = async () => {
    console.log('SignOut called');
    return { error: null };
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    console.log('UpdateProfile called:', updates);
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