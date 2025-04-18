
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
              // Ensure payload.new exists and has an id before accessing it
              if (payload.new && 'id' in payload.new) {
                toast.info('New transaction submitted for review', {
                  description: `Transaction ID: ${payload.new.id.substring(0, 8)}...`,
                  action: {
                    label: 'View',
                    onClick: () => window.location.href = `/admin/transactions/${payload.new.id}`
                  }
                });
              }
              break;
            case 'UPDATE':
              const oldStatus = payload.old?.status;
              const newStatus = payload.new?.status;
              
              if (oldStatus !== newStatus && payload.new && 'id' in payload.new) {
                toast.info(`Transaction status updated`, {
                  description: `ID: ${payload.new.id.substring(0, 8)}... - New status: ${newStatus}`,
                  action: {
                    label: 'View',
                    onClick: () => window.location.href = `/admin/transactions/${payload.new.id}`
                  }
                });
              }
              break;
            case 'DELETE':
              // Ensure payload.old exists and has an id before accessing it
              if (payload.old && 'id' in payload.old) {
                toast.info('Transaction has been deleted', {
                  description: `ID: ${payload.old.id.substring(0, 8)}...`
                });
              }
              break;
          }

          // Invalidate admin queries
          queryClient.invalidateQueries({ queryKey: ['admin', 'transactions'] });
          queryClient.invalidateQueries({ queryKey: ['admin', 'metrics'] });
          queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
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
          if (payload.eventType === 'UPDATE' && payload.new) {
            const newStatus = payload.new?.status;
            const urgency = newStatus === 'Pending' 
              ? 'low' 
              : newStatus === 'Under Review' 
                ? 'medium' 
                : 'high';
            
            if ('id' in payload.new) {
              toast.info('Commission approval updated', {
                description: `Status: ${newStatus}`,
                action: {
                  label: 'Review',
                  onClick: () => window.location.href = `/admin/approvals/${payload.new.id}`
                }
              });
            }
            
            queryClient.invalidateQueries({ queryKey: ['admin', 'commissions'] });
            queryClient.invalidateQueries({ queryKey: ['admin', 'approvals'] });
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
          if (payload.eventType === 'UPDATE' && payload.new && 'id' in payload.new && payload.new?.status === 'paid') {
            // Safe access to id property
            toast.success('Commission installment marked as paid', {
              description: `Installment ID: ${payload.new.id.substring(0, 8)}...`,
              action: {
                label: 'View',
                onClick: () => window.location.href = `/admin/commissions/${payload.new.commission_id}`
              }
            });
            
            queryClient.invalidateQueries({ queryKey: ['admin', 'commissions'] });
            queryClient.invalidateQueries({ queryKey: ['admin', 'installments'] });
            queryClient.invalidateQueries({ queryKey: ['admin', 'financials'] });
          }
        }
      )
      .subscribe();

    // Subscribe to document uploads
    const documentsChannel = supabase.channel('admin_document_updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'transaction_documents'
        },
        (payload) => {
          if (payload.new && 'name' in payload.new && 'transaction_id' in payload.new) {
            toast.info('New document uploaded', {
              description: `Document: ${payload.new.name}`,
              action: {
                label: 'View',
                onClick: () => window.location.href = `/admin/transactions/${payload.new.transaction_id}`
              }
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(adminChannel);
      supabase.removeChannel(installmentChannel);
      supabase.removeChannel(documentsChannel);
    };
  }, [user?.id, queryClient]);
}
