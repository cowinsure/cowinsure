// utils/currencyFormatter.ts
export const formatToBDT = (amount: number): string => {
    // Format the amount without decimal places
    const formatted = new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      currencyDisplay: 'narrowSymbol',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  
    // Ensure the symbol is properly spaced
    return formatted.replace('৳', '৳ ');
  };