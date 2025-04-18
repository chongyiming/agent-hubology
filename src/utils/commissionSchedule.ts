
/**
 * Utility functions for formatting and calculating commission-related values
 */

// Format currency values to USD format
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Format percentage values
export const formatPercentage = (percentage: number): string => {
  return `${percentage.toFixed(2)}%`;
};

// Calculate days between two dates
export const calculateDaysDifference = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Calculate due date from transaction date and days after
export const calculateDueDate = (transactionDate: Date, daysAfter: number): Date => {
  const dueDate = new Date(transactionDate);
  dueDate.setDate(dueDate.getDate() + daysAfter);
  return dueDate;
};

// Format date to display format
export const formatDate = (date: Date | string): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
