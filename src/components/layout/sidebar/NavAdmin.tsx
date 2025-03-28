
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Users, ListChecks, Building, Briefcase, Database } from 'lucide-react';
import { 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from '@/components/ui/sidebar';

export function NavAdmin() {
  const location = useLocation();
  
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Administration</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={location.pathname === '/admin' || location.pathname === '/admin/dashboard'}
              tooltip="Dashboard"
            >
              <NavLink to="/admin" end>
                <Database className="h-4 w-4" />
                <span>Dashboard</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={location.pathname.includes('/admin/agents')}
              tooltip="Agents"
            >
              <NavLink to="/admin/agents">
                <Users className="h-4 w-4" />
                <span>Agents</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={location.pathname.includes('/admin/properties')}
              tooltip="Properties"
            >
              <NavLink to="/admin/properties">
                <Building className="h-4 w-4" />
                <span>Properties</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={location.pathname.includes('/admin/transactions')}
              tooltip="Transactions"
            >
              <NavLink to="/admin/transactions">
                <Briefcase className="h-4 w-4" />
                <span>Transactions</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={location.pathname.includes('/admin/commission')}
              tooltip="Commission"
            >
              <NavLink to="/admin/commission">
                <ListChecks className="h-4 w-4" />
                <span>Commission</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
