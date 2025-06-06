
import React, { useState } from 'react';
import { useTransactionForm } from '@/context/TransactionForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/utils/commissionSchedule';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';

interface TransactionReviewProps {
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

const TransactionReview: React.FC<TransactionReviewProps> = ({ onSubmit, isSubmitting }) => {
  const { state, prevStep, goToStep } = useTransactionForm();
  const { formData, errors } = state;
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const handleSubmit = async () => {
    try {
      // Check for missing payment schedule specifically
      if (!formData.paymentScheduleId) {
        toast.error('Payment schedule is required');
        // Navigate back to commission step
        goToStep(4);
        return;
      }
      
      setSubmitError(null);
      await onSubmit();
    } catch (error) {
      console.error('Transaction submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit transaction');
      
      // If it's a payment schedule error, provide a direct way to fix it
      if (error instanceof Error && error.message.includes('Payment schedule')) {
        toast.error('Please select a payment schedule');
        goToStep(4); // Navigate back to commission step
        return;
      }
      
      // For other types of errors, show in the UI
      toast.error('Failed to submit transaction. Please check the form for errors.');
    }
  };
  
  const hasErrors = Object.keys(errors).length > 0;
  
  // Special handling for payment schedule error
  const hasPaymentScheduleError = !formData.paymentScheduleId || errors.paymentScheduleId;
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Review Transaction</h2>
      <p className="text-muted-foreground">
        Review the transaction details before submission.
      </p>
      
      {hasErrors && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Validation Errors</AlertTitle>
          <AlertDescription>
            Please fix the following errors before submitting:
            <ul className="mt-2 ml-4 list-disc">
              {Object.entries(errors).map(([field, message]) => (
                <li key={field} className="mb-1">
                  {message}
                  {field === 'paymentScheduleId' && (
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-white underline ml-2" 
                      onClick={() => goToStep(4)}
                    >
                      Fix this
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      
      {hasPaymentScheduleError && !errors.paymentScheduleId && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Missing Payment Schedule</AlertTitle>
          <AlertDescription className="flex justify-between items-center">
            <span>A payment schedule is required to complete this transaction.</span>
            <Button 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white/10" 
              onClick={() => goToStep(4)}
            >
              Set Payment Schedule
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      {submitError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Submission Error</AlertTitle>
          <AlertDescription>
            {submitError}
            {submitError.includes('Payment schedule') && (
              <Button 
                variant="outline" 
                className="mt-2 bg-transparent border-white text-white hover:bg-white/10" 
                onClick={() => goToStep(4)}
              >
                Set Payment Schedule
              </Button>
            )}
          </AlertDescription>
        </Alert>
      )}
      
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-2">Transaction Summary</h3>
            <div className="grid grid-cols-2 gap-2">
              <p className="text-muted-foreground">Type:</p>
              <p className="font-medium">{formData.transactionType}</p>
              
              <p className="text-muted-foreground">Value:</p>
              <p className="font-medium">{formatCurrency(formData.transactionValue)}</p>
              
              <p className="text-muted-foreground">Commission:</p>
              <p className="font-medium">{formatCurrency(formData.commissionAmount)}</p>
              
              {formData.property?.title && (
                <>
                  <p className="text-muted-foreground">Property:</p>
                  <p className="font-medium">{formData.property.title}</p>
                </>
              )}
              
              {formData.buyer?.name && (
                <>
                  <p className="text-muted-foreground">Buyer:</p>
                  <p className="font-medium">{formData.buyer.name}</p>
                </>
              )}
              
              {formData.seller?.name && (
                <>
                  <p className="text-muted-foreground">Seller:</p>
                  <p className="font-medium">{formData.seller.name}</p>
                </>
              )}
              
              {formData.developer?.name && (
                <>
                  <p className="text-muted-foreground">Developer:</p>
                  <p className="font-medium">{formData.developer.name}</p>
                </>
              )}
              
              <p className="text-muted-foreground">Payment Schedule:</p>
              <p className="font-medium">
                {formData.paymentScheduleId ? (
                  "Selected"
                ) : (
                  <span className="text-destructive">Not Selected</span>
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between mt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={prevStep}
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button 
          type="button" 
          onClick={handleSubmit}
          disabled={isSubmitting || hasErrors}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Transaction'
          )}
        </Button>
      </div>
    </div>
  );
};

export default TransactionReview;
