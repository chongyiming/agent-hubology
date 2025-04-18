
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

    // Subscribe to all transaction changes
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
              toast.success('New transaction created');
              break;
            case 'UPDATE':
              const oldStatus = payload.old?.status;
              const newStatus = payload.new?.status;
              
              if (oldStatus !== newStatus) {
                toast.info(`Transaction status updated to: ${newStatus}`);
              }
              break;
            case 'DELETE':
              toast.error('Transaction deleted');
              break;
          }

          // Invalidate relevant queries
          queryClient.invalidateQueries({ queryKey: ['transactions'] });
        }
      )
      .subscribe();

    // Cleanup subscription
    return () => {
      supabase.removeChannel(transactionChannel);
    };
  }, [user?.id, queryClient]);
}
