
/**
 * Types related to commission calculations and payment schedules
 */

export interface CommissionBreakdown {
  totalCommission: number;
  agentCommission: number;
  agencyCommission: number;
  agentPercentage: number;
  agencyPercentage: number;
  overrideCommission?: number;
}

export interface PaymentScheduleInstallment {
  id: string;
  installmentNumber: number;
  percentage: number;
  daysAfterTransaction: number;
  description?: string;
}

export interface PaymentSchedule {
  id: string;
  name: string;
  description?: string;
  installmentCount: number;
  isDefault: boolean;
  installments: PaymentScheduleInstallment[];
}

export interface CommissionInstallment {
  id: string;
  commission_id?: string;
  transaction_id?: string;
  installment_number: number;
  amount: number;
  percentage: number;
  scheduled_date: string;
  due_date: string;
  actual_payment_date?: string;
  status: string;
  agent_id?: string;
  clerk_id?: string;
  created_at?: string;
  updated_at?: string;
}
