import { createClient } from '@supabase/supabase-js';
import { UserRole } from '@/types/auth';
import { SUPABASE_API_URL, SUPABASE_ANON_KEY, validateEnvironment } from '@/config/supabase';

// Validate environment variables in production
validateEnvironment();

// Create a Supabase client instance with explicit auth configuration
export const supabase = createClient(
  SUPABASE_API_URL,
  SUPABASE_ANON_KEY, 
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'property-agency-auth-token',
      storage: localStorage,
    },
    global: {
      headers: {
        'x-application-name': 'property-agency-system',
        'x-application-version': import.meta.env.VITE_APP_VERSION || '1.0.0',
      }
    },
    db: {
      schema: 'public'
    },
    realtime: {
      timeout: 30000, // 30s timeout for realtime channels
      params: {
        eventsPerSecond: 10
      }
    }
  }
);

// Log if environment variables are missing in non-production environments
if (import.meta.env.DEV && (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY)) {
  console.warn(
    'Running in development mode with fallback Supabase credentials. ' +
    'For production, ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
  );
}

// Error handling utilities for Supabase operations
export const handleSupabaseError = (error: any, operation: string) => {
  const errorMessage = error?.message || `An error occurred during ${operation}`;
  
  if (import.meta.env.DEV) {
    console.error(`Supabase ${operation} error:`, error);
  }
  
  // Return user-friendly error message
  return {
    success: false, 
    error: errorMessage,
    details: import.meta.env.DEV ? error : undefined
  };
};

// Simplified database types to avoid deep instantiation issues
interface AgentProfile {
  id?: string;
  full_name?: string;
  email?: string;
  avatar_url?: string;
  tier?: number;
  tier_name?: string;
  role?: string;
  [key: string]: any;
}

// Type-safe utility functions for Supabase operations
export const supabaseUtils = {
  // Get user roles from the database
  getRoles: async (): Promise<UserRole[]> => {
    try {
      // In a real implementation, this would query role information
      // For now, return default roles
      return ['agent', 'viewer'];
    } catch (error) {
      console.error('Error fetching user roles:', error);
      return ['agent'];
    }
  },

  // Utility function for fetching a user profile by ID using simplified typing
  getUserProfile: async (userId: string): Promise<AgentProfile | null> => {
    try {
      const { data, error } = await supabase
        .from('agent_profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) throw error;
      return data as AgentProfile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  },
  
  // Upload a file to storage
  uploadFile: async (bucket: string, filePath: string, file: File) => {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },
  
  // Get a public URL for a file
  getPublicUrl: (bucket: string, filePath: string) => {
    return supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
  },
};

// Export default supabase instance
export default supabase;
