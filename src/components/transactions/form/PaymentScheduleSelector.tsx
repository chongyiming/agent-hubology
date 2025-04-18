
import React, { useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { usePaymentSchedules } from '@/hooks/usePaymentSchedules';

interface PaymentScheduleSelectorProps {
  onScheduleSelected: (scheduleId: string) => void;
  selectedScheduleId?: string;
}

const PaymentScheduleSelector: React.FC<PaymentScheduleSelectorProps> = ({
  onScheduleSelected,
  selectedScheduleId
}) => {
  const { paymentSchedules, defaultPaymentSchedule, isLoading, error } = usePaymentSchedules();
  
  // Set default payment schedule when component mounts or when schedules load
  useEffect(() => {
    if (!selectedScheduleId && paymentSchedules?.length > 0 && defaultPaymentSchedule) {
      console.log('Auto-selecting default payment schedule:', defaultPaymentSchedule.id);
      onScheduleSelected(defaultPaymentSchedule.id);
    }
  }, [paymentSchedules, defaultPaymentSchedule, selectedScheduleId, onScheduleSelected]);
  
  if (isLoading) {
    return <div>Loading payment schedules...</div>;
  }
  
  if (error) {
    return <div>Error loading payment schedules. Please try again.</div>;
  }
  
  if (!paymentSchedules || paymentSchedules.length === 0) {
    return <div>No payment schedules available. Please contact an administrator.</div>;
  }
  
  return (
    <div className="space-y-2">
      <Label htmlFor="paymentSchedule">Payment Schedule</Label>
      <Select
        value={selectedScheduleId}
        onValueChange={(value) => {
          console.log('Payment schedule selected:', value);
          onScheduleSelected(value);
        }}
      >
        <SelectTrigger id="paymentSchedule">
          <SelectValue placeholder="Select a payment schedule" />
        </SelectTrigger>
        <SelectContent>
          {paymentSchedules.map((schedule) => (
            <SelectItem key={schedule.id} value={schedule.id}>
              {schedule.name} {schedule.isDefault ? '(Default)' : ''}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedScheduleId && (
        <div className="text-sm text-muted-foreground">
          {paymentSchedules.find(s => s.id === selectedScheduleId)?.description}
        </div>
      )}
    </div>
  );
};

export default PaymentScheduleSelector;
