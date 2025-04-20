/**
 * Format amount with currency symbol
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (USD, EUR, etc.)
 * @returns {string} Formatted amount with currency symbol
 */
export const formatCurrency = (amount, currency = 'USD') => {
    const symbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
      INR: '₹',
    };
  
    const symbol = symbols[currency] || '$';
    
    return `${symbol}${parseFloat(amount).toFixed(2)}`;
  };
  
  /**
   * Format date to readable string
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date string
   */
  export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  /**
   * Format percentage
   * @param {number} value - Decimal value (0.75 = 75%)
   * @returns {string} Formatted percentage string
   */
  export const formatPercentage = (value) => {
    return `${(value * 100).toFixed(1)}%`;
  };
  
  /**
   * Get short month names for last n months
   * @param {number} monthsCount - Number of months to include
   * @returns {Array} Array of month names
   */
  export const getLastMonths = (monthsCount = 6) => {
    const months = [];
    const date = new Date();
    
    for (let i = 0; i < monthsCount; i++) {
      const month = new Date(date.getFullYear(), date.getMonth() - i, 1);
      months.unshift(month.toLocaleDateString('en-US', { month: 'short' }));
    }
    
    return months;
  };
  
  /**
   * Group transactions by month
   * @param {Array} transactions - Array of transaction objects
   * @param {number} monthsCount - Number of months to include
   * @returns {Object} Object with monthly totals
   */
  export const groupTransactionsByMonth = (transactions, monthsCount = 6) => {
    const months = getLastMonths(monthsCount);
    const result = {
      months,
      income: Array(months.length).fill(0),
      expenses: Array(months.length).fill(0)
    };
    
    const today = new Date();
    
    transactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      const monthDiff = 
        (today.getFullYear() - transactionDate.getFullYear()) * 12 + 
        (today.getMonth() - transactionDate.getMonth());
      
      if (monthDiff >= 0 && monthDiff < monthsCount) {
        const index = months.length - 1 - monthDiff;
        const amount = parseFloat(transaction.amount);
        
        if (transaction.type === 'income') {
          result.income[index] += amount;
        } else {
          result.expenses[index] += amount;
        }
      }
    });
    
    return result;
  };