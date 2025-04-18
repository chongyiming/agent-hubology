
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
                  'cancelled': 'Transaction has been cancelled',
                };
                
                toast.info(statusMessages[newStatus] || `Status updated to: ${newStatus}`);
              } else {
                // Generic update message if not a status change
                toast.info('Transaction details updated');
              }
              break;
            case 'DELETE':
              toast.info('Transaction has been deleted');
              break;
          }

          // Invalidate relevant queries to refresh data
          queryClient.invalidateQueries({ queryKey: ['transactions'] });
          queryClient.invalidateQueries({ queryKey: ['transaction', payload.new?.id] });
          queryClient.invalidateQueries({ queryKey: ['agentMetrics'] });
          queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
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
            const statusMessages: Record<string, string> = {
              'Pending': 'Commission approval is awaiting review',
              'Under Review': 'Commission approval is under review',
              'Approved': 'Commission approval has been approved',
              'Rejected': 'Commission approval has been rejected',
              'Ready for Payment': 'Commission is ready for payment',
              'Paid': 'Commission has been paid',
            };
            
            toast.info(statusMessages[newStatus] || `Commission approval status: ${newStatus}`);
            
            // Invalidate relevant queries
            queryClient.invalidateQueries({ queryKey: ['commissions'] });
            queryClient.invalidateQueries({ queryKey: ['commission', payload.new?.id] });
            queryClient.invalidateQueries({ queryKey: ['commissionApprovals'] });
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
            } else if (newStatus === 'pending') {
              toast.info('Commission installment is pending payment');
            } else if (newStatus === 'delayed') {
              toast.warning('Commission installment payment has been delayed');
            }
            
            queryClient.invalidateQueries({ queryKey: ['commissionInstallments'] });
            queryClient.invalidateQueries({ queryKey: ['agentCommission'] });
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
