import { useState, useEffect } from 'react';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { supabase } from '../../../src/integrations/supabase/client';

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
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log('useSupabaseAuth state:', { user: !!user, session: !!session, profile: !!profile, isLoading });

  useEffect(() => {
    console.log('Setting up auth state listener...');
    try {
      // Set up auth state listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event: AuthChangeEvent, session: Session | null) => {
          console.log('Auth state changed:', { event, session: !!session });
          setSession(session);
          setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile after authentication
          setTimeout(async () => {
            try {
              const { data: profileData, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
              
              if (error) {
                console.error('Error fetching profile:', error);
                setProfile(null);
              } else {
                setProfile(profileData);
              }
            } catch (error) {
              console.error('Error fetching profile:', error);
              setProfile(null);
            }
          }, 0);
        } else {
          setProfile(null);
        }
          
          setIsLoading(false);
        }
      );

      // Check for existing session
      console.log('Checking for existing session...');
      supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
        console.log('Existing session check result:', { session: !!session });
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }).catch((error) => {
        console.error('Error getting session:', error);
        setIsLoading(false);
      });

      return () => {
        console.log('Cleaning up auth subscription');
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error('Error setting up auth:', error);
      setIsLoading(false);
    }
  }, []);

  const signUp = async (email: string, password: string, metadata?: { display_name?: string; user_role?: string }) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: metadata
      }
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error('No user logged in');
    
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);
    
    return { error };
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
    isAuthenticated: !!session
  };
}