/**
 * Check if a string is empty
 * @param {string} value - String to check
 * @returns {boolean} True if empty, false otherwise
 */
export const isEmpty = (value) => {
    return value.trim() === '';
  };
  
  /**
   * Validate if input is a valid number
   * @param {string} value - Value to check
   * @returns {boolean} True if valid, false otherwise
   */
  export const isValidNumber = (value) => {
    return !isNaN(parseFloat(value)) && parseFloat(value) > 0;
  };
  
  /**
   * Validate transaction form data
   * @param {Object} data - Transaction form data
   * @returns {Object} Object with error messages
   */
  export const validateTransaction = (data) => {
    const errors = {};
    
    if (isEmpty(data.description)) {
      errors.description = 'Description is required';
    }
    
    if (!isValidNumber(data.amount)) {
      errors.amount = 'Amount must be a valid positive number';
    }
    
    if (isEmpty(data.category)) {
      errors.category = 'Category is required';
    }
    
    if (isEmpty(data.date)) {
      errors.date = 'Date is required';
    }
    
    return errors;
  };
  
  /**
   * Validate budget form data
   * @param {Object} data - Budget form data
   * @returns {Object} Object with error messages
   */
  export const validateBudget = (data) => {
    const errors = {};
    
    if (isEmpty(data.category)) {
      errors.category = 'Category is required';
    }
    
    if (!isValidNumber(data.limit)) {
      errors.limit = 'Budget limit must be a valid positive number';
    }
    
    return errors;
  };
  
  /**
   * Check if a date is in the future
   * @param {string} dateString - ISO date string
   * @returns {boolean} True if date is in the future
   */
  export const isFutureDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today;
  };