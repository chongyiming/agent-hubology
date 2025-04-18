
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
  installment_number: number;
  percentage: number;
  days_after_transaction: number;
  description?: string;
}

export interface PaymentSchedule {
  id: string;
  name: string;
  description?: string;
  installment_count: number;
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
  // For nested relations from Supabase
  transaction?: {
    property?: {
      title?: string;
      address?: string;
    };
  };
}

// For use in forms and admin panels
export interface ScheduleInstallment {
  id: string;
  scheduleId?: string;
  installment_number: number;
  percentage: number;
  days_after_transaction: number;
  description?: string;
}

export interface CommissionTier {
  id: string;
  name: string;
  tier: string;
  rate: number;
  minTransactions: number;
  color: string;
  rank: string;
  agentPercentage: number;
  commissionRate: number;
  requirements: any[];
}

export interface CommissionHistory {
  id: string;
  transactionReference: string;
  transactionId: string;
  property: string | {
    title: string;
    location: string;
  };
  date: string;
  amount: number;
  type: string;
  source?: string;
  status: string;
}

export interface OverrideCommission {
  id: string;
  agentId: string;
  baseAgentId: string;
  transactionId: string;
  percentage: number;
  amount: number;
  status: string;
  agentName: string;
  rank: string;
  tier: string;
}

// Agent types
export type AgentRank = 'Advisor' | 'Sales Leader' | 'Team Leader' | 'Group Leader' | 'Supreme Leader' | 'Associate' | 'Senior Associate' | 'Director';

export interface AgentWithHierarchy {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  rank: string;
  tier: string;
  joinDate?: string;
  transactions?: number;
  salesVolume?: number;
  personalCommission?: number;
  overrideCommission?: number;
  totalCommission?: number;
  commission?: number;
  upline?: AgentWithHierarchy;
  downline: AgentWithHierarchy[];
}
