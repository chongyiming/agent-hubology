
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

export function useAdminTransactionRealtime() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;

    // Subscribe to all transaction changes for admin
    const adminChannel = supabase.channel('admin_transaction_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'property_transactions'
        },
        (payload) => {
          switch (payload.eventType) {
            case 'INSERT':
              toast.info('New transaction submitted for review', {
                description: `Transaction ID: ${payload.new.id}`
              });
              break;
            case 'UPDATE':
              const oldStatus = payload.old?.status;
              const newStatus = payload.new?.status;
              
              if (oldStatus !== newStatus) {
                toast.info(`Transaction status updated`, {
                  description: `ID: ${payload.new.id} - New status: ${newStatus}`
                });
              }
              break;
          }

          // Invalidate admin queries
          queryClient.invalidateQueries({ queryKey: ['admin', 'transactions'] });
        }
      )
      // Also listen for commission approval changes
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'commission_approvals'
        },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            const newStatus = payload.new?.status;
            toast.info('Commission approval updated', {
              description: `Status: ${newStatus}`
            });
            queryClient.invalidateQueries({ queryKey: ['admin', 'commissions'] });
          }
        }
      )
      .subscribe();

    // Subscribe to commission installment updates
    const installmentChannel = supabase.channel('admin_installment_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'commission_installments'
        },
        (payload) => {
          if (payload.eventType === 'UPDATE' && payload.new?.status === 'paid') {
            toast.success('Commission installment marked as paid', {
              description: `Installment ID: ${payload.new.id}`
            });
            queryClient.invalidateQueries({ queryKey: ['admin', 'commissions'] });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(adminChannel);
      supabase.removeChannel(installmentChannel);
    };
  }, [user?.id, queryClient]);
}
