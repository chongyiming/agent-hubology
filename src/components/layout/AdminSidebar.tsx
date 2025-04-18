
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSidebar } from '@/components/ui/sidebar';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { NavAdmin } from './sidebar/NavAdmin';
import { NavReports } from './sidebar/NavReports';
import { NavSystem } from './sidebar/NavSystem';
import { AdminProfile } from './sidebar/AdminProfile';
import { PortalSwitcher } from './PortalSwitcher';

export function AdminSidebar() {
  const { isAdmin } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  
  if (!isAdmin) {
    return null; // Hide sidebar completely if not admin
  }

  return (
    <>
      <Sidebar className="border-none bg-[#1A1F2C]">
        <SidebarHeader className={`border-none ${collapsed ? 'px-0 flex justify-center' : 'px-5'} py-4`}>
          {/* Use the consistent PortalSwitcher component */}
          <PortalSwitcher showLabel={!collapsed} className={collapsed ? "flex justify-center" : "w-full"} />
        </SidebarHeader>
        
        <SidebarContent className={`${collapsed ? 'px-0 flex flex-col items-center' : 'px-3'} py-4 overflow-y-visible space-y-6`}>
          <NavAdmin />
          <NavReports />
          <NavSystem />
        </SidebarContent>
        
        <SidebarFooter className={`border-t border-white/5 ${collapsed ? 'px-0 flex justify-center' : 'px-5'} py-3`}>
          <AdminProfile />
        </SidebarFooter>
      </Sidebar>
      <SidebarRail />
    </>
  );
}
