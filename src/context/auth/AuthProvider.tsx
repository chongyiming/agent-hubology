
import React, { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { AuthContext } from './AuthContext';
import { UserRole } from '@/types/auth';
import { fetchProfileAndRoles } from './authUtils';
import { authService } from './authService';
import { useAuthState } from './useAuthState';
import { roleUtils } from './roleUtils';
import { toast } from 'sonner';

// AuthProvider Props from types
import { AuthProviderProps } from './types';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Use custom hook for auth state management
  const {
    state,
    setLoading,
    setError,
    resetState,
    updateSessionState,
  } = useAuthState();

  // Effect to initialize auth session and subscribe to auth changes
  useEffect(() => {
    console.log('[AuthProvider] Setting up auth listener');
    
    let authTimeout: number;
    let isInitialized = false;
    
    // First, set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('[AuthProvider] Auth state changed:', event, !!session);
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          try {
            if (session) {
              console.log('[AuthProvider] Processing sign-in event');
              
              const { profile, userProfile, roles, activeRole } = 
                await fetchProfileAndRoles(session.user.id, session.user.email);
              
              updateSessionState(
                session,
                userProfile,
                profile,
                roles,
                activeRole
              );
              
              console.log('[AuthProvider] Auth state updated after sign-in');
              isInitialized = true;
              clearTimeout(authTimeout);
            }
          } catch (error) {
            console.error('[AuthProvider] Error processing auth state change:', error);
            setError(error instanceof Error ? error : new Error('Unknown error occurred'));
            setLoading(false);
            isInitialized = true;
            clearTimeout(authTimeout);
          }
        } else if (event === 'SIGNED_OUT') {
          console.log('[AuthProvider] User signed out');
          resetState();
          isInitialized = true;
          clearTimeout(authTimeout);
        }
      }
    );
    
    // Then check for existing session
    const initializeAuth = async () => {
      try {
        console.log('[AuthProvider] Checking for existing session');
        const { data: { session } } = await authService.getSession();
        
        if (session) {
          console.log('[AuthProvider] Existing session found', session.user.id);
          
          try {
            const { profile, userProfile, roles, activeRole } = 
              await fetchProfileAndRoles(session.user.id, session.user.email);
            
            updateSessionState(
              session,
              userProfile,
              profile,
              roles,
              activeRole
            );
            
            console.log('[AuthProvider] Session initialized with roles', roles);
            isInitialized = true;
          } catch (profileError) {
            console.error('[AuthProvider] Error fetching profile:', profileError);
            setError(profileError instanceof Error ? profileError : new Error('Failed to load profile'));
            setLoading(false);
            isInitialized = true;
          }
        } else {
          console.log('[AuthProvider] No existing session found');
          resetState();
          isInitialized = true;
        }
      } catch (error) {
        console.error('[AuthProvider] Error during auth initialization:', error);
        setError(error instanceof Error ? error : new Error('Failed to initialize auth'));
        setLoading(false);
        isInitialized = true;
      }
    };
    
    // Initialize auth
    initializeAuth();
    
    // Set a timeout to avoid infinite loading
    authTimeout = window.setTimeout(() => {
      if (!isInitialized) {
        console.warn('[AuthProvider] Auth initialization timed out after 10 seconds');
        setError(new Error('Authentication verification timed out'));
        setLoading(false);
        toast.error('Authentication verification timed out. Please refresh the page.');
      }
    }, 10000); // 10 second timeout
    
    // Cleanup subscription and timeout on unmount
    return () => {
      console.log('[AuthProvider] Cleaning up auth subscription');
      subscription.unsubscribe();
      clearTimeout(authTimeout);
    };
  }, []);
  
  // Authentication methods
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await authService.signIn(email, password);
      // The auth state change listener will update the state
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Sign in failed'));
      setLoading(false);
      throw error;
    }
  };
  
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await authService.signUp(email, password);
      setLoading(false);
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Sign up failed'));
      setLoading(false);
      throw error;
    }
  };
  
  const signOut = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await authService.signOut();
      // The auth state change listener will reset the state
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Sign out failed'));
      setLoading(false);
      throw error;
    }
  };
  
  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await authService.resetPassword(email);
      setLoading(false);
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Password reset failed'));
      setLoading(false);
      throw error;
    }
  };
  
  // Role management methods
  const switchRole = (role: UserRole) => {
    roleUtils.switchRole(state.roles, role, (newRole) => {
      // Update state with new role
      const newState = {
        ...state,
        activeRole: newRole,
        user: state.user ? { ...state.user, activeRole: newRole } : null,
      };
      
      updateSessionState(
        newState.session,
        newState.user,
        newState.profile,
        newState.roles,
        newState.activeRole
      );
    });
  };
  
  const hasRole = (role: UserRole) => {
    return roleUtils.hasRole(state.roles, role);
  };
  
  // Prepare the auth context value
  const authContextValue = {
    user: state.user,
    profile: state.profile,
    session: state.session,
    loading: state.loading,
    error: state.error,
    isAuthenticated: !!state.session,
    isAdmin: state.roles.includes('admin'),
    roles: state.roles,
    activeRole: state.activeRole,
    signIn,
    signUp,
    signOut,
    resetPassword,
    switchRole,
    hasRole,
  };
  
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
