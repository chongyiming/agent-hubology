
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

export function useAdminPerformanceRealtime() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;

    // Subscribe to all agent performance changes for admin
    const adminPerformanceChannel = supabase.channel('admin_performance')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'property_transactions'
        },
        (payload) => {
          // Update admin dashboard metrics
          queryClient.invalidateQueries({ queryKey: ['adminMetrics'] });
          queryClient.invalidateQueries({ queryKey: ['agentPerformance'] });
          queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
          
          if (payload.eventType === 'INSERT') {
            toast.info('New transaction added - Performance metrics updated');
          } else if (payload.eventType === 'UPDATE' && payload.new && payload.old) {
            toast.info('Transaction updated - Performance metrics recalculated');
          }
        }
      )
      .subscribe();

    // Subscribe to all commission approval changes
    const adminApprovalChannel = supabase.channel('admin_approval_performance')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'commission_approvals'
        },
        (payload) => {
          if (payload.new && payload.new.status !== payload.old?.status) {
            queryClient.invalidateQueries({ queryKey: ['adminMetrics'] });
            queryClient.invalidateQueries({ queryKey: ['commissionApprovals'] });
            
            toast.info('Commission approval status changed');
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(adminPerformanceChannel);
      supabase.removeChannel(adminApprovalChannel);
    };
  }, [user?.id, queryClient]);
}

