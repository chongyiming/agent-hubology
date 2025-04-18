
import React, { useEffect } from 'react';
import { useTransactionForm } from '@/context/TransactionForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface CommissionInputsProps {
  isRental: boolean;
  ownerCommissionAmount: number;
  setOwnerCommissionAmount: (amount: number) => void;
}

const CommissionInputs: React.FC<CommissionInputsProps> = ({ 
  isRental, 
  ownerCommissionAmount, 
  setOwnerCommissionAmount 
}) => {
  const { state, updateFormData, clearError, setError } = useTransactionForm();
  const { formData, errors } = state;
  
  // Get transaction value and commission rate from form data
  const transactionValue = formData.transactionValue || 0;
  const commissionRate = formData.commissionRate || 0;
  
  // Calculate commission amount when transaction value or rate changes
  useEffect(() => {
    if (transactionValue > 0 && commissionRate > 0) {
      const calculatedAmount = (transactionValue * commissionRate) / 100;
      updateFormData({ commissionAmount: calculatedAmount });
      setOwnerCommissionAmount(calculatedAmount);
      
      // Clear any existing errors if we now have a valid commission
      if (calculatedAmount > 0) {
        clearError('commissionAmount');
      }
    }
  }, [transactionValue, commissionRate, updateFormData, setOwnerCommissionAmount, clearError]);
  
  // Handle transaction value change
  const handleTransactionValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    updateFormData({ transactionValue: value });
    
    // Validate immediately
    if (value <= 0) {
      setError('transactionValue', 'Transaction value must be greater than zero');
    } else {
      clearError('transactionValue');
    }
  };
  
  // Handle commission rate change
  const handleCommissionRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rate = parseFloat(e.target.value) || 0;
    updateFormData({ commissionRate: rate });
    
    // Validate immediately
    if (rate <= 0) {
      setError('commissionRate', 'Commission rate must be greater than zero');
    } else {
      clearError('commissionRate');
    }
  };
  
  // Handle manual commission amount change (overrides the calculated amount)
  const handleCommissionAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(e.target.value) || 0;
    setOwnerCommissionAmount(amount);
    updateFormData({ commissionAmount: amount });
    
    // Validate immediately
    if (amount <= 0) {
      setError('commissionAmount', 'Commission amount must be greater than zero');
    } else {
      clearError('commissionAmount');
    }
  };
  
  return (
    <div className="space-y-4">
      {errors.transactionValue && (
        <Alert variant="destructive" className="py-2">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription>{errors.transactionValue}</AlertDescription>
        </Alert>
      )}
      
      <div>
        <Label htmlFor="transactionValue">
          {isRental ? 'Rental Value' : 'Transaction Value'}
        </Label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <Input
            type="number"
            name="transactionValue"
            id="transactionValue"
            placeholder="0.00"
            value={transactionValue || ''}
            onChange={handleTransactionValueChange}
            className="pl-7"
          />
        </div>
      </div>
      
      {errors.commissionRate && (
        <Alert variant="destructive" className="py-2">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription>{errors.commissionRate}</AlertDescription>
        </Alert>
      )}
      
      <div>
        <Label htmlFor="commissionRate">Commission Rate (%)</Label>
        <div className="mt-1 relative">
          <Input
            type="number"
            name="commissionRate"
            id="commissionRate"
            placeholder="0.00"
            value={commissionRate || ''}
            onChange={handleCommissionRateChange}
            step="0.1"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">%</span>
          </div>
        </div>
      </div>
      
      {errors.commissionAmount && (
        <Alert variant="destructive" className="py-2">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription>{errors.commissionAmount}</AlertDescription>
        </Alert>
      )}
      
      <div>
        <Label htmlFor="commissionAmount">Commission Amount</Label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <Input
            type="number"
            name="commissionAmount"
            id="commissionAmount"
            placeholder="0.00"
            value={ownerCommissionAmount || ''}
            onChange={handleCommissionAmountChange}
            className="pl-7"
          />
        </div>
      </div>
    </div>
  );
};

export default CommissionInputs;
