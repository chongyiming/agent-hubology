
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

export function useAgentPerformanceRealtime() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;

    // Subscribe to transaction changes that affect performance metrics
    const performanceChannel = supabase.channel('agent_performance')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'property_transactions',
          filter: `agent_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            // Update agent metrics
            queryClient.invalidateQueries({ queryKey: ['agentMetrics'] });
            queryClient.invalidateQueries({ queryKey: ['agentCommission'] });
            queryClient.invalidateQueries({ queryKey: ['leaderboardPosition'] });
            
            // Show performance update notification
            toast.info('Performance metrics updated');
          }
        }
      )
      .subscribe();

    // Subscribe to commission approvals
    const approvalChannel = supabase.channel('approval_performance')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'commission_approvals',
          filter: `agent_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.new && payload.new.status !== payload.old?.status) {
            queryClient.invalidateQueries({ queryKey: ['agentMetrics'] });
            queryClient.invalidateQueries({ queryKey: ['commissionApprovals'] });
            
            toast.info('Commission approval status updated');
          }
        }
      )
      .subscribe();

    // Cleanup subscriptions
    return () => {
      supabase.removeChannel(performanceChannel);
      supabase.removeChannel(approvalChannel);
    };
  }, [user?.id, queryClient]);
}

