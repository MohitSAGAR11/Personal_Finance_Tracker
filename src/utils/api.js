/**
 * Mock API service for finance tracker app
 * In a real app, this would interact with a backend server
 */

const STORAGE_KEY = 'finance_tracker_data';

/**
 * Initialize storage with default data if empty
 */
const initializeStorage = () => {
  const existingData = localStorage.getItem(STORAGE_KEY);
  
  if (!existingData) {
    const defaultData = {
      transactions: [],
      budgets: [],
      categories: ['Food', 'Transportation', 'Entertainment', 'Housing', 'Utilities', 'Healthcare', 'Shopping', 'Education', 'Salary', 'Investments', 'Other'],
      currency: 'USD'
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return defaultData;
  }
  
  return JSON.parse(existingData);
};

/**
 * Save data to localStorage
 * @param {Object} data - Data to save
 */
const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

/**
 * Get all financial data
 * @returns {Promise} Promise resolving to financial data
 */
export const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = initializeStorage();
      resolve(data);
    }, 300); // Simulate API delay
  });
};

/**
 * Add a new transaction
 * @param {Object} transaction - Transaction object
 * @returns {Promise} Promise resolving to updated transactions
 */
export const addTransaction = (transaction) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = initializeStorage();
      const newTransaction = {
        ...transaction,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      
      data.transactions.push(newTransaction);
      saveData(data);
      
      resolve(data.transactions);
    }, 300);
  });
};

/**
 * Delete a transaction
 * @param {string} id - Transaction ID
 * @returns {Promise} Promise resolving to updated transactions
 */
export const deleteTransaction = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = initializeStorage();
      data.transactions = data.transactions.filter(t => t.id !== id);
      saveData(data);
      
      resolve(data.transactions);
    }, 300);
  });
};

/**
 * Add a new budget
 * @param {Object} budget - Budget object
 * @returns {Promise} Promise resolving to updated budgets
 */
export const addBudget = (budget) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = initializeStorage();
      const newBudget = {
        ...budget,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      
      // Replace existing budget for the same category if it exists
      const existingIndex = data.budgets.findIndex(b => b.category === budget.category);
      
      if (existingIndex >= 0) {
        data.budgets[existingIndex] = newBudget;
      } else {
        data.budgets.push(newBudget);
      }
      
      saveData(data);
      resolve(data.budgets);
    }, 300);
  });
};

/**
 * Delete a budget
 * @param {string} id - Budget ID
 * @returns {Promise} Promise resolving to updated budgets
 */
export const deleteBudget = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = initializeStorage();
      data.budgets = data.budgets.filter(b => b.id !== id);
      saveData(data);
      
      resolve(data.budgets);
    }, 300);
  });
};



/**
 * Add a new category
 * @param {string} category - Category name
 * @returns {Promise} Promise resolving to updated categories
 */
export const addCategory = (category) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = initializeStorage();
      
      if (!data.categories.includes(category)) {
        data.categories.push(category);
        saveData(data);
      }
      
      resolve(data.categories);
    }, 300);
  });
};

/**
 * Update currency setting
 * @param {string} currency - Currency code
 * @returns {Promise} Promise resolving to updated settings
 */
export const updateCurrency = (currency) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = initializeStorage();
      data.currency = currency;
      saveData(data);
      
      resolve(data);
    }, 300);
  });
};

/**
 * Clear all data
 * @returns {Promise} Promise resolving when data is cleared
 */
export const clearAllData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem(STORAGE_KEY);
      const data = initializeStorage();
      resolve(data);
    }, 300);
  });
};

export const updateBudget = async (id, budget) => {
  // Implementation depends on your backend
  // If using localStorage, you might do something like:
  const budgets = JSON.parse(localStorage.getItem('budgets') || '[]');
  const updatedBudgets = budgets.map(b => 
    b.id === id ? { ...b, ...budget } : b
  );
  localStorage.setItem('budgets', JSON.stringify(updatedBudgets));
  return updatedBudgets;
};