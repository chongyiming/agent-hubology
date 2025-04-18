
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
              toast.info('New transaction submitted for review');
              break;
            case 'UPDATE':
              const oldStatus = payload.old?.status;
              const newStatus = payload.new?.status;
              
              if (oldStatus !== newStatus) {
                toast.info(`Transaction ${payload.new.id} status: ${newStatus}`);
              }
              break;
          }

          // Invalidate admin queries
          queryClient.invalidateQueries({ queryKey: ['admin', 'transactions'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(adminChannel);
    };
  }, [user?.id, queryClient]);
}
