import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface SidebarProfileProps {
  collapsed?: boolean;
}

/**
 * Displays user profile in the sidebar with role information
 */
export function SidebarProfile({ collapsed }: SidebarProfileProps) {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // Extract initials from email
  const getInitials = () => {
    if (user.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return 'U';
  };
  
  // Get display name from email or name field
  const displayName = user.name || (user.email ? user.email.split('@')[0] : 'User');
  
  // Display the active role
  const roleDisplay = user.activeRole;
  
  return (
    <Link 
      to="/profile" 
      className="flex items-center gap-3 p-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
    >
      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-foreground">
        <span className="font-medium text-sm">
          {getInitials()}
        </span>
      </div>
      
      {!collapsed && (
        <div className="flex flex-col overflow-hidden">
          <span className="font-medium">{displayName}</span>
          <span className="text-xs text-muted-foreground truncate">{roleDisplay}</span>
        </div>
      )}
    </Link>
  );
}
