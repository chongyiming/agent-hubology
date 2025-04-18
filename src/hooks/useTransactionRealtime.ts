
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { Transaction } from '@/types/transaction';

export function useTransactionRealtime() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;

    // Subscribe to transaction changes
    const transactionChannel = supabase.channel('transaction_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'property_transactions',
          filter: `agent_id=eq.${user.id}`,
        },
        (payload) => {
          // Handle different types of changes
          switch (payload.eventType) {
            case 'INSERT':
              toast.success('Transaction created successfully');
              break;
            case 'UPDATE':
              const oldStatus = payload.old?.status;
              const newStatus = payload.new?.status;
              
              if (oldStatus !== newStatus) {
                const statusMessages: Record<string, string> = {
                  'pending': 'Transaction is pending review',
                  'in_progress': 'Transaction is being processed',
                  'approved': 'Transaction has been approved',
                  'rejected': 'Transaction has been rejected',
                  'completed': 'Transaction has been completed',
                };
                
                toast.info(statusMessages[newStatus] || `Status updated to: ${newStatus}`);
              }
              break;
          }

          // Invalidate relevant queries
          queryClient.invalidateQueries({ queryKey: ['transactions'] });
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'commission_approvals',
          filter: `agent_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            const newStatus = payload.new?.status;
            toast.info(`Commission approval status: ${newStatus}`);
            queryClient.invalidateQueries({ queryKey: ['commissions'] });
          }
        }
      )
      .subscribe();

    // Subscribe to commission installment changes
    const installmentChannel = supabase.channel('installment_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'commission_installments',
          filter: `agent_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            const newStatus = payload.new?.status;
            if (newStatus === 'paid') {
              toast.success('Commission installment has been paid');
            }
            queryClient.invalidateQueries({ queryKey: ['commissionInstallments'] });
          }
        }
      )
      .subscribe();

    // Cleanup subscriptions
    return () => {
      supabase.removeChannel(transactionChannel);
      supabase.removeChannel(installmentChannel);
    };
  }, [user?.id, queryClient]);
}
