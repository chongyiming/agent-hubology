
import { addDays, format } from 'date-fns';
import { PaymentSchedule, CommissionInstallment } from '@/types/commission';
import { supabase } from '@/lib/supabase';

/**
 * Generates commission installments based on a payment schedule
 * This happens automatically when a transaction is approved
 */
export const generateCommissionInstallments = (
  transactionId: string,
  agentId: string,
  totalCommission: number,
  paymentSchedule: PaymentSchedule,
  transactionDate: string
): CommissionInstallment[] => {
  // Convert string date to Date object
  const baseDate = new Date(transactionDate);
  
  // Create installments based on the schedule
  return paymentSchedule.installments.map((installment) => {
    // Calculate the scheduled date by adding days to the transaction date
    const scheduledDate = addDays(baseDate, installment.days_after_transaction);
    
    // Calculate the amount for this installment based on percentage
    const amount = (totalCommission * installment.percentage) / 100;
    
    return {
      id: '', // Will be generated by the database
      transaction_id: transactionId,
      installment_number: installment.installment_number,
      agent_id: agentId,
      amount,
      percentage: installment.percentage,
      scheduled_date: format(scheduledDate, 'yyyy-MM-dd'),
      due_date: format(scheduledDate, 'yyyy-MM-dd'),
      status: 'Pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  });
};

/**
 * Fetches the cutoff date configuration from the database
 * Defaults to 26 if not configured
 */
export const getPaymentCutoffDay = async (): Promise<number> => {
  try {
    const { data } = await supabase
      .from('system_configuration')
      .select('value')
      .eq('key', 'commission_payment_cutoff_day')
      .single();
      
    if (data?.value) {
      const cutoffDay = parseInt(data.value, 10);
      return isNaN(cutoffDay) ? 26 : cutoffDay;
    }
    
    return 26; // Default to 26th if not found
  } catch (error) {
    console.error('Error fetching payment cutoff day:', error);
    return 26; // Default to 26th on error
  }
};

/**
 * Determines if a date is after the payment cutoff date (e.g., 26th of the month)
 */
export const isAfterCutoffDate = async (date: Date): Promise<boolean> => {
  const cutoffDay = await getPaymentCutoffDay();
  return date.getDate() > cutoffDay;
};

/**
 * Formats an installment status with appropriate styling classes
 */
export const getStatusBadgeClasses = (status: string): string => {
  switch (status) {
    case 'Paid':
      return 'bg-green-100 text-green-800';
    case 'Processing':
      return 'bg-blue-100 text-blue-800';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

/**
 * Groups commission installments by month for forecasting
 */
export const groupInstallmentsByMonth = (
  installments: CommissionInstallment[]
): { month: string; totalAmount: number; installments: CommissionInstallment[] }[] => {
  const grouped: Record<string, { 
    month: string; 
    totalAmount: number; 
    installments: CommissionInstallment[] 
  }> = {};
  
  installments.forEach(installment => {
    const date = new Date(installment.scheduled_date);
    const monthKey = format(date, 'yyyy-MM');
    const monthLabel = format(date, 'MMMM yyyy');
    
    if (!grouped[monthKey]) {
      grouped[monthKey] = {
        month: monthLabel,
        totalAmount: 0,
        installments: []
      };
    }
    
    grouped[monthKey].totalAmount += installment.amount;
    grouped[monthKey].installments.push(installment);
  });
  
  // Convert to array and sort by month
  return Object.values(grouped).sort((a, b) => {
    // Extract year and month for comparison
    const [aYear, aMonth] = a.month.split(' ');
    const [bYear, bMonth] = b.month.split(' ');
    
    // Compare years first
    if (aYear !== bYear) {
      return parseInt(aYear) - parseInt(bYear);
    }
    
    // If years are the same, compare months
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    return months.indexOf(aMonth) - months.indexOf(bMonth);
  });
};
