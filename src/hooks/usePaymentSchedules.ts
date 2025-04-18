
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PaymentSchedule } from '@/types/commission';

// Fetches payment schedules from Supabase
const fetchPaymentSchedules = async (): Promise<PaymentSchedule[]> => {
  // First try to get payment schedules from the database
  try {
    const { data: schedulesData, error: schedulesError } = await supabase
      .from('commission_payment_schedules')
      .select(`
        id,
        name,
        description,
        installment_count,
        is_default,
        installments:schedule_installments(
          id,
          installment_number,
          percentage,
          days_after_transaction,
          description
        )
      `)
      .order('name');
    
    if (schedulesError) {
      console.error('Error fetching payment schedules:', schedulesError);
      throw schedulesError;
    }

    if (!schedulesData || schedulesData.length === 0) {
      console.warn('No payment schedules found, using fallbacks');
      return getFallbackSchedules();
    }

    // Transform database response to match our PaymentSchedule type
    return schedulesData.map(schedule => ({
      id: schedule.id,
      name: schedule.name,
      description: schedule.description || undefined,
      installmentCount: schedule.installment_count || 0,
      isDefault: schedule.is_default || false,
      installments: schedule.installments?.map(installment => ({
        id: installment.id,
        installmentNumber: installment.installment_number,
        percentage: installment.percentage,
        daysAfterTransaction: installment.days_after_transaction,
        description: installment.description
      })) || []
    }));
  } catch (error) {
    console.error('Error in fetchPaymentSchedules:', error);
    return getFallbackSchedules();
  }
};

// Provides fallback schedules if database fetch fails
const getFallbackSchedules = (): PaymentSchedule[] => {
  return [
    {
      id: 'default-schedule',
      name: 'Standard Payment Schedule',
      description: 'Default payment schedule with two installments',
      installmentCount: 2,
      isDefault: true,
      installments: [
        {
          id: 'default-installment-1',
          installmentNumber: 1,
          percentage: 50,
          daysAfterTransaction: 30,
          description: '50% after 30 days'
        },
        {
          id: 'default-installment-2',
          installmentNumber: 2,
          percentage: 50,
          daysAfterTransaction: 60,
          description: 'Remaining 50% after 60 days'
        }
      ]
    }
  ];
};

// Hook to fetch payment schedules
export const usePaymentSchedules = () => {
  const { data: paymentSchedules, isLoading, error } = useQuery({
    queryKey: ['paymentSchedules'],
    queryFn: fetchPaymentSchedules
  });

  // Find the default payment schedule
  const defaultPaymentSchedule = paymentSchedules?.find(schedule => schedule.isDefault);

  return {
    paymentSchedules: paymentSchedules || [],
    defaultPaymentSchedule,
    isLoading,
    error
  };
};
